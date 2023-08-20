// shared ...

// load header and footer so it`s not hard coded on every view
$(function () {
    $("#footer").load("footer.html");
    $("#header").load("header.html");
});


// generate predictive words
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

// set autocomplete on input
function autocomplete(predictions) {
    var btn1 = document.getElementById("bt1")
    $("#searchInput").autocomplete({
        source: predictions,
        select: function (event, ui) { //ui.item.label
            document.getElementById("searchInput").innerText = ui.item.label
            setTimeout(() => {
                btn1.click()
                document.getElementById("searchInput").blur()
            }, 200)

        }
    })
}

// Storing user session
// Function to save the session ID to browser`s localStorage
function saveSessionId() {
    const sessionId = generateSessionId();
    localStorage.setItem('sessionId', sessionId);
    console.log('Session ID saved:', sessionId);
}

// Function to clear the session ID from localStorage
function clearSessionId() {
    localStorage.removeItem('sessionId');
    console.log('Session ID cleared.');
}

// Function to generate a random session ID
function generateSessionId() {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let sessionId = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        sessionId += charset[randomIndex];
    }
    return sessionId;
}

// Check if there is a saved session ID and display it on page load
document.addEventListener('DOMContentLoaded', () => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        console.log('Retrieved Session ID:', sessionId);
    } else {
        saveSessionId()
    }
});


// User session using pouchDB, initialization of variables
var db = new PouchDB('users_db');
var likedVideos = [] // an array of all liked videos

// add video to liked videos
function addVideo(watchID) {
    var video = {
        _id: watchID,
        title: title,
        channelName: channelName,
        publishedAt: publishedAt,
        dateAdded: new Date().toLocaleString(),
        userSession: localStorage.getItem('sessionId')
    };
    db.put(video)
        .then(()=>{
            setTimeout(()=>{
                document.getElementById("like").style.display = 'none'
                document.getElementById("unlike").style.display = 'block'
            },100)
        })


}

// remove video from liked videos
function removeVideo(watchID) {
    db.get(watchID)
        .then((x)=>{
            db.remove(x)
            setTimeout(()=>{
                document.getElementById("like").style.display = 'block'
                document.getElementById("unlike").style.display = 'none'
            },100)
        })
}


// set liked videos style
setTimeout(() => {
    var h = document.getElementById('searchInput').offsetHeight
    document.getElementById('homeLink').style.height = h+'px'
    document.getElementById('likedVids').style.height = h+'px'
    document.getElementById('likedVids').style.border = '1px solid #0d6efd'
    console.log(h)
}, 200)

setTimeout(() => {
    document.getElementById("likedVids").onclick = function (){
        window.location.href = 'likedVideos.html'
    }
}, 300)