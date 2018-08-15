
document.addEventListener('DOMContentLoaded', ()=> {
  // check required fields
  // type=text
  let q1 = document.getElementById('email')
  let q2 = document.getElementById('nickname')
  // type=radio
  let q3_1 = document.getElementById('playaround')
  let q3_2 = document.getElementById('sellstuff')
  
  // change background-color if required fields filed is empty.
  let required_q_areas = document.querySelectorAll('.required_q')
  let q1_area = required_q_areas[0]
  let q2_area = required_q_areas[1]
  let q3_area = required_q_areas[2]
  
  // change background-color
  function backgroundWarn(dom){
    dom.classList.add("missValue");
  }
  
  function removeWarn(domAry){
    domAry.forEach( (dom) => {
      dom.classList.remove("missValue")
    })
  }
  
  // if submit clicked
  document.getElementById('submitButton').addEventListener('click', (e)=> {
    // 先清除 .missValue
    removeWarn([q1_area, q2_area, q3_area])

    if (q1.value === "") {
      backgroundWarn(q1_area)
    }
    if (q2.value === "") {
      backgroundWarn(q2_area)
    }
    if (!q3_1.checked && !q3_2.checked) {
      backgroundWarn(q3_area)
    }
  })

  // if submit triggered
  document.querySelector('form').addEventListener('submit', (e)=> {
    e.preventDefault()
    console.log("submit has sent!");
    let radios = document.getElementsByName('purpose')  //單選題的問題
    let purpose = ""            // 單選的id

    radios.forEach( (dom)=> {
       if(dom.checked){
        purpose = dom.id
       }
    })

    let data = {
      "email": document.getElementById('email').value,
      "nickname": document.getElementById('nickname').value,
      "purpose": [purpose],
      "other": document.getElementById('other').value
    }
    
    let alt = `
      email: ${data.email},
      nickname: ${data.nickname},
      purpose: ${data.purpose},
      other: ${data.other}
    `
    console.log(data);
    alert(alt)
  })
})