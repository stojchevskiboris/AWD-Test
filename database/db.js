// Initialization of variables
var db = new PouchDB('my_database');
var allTodos = []// an array of n objects

// add
function addTodo(text) {

    var todo = {
        _id: new Date().toLocaleString(),
        title: text,
        completed: false
    };
    db.put(todo)
}

// delete
function deleteTodo(i){
    document.querySelector('[todo_id="'+i+'"]').style.display = 'none'
    db.remove(allTodos[i].doc)
    displayTodos()
}

// mark as complete
function completeTodo(i){

    db.get(i).then(function(doc) {
        db.put({
            _id: doc._id,
            _rev: doc._rev,
            completed: true,
            title: doc.title
        });
        displayTodos()
    })

}

// display ToDos
function displayTodos() {
    db.allDocs({include_docs: true, descending: true}, function (err, doc) {
        console.log(doc.rows)
        allTodos = doc.rows
    });

    var text = ''
    setTimeout(() => {
        for (let x in allTodos) {
            var completed = ""
            if (allTodos[x].doc.completed)
                completed = ' completed '
            text += '<div class="ToDo'+completed+'" todo_id="'+x+'">' +
                '<p class="todoText">' + allTodos[x].doc.title + '</p>' +
                '<p class="d-inline-block">' + allTodos[x].doc._id + '</p>' +
                '<button class="float-end btn btn-danger d-inline-block" onclick="deleteTodo('+x+')">Delete</button>' +
                '<button class="float-end btn btn-primary me-1 d-inline-block" onclick="completeTodo(\''+allTodos[x].doc._id+'\')">Mark as done</button>' +
                '</div>'

            // db.remove(allTodos[x].doc)
        }
        document.getElementById("todos").innerHTML = text
    }, 500)
}

setTimeout(() => {
    document.getElementById("addToDo").onclick = function () {
        var input = document.getElementById("textInput").value
        if (input == "") return
        addTodo(input)
        displayTodos()
        document.getElementById("textInput").value = ''
    }
}, 100)




displayTodos()