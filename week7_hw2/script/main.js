// 可以使用 jQuery 了

$(document).ready( function(){
  console.log("jquery ready")

  function createTodoEle(content){
    let todoRow = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
            ${content}
            <p class="mr-auto"></p>
            <button type="button" class="btn__delete btn btn-outline-secondary p-2 mr-3">DELETE</button>
            <button type="button" class="btn__finish btn btn-outline-success p-2">Finish</button>
      </li>
      `
    $('.list-group').prepend(todoRow)
    $('input').val("")
  }

  function removeTodoEle(dom){
    dom.parent().addClass('removeMe')
    dom.parent().fadeOut(300, ()=>{
      $('.removeMe').remove()
    })
  }

  function changeState(dom){
    dom.parent().toggleClass('bg-secondary')
    dom.prev().toggleClass('btn-outline-secondary').toggleClass('btn-outline-primary')
    dom.toggleClass('btn-outline-success').toggleClass('btn-outline-warning')
    if (dom.text() === "Finish"){
      dom.text("REDO")
    } else if (dom.text() === "REDO"){
      dom.text("Finish")
    }
  }

  // create a todo
  $('input').keyup( (e)=> {
    // if press 'Enter'
    if( e.which === 13) 
    {
      let todoContent = $('input').val()
      createTodoEle(todoContent)
    }
  })

  // remove a todo.
  $('.list-group').click( (e)=> {
    if ($(e.target).hasClass('btn__delete')){
      removeTodoEle( $(e.target) )
    }
  })

  // change state.
  $('.list-group').click((e) => {
    if ($(e.target).hasClass('btn__finish') || $(e.target).hasClass('btn__redo')) {
      console.log('finished');
      changeState( $(e.target) )
    }
  })
  
})