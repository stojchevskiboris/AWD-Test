//////////////////////////////
// view.html ...
// get query parameters
const urlParams = new URLSearchParams(window.location.search);
const watchID = urlParams.get('watch');
const title = urlParams.get('title');
const channelName = urlParams.get('channelName');
const publishedAt = urlParams.get('publishedAt');
console.log(watchID)
console.log(title)
console.log(channelName)
setTimeout(() => {
    document.getElementById('player').src = 'http://www.youtube.com/embed/' + watchID
    document.getElementById('watchTitle').innerText = title
    document.getElementById('channelName').innerText = channelName
    document.getElementById('publishedAt').innerText = 'Published at: ' + publishedAt
}, 200)


setTimeout(() => {
    // console.log(window.top.document.querySelector('iframe'))
    var a = document.querySelector('iframe')
    // console.log(a)
}, 2500)

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
    window.location.href = 'index.html?q=' + search
}


setTimeout(() => {
    document.getElementById("like").onclick = function () {
        console.log("test")
        addVideo(watchID)
    }
}, 100)

setTimeout(() => {
    document.getElementById("unlike").onclick = function () {
        console.log("test")
        removeVideo(watchID)
    }
}, 100)

var isLiked = false
db.get(watchID).then(() => {
    isLiked = true
}).catch(() => {
    isLiked = false
    }
)
setTimeout(()=>{
    if (isLiked){
        document.getElementById("unlike").style.display = 'block'
    } else {
        document.getElementById("like").style.display = 'block'

    }
},100)

db.allDocs({include_docs: true, descending: true}, function (err, doc) {
    console.log(doc.rows)
    likedVideos = doc.rows
});
//////////////////////////////
