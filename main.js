document.addEventListener('click', (e)=> {
  flipCard(e)
})



function flipCard(e){
  console.log("clicked");
  let dom = e.target.parentElement.classList
  if (dom.contains('memory__card')){
    dom.toggle('flip')
  }
  // e.target.parentElement.classList.toggle("flip")
  // e.target.parentElement.classList.toggle("active")
}