// let cb = new Codebird;
// cb.setConsumerKey(oauth_consumer_key, oauth_secret)
// cb.setToken(oauth_token, oauth_token_secret);

let findUserQ = {
  q: "",
  count: 10
}


document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM ready");

  // 使用 codebird 發 request
    searchUser(findUserQ)


  // 觸發 submit 事件就清除畫面，重發 request
  document.getElementById('serachUser').addEventListener('submit', (e) => {

    let q = document.querySelector('#queryUser').value
    if (q) {
      findUserQ.q = q
      e.preventDefault()

      document.querySelector('#queryUser').value = ""
      console.log(`find '${q}' ${findUserQ.count} possible screen name. `);

      searchUser(findUserQ)
    }
  })

})
// send a request to twitter api
function searchUser(queryObj) {
  if (findUserQ.q) {
    console.log("fetching data ... ...");
    cb.__call("search/tweets", queryObj, function (replys, rate, err) {
      if (replys) {
        console.log("fetch OK !");
        removeOldUsers()
        
        let users = replys.statuses
        let parentDom = document.querySelector('.serachUser__result')
  
        users.forEach(row => {
          let user = row.user.screen_name
          console.log(user);
          let p = document.createElement("p")
          p.innerHTML = user
          parentDom.insertBefore(p, parentDom.firstChild)
        })
      }
  
      if (err) {
        console.log(err);
        renderErrorMsg()
      }
    })
  }
}

function removeOldUsers() {
  let parentDom = document.querySelector('.serachUser__result')
  while (parentDom.firstChild) {
    parentDom.removeChild(parentDom.firstChild)
  }
}