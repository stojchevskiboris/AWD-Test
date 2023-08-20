function focusFunc() {
    var input = document.getElementById("searchInput");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            call()
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