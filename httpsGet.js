function checkWord(wordQuery){

  const https = require('https')
  // const apiUrl = "https://jsonmock.hackerrank.com/api/movies";
  // const apiUrl = 'https://api.datamuse.com/words?';
  // const queryParams = 'rel_jja=';

  const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/'
  const queryParams = 'en/';
  //const wordQuery = 'hello';
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
            console.log('not exist : '+wordQuery);
            resolve(false);
          } else {
            console.log('exist : '+wordQuery);
            //output.innerHTML = wordQuery+'<br>';
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

checkWord('das');