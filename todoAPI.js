$(document).ready(function(){
  var key = "2ce301aa5a178dc6f4f18bd0943e3e3bf888e1d99b72530b8970e6ec6e17f137";
  var todos = [];

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          todos = JSON.parse(this.responseText);
          render();
      }
  };

  xhttp.open("GET", "https://api.kraigh.net/todos", true);
  xhttp.setRequestHeader("x-api-key","2ce301aa5a178dc6f4f18bd0943e3e3bf888e1d99b72530b8970e6ec6e17f137");
  xhttp.send();

  // add todo functionality
  $('#newBtn').on('click', addTodo);
  $('#newText').on('keypress', function(e) {
    if(e.which == 13) {
      addTodo();
    }
  });

  // complete + delete functionality
  $('#todos').on('change', '.todoItem', completeTodo);
  $('#todos').on('click', '.delete', deleteTodo);

  function addTodo(event){
    // load text from new todo listener
    var newText = $('#newText').val();
    var data = {
        text: newText
    }
    var xhttp2 = new XMLHttpRequest();

    // Response handler, Wait for readyState = 4 & 200 response
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // parse JSON response
            var todo = JSON.parse(this.responseText);

            console.log(todo);
        } else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    };

    xhttp2.open("POST", "https://api.kraigh.net/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "2ce301aa5a178dc6f4f18bd0943e3e3bf888e1d99b72530b8970e6ec6e17f137");
    xhttp2.send(JSON.stringify(data));

    // set new todo listener to empty; append list item to todos unordered list
    $('#newText').val("");
    $('#todos').append('<li class="todoItem"> <input type = "checkbox">' + newText + '<a href=# id="deleteLink"> <span class="glyphicon glyphicon-trash delete"></span> </a> <hr> </li>');

    setTimeout(function () { location.reload(1); }, 1000);
  }

  function deleteTodo(event){
    var xhttp2 = new XMLHttpRequest();
    var todo_id = $(this).parent().parent().attr('id');
    var url_request = "https://api.kraigh.net/todos/" + todo_id;

    xhttp2.open("DELETE", url_request, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "2ce301aa5a178dc6f4f18bd0943e3e3bf888e1d99b72530b8970e6ec6e17f137");
    xhttp2.send();

    $(this).parent().parent().remove();
  }

  function completeTodo(event){
    var xhttp2 = new XMLHttpRequest();
    var todo_id = $(this).attr('id');
    var url_request = "https://api.kraigh.net/todos/" + todo_id;
    var data = {
        completed: true
    }

    xhttp2.open("PUT", url_request, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "2ce301aa5a178dc6f4f18bd0943e3e3bf888e1d99b72530b8970e6ec6e17f137");
    xhttp2.send(JSON.stringify(data));

    $(this).toggleClass('todoCOMPLETE');
  }

  function render() {
    for (i = 0; i < todos.length; i++) {
      console.log(todos[i]);
      if (todos[i]['completed'] == false) {
        $('#todos').append('<li id="' + todos[i]['id'] + '" class="todoItem"> <input type = "checkbox">' + todos[i]['text'] + '<a href=# id="deleteLink"> <span class="glyphicon glyphicon-trash delete"></span> </a> <hr> </li>');
      } else {
        $('#todos').append('<li id="' + todos[i]['id'] + '" class="todoItem todoCOMPLETE"> <input type = "checkbox">' + todos[i]['text'] + '<a href=# id="deleteLink"> <span class="glyphicon glyphicon-trash delete"></span> </a> <hr> </li>');
      }
    }
  }


});
