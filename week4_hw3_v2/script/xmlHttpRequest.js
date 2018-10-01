let accept = "application/vnd.twitchtv.v5+json"
let clientID = "8d2pq7tro8z1hpuf5fu9tmvidw5enl"
let Url = "https://api.twitch.tv/kraken/streams"
let limit = "20"
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

  let req = new XMLHttpRequest
  //req.open : initializes a newly-created request, or re-initializes an existing one
  req.open('GET', twitchUrl)

  // When using setRequestHeader(), you must call it after calling open(), but before calling send()
  // setRequestHeader 一次只能設定一組 key/value。無法整個物件丟進去
  req.setRequestHeader("Accept",accept)
  req.setRequestHeader("Client-ID", clientID)

  // 發出 request
  req.send();

  // when an XMLHttpRequest transaction completes successfully ... ...
  // XMLHttpRequestEventTarget.onload
  req.onload = function getStreams(){
    let respJSON = JSON.parse(req.responseText)  //responseText feature is obsolete. Try to avoid using it.

    if (req.status >= 200 && req.status < 400){
      // 更改網頁 title
      document.querySelector('.gameTitle').innerText = respJSON.streams[0].game
      // 把 stream 一個個 append 到 .container 裡
      respJSON.streams.forEach( stream => {
        let { channel: {url, logo, status, display_name},
              preview: {medium},
              created_at } = stream

        document.querySelector('.container').innerHTML += renderStream(url, medium, logo, status, display_name, created_at)
      })
    } else {
      document.querySelector('.container').innerHTML += `<h1>something wrong !</h1>`
    }
  }
  //
  function renderStream(url, medium, logo, status, display_name, created_at){
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
      req.open('GET', twitchUrl)
      req.setRequestHeader("Accept", accept)
      req.setRequestHeader("Client-ID", clientID)
      req.send();
    }
  })
})