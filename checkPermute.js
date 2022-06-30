function checkWord(wordQuery){
    const https = require('node:https');
  
    const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/';
    const queryParams = 'en/';
    const url = apiUrl+queryParams+wordQuery;
  
    function httpGet() {
      return new Promise(function(resolve, reject) {
        https.get(url, res => {
          let data = '';
          res.on('data', chunk => {
            data += chunk;
          });
          res.on('end', () => {
            dataObj = JSON.parse(data);
            if('title' in dataObj){
              resolve(false);
            } else {
            //   output.innerHTML = wordQuery+'<br>';
              console.log(wordQuery);
              resolve(true)}
          });
          res.on('error', err => {
            reject('error:' + err);
          })
        })
      })
    }
    httpGet().then(function(result) {
      return result;
    })
    .catch((e) => {return 'error:'+e});
}

let permArr = [];
let usedChars = [];

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
};

btn_all_onclick = function() {
    let perm = permute(input.value);
    // output.innerHTML = "<br>"+perm.join('<br>'); // output all combinations
    console.log(perm.join( ));
}

btn_exist_onclick = function() {
    let perm = permute(input.value);
    for(let i=0; i < perm.length; i++){
        if(perm[i].length>2){checkWord(perm[i])}
    }
}

input = {
    value: 'exs'
}

console.log('all:');
btn_all_onclick();

console.log('exist:')
btn_exist_onclick();