// todo: 偶爾會有單張卡片無法 recover，或是無法 flip 的 bug

let firstCard = {
  isFliped: false,
  logo: "",
  isSun: false
}
let secondCard = {
  isFliped: false,
  logo: ""
}

let clickLock = false;

document.addEventListener('click', (e)=> {
  if (clickLock) { return }
  let dom = e.target.parentElement.classList
  if (dom.contains('pause')){ return }
  if (!firstCard.isFliped){
    checkFirstCard(e)
    flipCard(e)

  } else if (firstCard.isFliped && !secondCard.isFliped){
    flipCard(e)
    clickLock = true  //!
    secondCard.logo = e.target.alt
    setTimeout( ()=>{
      if (secondCard.logo === firstCard.logo) {
        resetCardState()
        return
        
      } else {
        // recover this card and a card which logo is : firstCard.logo
        secondCard.isFliped = false
        secondCard.logo = ""
        flipCard(e)
        
        recoverPreviousCard(firstCard.logo)
        resetCardState()
      }
    }, 1000) //delay time of recovering a card, 
  }
})

function flipCard(e){
  let dom = e.target.parentElement.classList
  if (dom.contains('memory__card')){
    dom.toggle('flip')
    dom.toggle('pause')
  }
}

function checkFirstCard(e){
  // let dom = e.target.parentElement.classList
    firstCard.isFliped = true
    firstCard.logo = e.target.alt
  if (e.target.parentElement.classList.contains('sun')){
    firstCard.isSun = true
  }
}

function resetCardState(){
  clickLock = false
  firstCard.isFliped = false
  firstCard.isSun = false
  secondCard.isFliped = false
  firstCard.logo = ""
  secondCard.logo = ""
}
    
function recoverPreviousCard(logo) {
  let previousCards = document.querySelectorAll(`img.card__front[alt="${logo}"]`)
  let sunOrMoon
  if (firstCard.isSun){
    sunOrMoon = "sun"
  } else {
    sunOrMoon = "moon"
  }
  let previousCard
  
  previousCards.forEach( dom => {
    if (dom.parentElement.classList.contains(sunOrMoon) ){
      previousCard = dom.parentElement
    }
  })
  previousCard.classList.toggle('flip')
  /* error msg :
    ? Cannot read property 'classList' of undefined
    ? at recoverPreviousCard (main.js:86)
    ? at setTimeout (main.js:38)
  */
  previousCard.classList.toggle('pause')
}