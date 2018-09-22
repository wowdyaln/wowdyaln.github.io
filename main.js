// const cards = document.querySelectorAll('.memory__card')

document.addEventListener('click', (e)=> {
  flipCard(e)
})

function flipCard(e){
  console.log("clicked");
  e.target.parentElement.classList.toggle("flip")
}