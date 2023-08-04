const btn_all = document.getElementById('btn_all');
const btn_exist = document.getElementById('btn_exist');
const btn_clear = document.getElementById('btn_clear');
const lang = document.getElementById('lang');
const minLen = document.getElementById('minLen');
const input = document.getElementById('input');
const output = document.getElementById('output');

const checkWordEn = (wordQuery) => {
  //create XMLHttpRequest object
  const xhr = new XMLHttpRequest()
  //open a get request with the remote server URL

  const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/';
  const queryParams = lang.value+"/"; // 'en/'; 
  const url = apiUrl + queryParams + wordQuery;

  xhr.open("GET", url );
  //send the Http request
  xhr.send();

  //EVENT HANDLERS

  //triggered when the response is completed
  xhr.onload = function() {
    if (xhr.status === 200) {
        //parse JSON datax`x
        data = JSON.parse(xhr.responseText);

        if('title' in data){
          // console.log('not exist : '+wordQuery);
        } else {
          // console.log('exists : '+wordQuery);
          output.innerHTML += wordQuery+'<br>';
        }
          
      } else if (xhr.status === 404) {
          // console.log("No records found")
      } else if (xhr.status === 429) {
          // console.log("Too many requests")
      }
  }

  //triggered when a network-level error occurs with the request
  xhr.onerror = function() {
      // console.log("Network error occurred")
  }

  //triggered periodically as the client receives data
  //used to monitor the progress of the request
  xhr.onprogress = function(e) {
      if (e.lengthComputable) {
          // console.log(`${e.loaded} B of ${e.total} B loaded!`)
      } else {
          // console.log(`${e.loaded} B loaded!`)
      }
  }
}

const checkWordRu = (perm, i) => {
  //create XMLHttpRequest object
  const xhr = new XMLHttpRequest()
  //open a get request with the remote server URL

  const wordQuery = input.value;

  const apiUrl = 'https://lleo.me/rifma/index.php?json=1';
  const queryParams = `&word=length&length=${i}&first=`;
  const url = apiUrl + queryParams + wordQuery

  xhr.open("GET", url );
  //send the Http request
  xhr.send();

  //EVENT HANDLERS

  //triggered when the response is completed
  xhr.onload = function() {
    if (xhr.status === 200) {
        //parse JSON datax`x
        data = JSON.parse(xhr.responseText);

        arr = data.result.split(' ');
        for (let j=0; j< perm.length; j+=1) {
          var word = perm[j];
          if(arr.includes(perm[j])){
            // console.log('exists : '+word);
            output.innerHTML += word+'<br>';
          } else {
            // console.log('not exist : '+word);
          }
        }
          
      } else if (xhr.status === 404) {
          // console.log("No records found")
      } else if (xhr.status === 429) {
          // console.log("Too many requests")
      }
  }

  //triggered when a network-level error occurs with the request
  xhr.onerror = function() {
      // console.log("Network error occurred")
  }

  //triggered periodically as the client receives data
  //used to monitor the progress of the request
  xhr.onprogress = function(e) {
      if (e.lengthComputable) {
          // console.log(`${e.loaded} B of ${e.total} B loaded!`)
      } else {
          // console.log(`${e.loaded} B loaded!`)
      }
  }
}

function permute(input) {
  const chars = input.split("");
  for (let i = 0; i < chars.length; i++) {
      const ch = chars.splice(i, 1);
      usedChars.push(ch);
      //if (chars.length === 0) { //to keep original size
      let newWord = usedChars.join("");
          if(permArr.indexOf(newWord) == -1){
          permArr[permArr.length] = newWord;
          }
      //}
      permute(chars.join(""));
      chars.splice(i, 0, ch);
      usedChars.pop();
  }
  return permArr
}

let permArr = [];
let usedChars = [];

btn_all.onclick = function() {
  permArr.length = 0;
  usedChars.length = 0;
  let perm = permute(input.value);
  perm = perm.filter(word => word.length >= minLen.value);
  perm = perm.filter(word => word.length <= maxLen.value);

  output.innerHTML = "Found "+perm.length+" combinations >= "+minLen.value+" chars, there :<br>";
  output.innerHTML += "<br>"+perm.join('<br>'); // output all combinations
}

btn_exist.onclick = function() {
  permArr.length = 0;
  usedChars.length = 0;
  let perm = permute(input.value);
  perm = perm.filter(word => word.length >= minLen.value);
  perm = perm.filter(word => word.length <= maxLen.value);

  output.innerHTML = "Found "+perm.length+" combinations >= "+minLen.value+" chars, there are existing:<br>";
  if (lang.value == 'en') {
    for(let i=0; i < perm.length; i++){
      checkWordEn(perm[i]);
      setTimeout(function(){}, 500);
    }
  } else if (lang.value == 'ru') {
    const mn = parseInt(minLen.value, 10);
    const mx = Math.min(maxLen.value, input.value.length);
    for (let i = mn; i<= mx; i+=1) {
      checkWordRu(perm, i);
    }
  }
}

btn_clear.onclick = function() {
  permArr.length = 0;
  usedChars.length = 0;
  output.innerHTML = "";
}