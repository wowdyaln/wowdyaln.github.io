/*
* 按下數字，顯示在 panel 上
* 按下 Operator ， 清空 panel ，等待下個數字
* 按下 equal ，顯示計算結果
todo : 長位數的浮點運算會有瑕疵
todo : 再按數字時候，如何清除第一次輸入的數字
todo : 一開始不能按
*/
let answer = 0,
    temp = 0,
    // hasOp = false,  // operator 按鈕有沒有被按到
    op = "",
    hasPercent = false,
    done = false


function resetAll(){
  if (op){
    document.querySelector(`.${op}`).classList.remove("active")
  }

  answer = 0
  temp = 0
  // hasOp = false
  op = ""
  hasPercent = false
  done = false
}
// DOMContentLoaded : the initial HTML document has been completely loaded and parsed,
// without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', ()=> {
  // 計算機視窗
  let result = document.getElementsByClassName('panel')
  document.querySelector('.grid-container').addEventListener('click', e => {
    
    let screen = result[0].innerText // click 動作之前， 視窗顯示的
    let button = e.target.innerText  // click 按到那個按鈕
    let classAry = e.target.className.split(" ")  // 每個按鈕的 class (多個)
    let opAry = ["plus", "minus", "multiply", "divide"] // 運算符號

    //* 按到 0~9 or 小數點 (done = false)
    if (!done){
      if (screen === "0" && classAry[1] === "point") {
        result[0].innerText = "0."
      } else if (classAry[0] === "numbers" && screen !== "0") {
        //* 重複按 小數點沒有用
        let dotCheck = /\./
        if (dotCheck.test(screen) && button === ".") return

        //! 再按數字時候，如何清除第一次輸入的數字

        result[0].innerText += button
      } else if (classAry[0] === "numbers" && screen === "0") {
        result[0].innerText = button
      }
    }

    //* 按到 AC ; percent
    if (classAry[0] === "ac") {
      result[0].innerText = "0"
      resetAll()
    } else if (classAry[1] === "percent") {
      if (hasPercent === true) return;
      result[0].innerText = result[0].innerText / 100 + "%"
      hasPercent = true
      op = "percent"
      e.target.classList.add("active") //* 按鈕變色

    }

    //* 怎樣狀況下才可以按 oprator ?
    if (!op && screen === "0") {
      // 按 oprator 之前，要先輸入數字
      if (classAry[0] === "operator") return;
    }

    if (opAry.includes(classAry[1]) && !done) {
    // if (screen !== "0" && opAry.includes(classAry[1]) && !done) {
      temp = Number(screen)        //* 把目前 screen 數字存起來
      op = classAry[1]
      // hasOp = true
      e.target.classList.add("active") //* 按鈕變色
      result[0].innerText = "0" //! 有瑕疵
    }


    function calc(op, strNum){
      let num = Number(strNum)
      if (op === "plus"){
        answer = temp + num
      }
      if (op === "minus") {
        answer = temp - num
      }
      if (op === "multiply") {
        answer = temp * num
      }
      if (op === "divide") {
        answer = temp / num
      }
    }

    //* 按 equal

      if (classAry[1] === "equal" && op !== "") {
        calc(op, screen)
        result[0].innerText = answer
        document.querySelector(`.${op}`).classList.remove("active")
        op = ""
        done = true
      }

  })
})