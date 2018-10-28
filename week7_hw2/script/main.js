// 可以使用 jQuery 了

$(document).ready( function(){
  console.log("jquery ready")
  let lists = []

  function addTodo(content) {
    let todo = {content,
                isDone: false}
    lists.unshift(todo)
    render()
    $('input').val("")
  }

  function changeState(content){
    lists.forEach( list => {
      if (list.content === content) {
        if (list.isDone) {
          list.isDone = false
        } else {
          list.isDone = true
        }
      }
    })
    render()
  }

  function removeTodo(content) {
    lists = lists.filter( list => list.content !== content )
    render()
  }

  function render() {
    $('.list-group').empty()

    lists.forEach( list => {
      if (list.isDone) {
        $('.list-group').append(`<li class="list-group-item d-flex justify-content-between align-items-center bg-secondary">
                                      <p>${list.content}</p>
                                      <p class="mr-auto"></p>
                                      <button type="button" class="btn__delete btn p-2 mr-3 btn-outline-primary">DELETE</button>
                                      <button type="button" class="btn__finish btn p-2 btn-outline-warning">REDO</button>
                                </li>`)
      } else {
        $('.list-group').append(`<li class="list-group-item d-flex justify-content-between align-items-center">
                                        <p>${list.content}</p>
                                        <p class="mr-auto"></p>
                                        <button type="button" class="btn__delete btn btn-outline-secondary p-2 mr-3">DELETE</button>
                                        <button type="button" class="btn__finish btn btn-outline-success p-2">Finish</button>
                                  </li>`)
      }
    })
  }

  $('input').keyup( (e)=> {
    if( e.which === 13) {
      let todoContent = $('input').val()
      addTodo(todoContent)
    }
  })
  
  $('.list-group').click( (e)=> {
    // remove a todo.
    if ($(e.target).hasClass('btn__delete')){
      removeTodo( $(e.target).siblings()[0].innerText )
    }
    // change state.
    if ($(e.target).hasClass('btn__finish') || $(e.target).hasClass('btn__redo')) {
      changeState($(e.target).siblings()[0].innerText)
    }
  })

})