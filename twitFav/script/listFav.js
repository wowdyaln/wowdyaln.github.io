let cb = new Codebird;
cb.setConsumerKey(oauth_consumer_key, oauth_secret)
cb.setToken(oauth_token, oauth_token_secret);

let params = {
  count: 5,
  screen_name: "poooo_chu"
}

document.addEventListener('DOMContentLoaded', ()=> {
  console.log("DOM ready");

  // 使用 codebird 發 request
  getSomeoneFavs(params)

  // 觸發 submit 事件就清除畫面，重發 request
  document.getElementById('getFavs').addEventListener('submit', (e)=>{
    
    let user = document.querySelector('#search').value
    params.screen_name = user
    if (user){
      e.preventDefault()
      let nums = document.getElementById('favNumber').value
      if (nums) {
        params.count = Number(nums)
      }
      document.querySelector('#search').value = ""
      console.log(`get ${user}'s fav tweets ( ${nums} posts )`);
  
      getSomeoneFavs(params)
    }
  })

})

// send a request to twitter api
function getSomeoneFavs(queryObj){
  console.log("fetching data ... ...");
  cb.__call("favorites/list", queryObj, function (replys, rate, err) {
    if (replys) {
      console.log("fetch OK !");
      removeOldTweets()

      // add title
      document.querySelector('.container').innerHTML += `
       <h1 class="card">${queryObj.screen_name}'s favorite tweets.</h1>
      `
      
      replys.forEach(reply => {
        renderTweet(reply)
      })
    }

    if (err) {
      console.log(err);
      renderErrorMsg()
    }
  });
}


function removeOldTweets(){
  let containerDom = document.querySelector('.container')
  while (containerDom.firstChild){
    containerDom.removeChild(containerDom.firstChild)
  }
}


function renderTweet(tweet) {
  let { text,
        favorite_count,
        user: { 
          name,
          profile_image_url_https,
          screen_name,
          description
        }
      } = tweet

  document.querySelector('.container').innerHTML += `

          <article class="card">
            <h3 class="card__text">${text}</h3>
            <div class="card__favs">
              <div class="heart"></div>
              <span class="favCount">${favorite_count}</span>
            </div>
            <details class="card__author">
              <summary>作者(按我)</summary>
              <img class="author__pic" src=${profile_image_url_https}>
              <span class="author__name">${name}</span>
              <span class="author__screenName">@${screen_name}</span>
              <span class="author__description">${description}</span>
            </details>
          </article>
          `
}

function renderErrorMsg(){
  document.querySelector('.container').innerHTML += `

              <h1>Sorry ! Nothing found ... ... </h1>
        `
}




