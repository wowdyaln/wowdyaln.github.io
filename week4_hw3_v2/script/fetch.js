let accept = "application/vnd.twitchtv.v5+json"
let clientID = "8d2pq7tro8z1hpuf5fu9tmvidw5enl"
let Url = "https://api.twitch.tv/kraken/streams"
let limit = "20"
let myHeaders = new Headers({
  "Accept": accept,
  "Client-ID": clientID,
});
var myInit = {
  method: 'GET',
  headers: myHeaders,
};
let gameList = {
  "LOL": "League%20of%20Legends",
  "SFV": "Street%20Fighter%20V",
  "ZD": "The%20Legend%20of%20Zelda%3A%20Breath%20of%20the%20Wild",
}
let twitchUrl = `${Url}/?game=${gameList["LOL"]}&limit=${limit}`

// DOMContentLoaded ready
// initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', ()=>{
  console.log("DOM ready");
  // 使用 fetch 發 request
  getStreams(twitchUrl, myInit)
  
  // 當下拉選單有更動時候，清除畫面，重新發 request
  document.getElementById('selector').addEventListener('change', () => {
    let doms = document.getElementById('game-select')
    let game = doms[doms.selectedIndex].value  //! the point.

    if (game) {
      let queryGame = gameList[game]
      twitchUrl = `${Url}/?game=${queryGame}&limit=${limit}`
      // clean screen
      let containerDom = document.querySelector('.container')
      while (containerDom.firstChild) {     //! the point.
        containerDom.removeChild(containerDom.firstChild);
      }
      // 重新發 request
      getStreams(twitchUrl, myInit)
    }
  })

  // 把 fetch 包成 function 使用
   function getStreams(twitchUrl, myInit){
    fetch(twitchUrl, myInit)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Network response was not ok.');
      })
      .then((respJSON) => {
        // 更改網頁 title
        document.querySelector('.gameTitle').innerText = respJSON.streams[0].game
        // 把 stream 一個個 append 到 .container 裡
        respJSON.streams.forEach(stream => {
          let { channel: { url, logo, status, display_name },
            preview: { medium },
            created_at } = stream

          document.querySelector('.container').innerHTML += renderStream(url, medium, logo, status, display_name, created_at)
        })
      })
      .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      })
  }
  //
  function renderStream(url, medium, logo, status, display_name, created_at) {
    return `
            <div class="container__box">
              <div class="box__video">
                <a href="${url}" target="_blank">
                  <img src=${medium}>
                </a>
              </div>
              <div class="box__avatar">
                <img class="avatar__img" src=${logo}>
                <div class="avatar__info">
                  <h6 class="info__status"> ${status}</h6>
                  <h6 class="info__host"> ${display_name}</h6>
                  <h6 class="info__timeLast"> ${created_at}</h6>
                </div>
              </div>
            </div>
                `
  }
})