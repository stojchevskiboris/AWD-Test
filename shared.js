//////////////////////////////
// shared ...

// load header and footer so it`s not hard coded on every view
$(function () {
    $("#footer").load("footer.html");
    $("#header").load("header.html");
});


function inAuto() {
    var predictions = []
    var q = document.getElementById("searchInput").value
    if (q === '' || q == null)
        return
    var url = `https://api.datamuse.com/words?sp=${q}*&max=10`
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(wordInfo => {
                predictions.push(wordInfo.word)
            });
        })

    setTimeout(() => {
        autocomplete(predictions)
    }, 200)
}

function autocomplete(predictions) {
    var btn1 = document.getElementById("bt1")
    $("#searchInput").autocomplete({
        source:predictions,
        select: function (event, ui) { //ui.item.label
            document.getElementById("searchInput").innerText = ui.item.label
            setTimeout(() => {
                btn1.click()
                document.getElementById("searchInput").blur()
            }, 200)

        }
    })
}






