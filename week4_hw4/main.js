
function q(selector){
  let dom = document.querySelector(selector)
  return dom
}

HTMLElement.prototype.hide = function() {
  this.hidden = true
}

HTMLElement.prototype.show = function() {
  this.hidden = false
}



let msg = `* try this example in devTool console :


              let img = q('img')
              img.hide()
              img.show()

              let aa = q('body > div > p:nth-child(3) > a')
              aa.hide()
              aa.show()
              
              `

console.log(msg);