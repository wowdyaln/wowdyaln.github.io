let firstCard = {
  isFliped: false,
  logo: ""
}
let secondCard = {
  isFliped: false,
  logo: ""
}

document.addEventListener('click', (e)=> {
  let dom = e.target.parentElement.classList
  if (dom.contains('pause')){ return }
  if (!firstCard.isFliped){
    checkFirstCard(e)
    flipCard(e)
  }else if (firstCard.isFliped && !secondCard.isFliped){
    
    flipCard(e)
    // secondCard.isFliped = true
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

        // resetCardState()
      }

    }, 1000) // hardcode , 怎麽直接取得 CSS .memory__card transition 的秒數？
    
  }
})



function flipCard(e){
  console.log("clicked");
  let dom = e.target.parentElement.classList
  if (dom.contains('memory__card')){
    dom.toggle('flip')
    dom.toggle('pause')
  }
}

// first flip ; second flip
// after flip, check 'alt' property
function checkFirstCard(e){
  // let dom = e.target.parentElement.classList
    firstCard.isFliped = true
    firstCard.logo = e.target.alt
}

function resetCardState(){
  firstCard.isFliped = false
  secondCard.isFliped = false
  firstCard.logo = ""
  secondCard.logo = ""
}
    
