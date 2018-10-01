let accept = "application/vnd.twitchtv.v5+json"
let clientID = "8d2pq7tro8z1hpuf5fu9tmvidw5enl"
let Url = "https://api.twitch.tv/kraken/search/games"
let searchGame = "Super Mario"

let myHeaders = new Headers({
  "Accept": accept,
  "Client-ID": clientID,
});
var myInit = {
  method: 'GET',
  headers: myHeaders,
};

let twitchUrl = `${Url}?query=${searchGame}&live=true`

// DOMContentLoaded ready
// initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM ready");
  // 使用 fetch 發 request
  getGames(twitchUrl, myInit) // Super Mario
  
  // 觸發 submit 事件就，清除畫面，重新發 request
  document.querySelector('.searchBox').addEventListener('submit', (e) => {
    e.preventDefault()
    searchGame = document.querySelector('#search').value
    document.querySelector('#search').value = ""
    console.log(searchGame)

    if (searchGame) {
      twitchUrl = `${Url}?query=${searchGame}&live=true`
      // clean screen
      let containerDom = document.querySelector('.container')
      while (containerDom.firstChild) {     //! the point.
        containerDom.removeChild(containerDom.firstChild);
      }
      // 重新發 request
      getGames(twitchUrl, myInit)
    }
  })


  // 把 fetch 包成 function 使用
  function getGames(twitchUrl, myInit) {
    fetch(twitchUrl, myInit)
      .then(res => {
        if (res.ok) {
          console.log("get response , OK");
          return res.json()
        }
        throw new Error('Network response was not ok.');
      })
      .then((respJSON) => {
        // 如果有找到遊戲
        if ( respJSON.games  ){
          // 把 stream 一個個 append 到 .container 裡
          respJSON.games.forEach( game => {
            let { 
                  name,
                  _id,
                  box: { large }
                } = game
  
            document.querySelector('.container').innerHTML += renderStream(name, _id, large)
          })
        } else if ( respJSON.games == null) {
          // 沒找到遊戲
          document.querySelector('.container').innerHTML += renderErroMsg()
        }
      })
      .catch(function (error) {
        renderErroMsg()
        console.log('There has been a problem with your fetch operation: ', error.message);
      })
  }
  //
  function renderStream(name, _id, large) {
    // name = encodeURI(name)
    // https://stackoverflow.com/questions/14693758/passing-form-data-to-another-html-page
  return `
          <div class="container__box">
              <form action="./streams.html" method="GET" target="_blank">
                  <input type="hidden" name="gameName" value="${name}" />
                  <input class="submit" type="submit" value="目前 Live" />
              </form>

              <img src=${large}>
          </div>
          `
  } 

  function renderErroMsg(){
    return `
              <h1>Sorry ! Nothing found ... ... </h1>
        `
  }
})