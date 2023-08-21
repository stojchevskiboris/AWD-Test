function focusFunc() {
    var input = document.getElementById("searchInput");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            call()
        }
    });
}

function focusFunc2() {
    var input = document.getElementById("searchInput2");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            call2()
        }
    });
}

function call() {
    document.getElementById('searchInput').blur()
    var search = document.getElementById('searchInput').value
    if (search == undefined || search == "")
        return
    window.location.href = 'searchResults.html?q=' + search
}

function call2() {
    document.getElementById('searchInput2').blur()
    var search = document.getElementById('searchInput2').value
    if (search == undefined || search == "")
        return
    window.location.href = 'searchResults.html?q=' + search
}