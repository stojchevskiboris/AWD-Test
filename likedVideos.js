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

db.allDocs({include_docs: true, descending: true}, function (err, doc) {
    console.log(doc.rows)
    likedVideos = doc.rows
});

function deleteAllLikedVideos() {
    setTimeout(() => {
        for (let x in likedVideos) {
            db.remove(likedVideos[x].doc)
        }
    }, 1000)
}


setTimeout(function () {
    var text = ""
    for (let x in likedVideos) {
        var title = likedVideos[x].doc.title
        var id = likedVideos[x].doc._id
        var publishedAt = likedVideos[x].doc.publishedAt
        var channelName = likedVideos[x].doc.channelName
        var liveClass = ''
        if (publishedAt == "Live")
            liveClass = ' live live2 '
        text +=
            '<div class="col mb-4">' +
            '<div class="card" style="width: 20rem">' +
            '<a class="text-decoration-none" href="view.html?watch='+id+'&amp;title='+title+'&amp;channelName='+channelName+'&amp;publishedAt='+publishedAt+'">' +
            '<img src="https://img.youtube.com/vi/'+id+'/0.jpg" class="card-img-top" alt="..."></a>' +
            '<div class="card-body cb-1">'+
            '<div><a class="text-decoration-none" href="view.html?watch='+id+'&amp;title='+title+'&amp;channelName='+channelName+'&amp;publishedAt='+publishedAt+'">'+
            '<h5 class="card-title">The Ugly TRUTH About Programming in 2023 (what you MUST know..)</h5></a>' +
            'Channel: '+channelName+'</div>' +
            '<p class="card-text text-end'+liveClass+'">'+publishedAt+'</p>'+
            '</div>' +
            '</div>' +
            '</div>'


        document.getElementById("results").innerHTML = text

    }

    // error prevention timeout call if last one didnt succeed
    setTimeout(() => {
        if (document.getElementById("results").innerHTML === '<img id="loadingGIF" src="static/loading.gif">') {
            console.log("calling with q: " + search)
            call(search)
        }
    }, 1500)

}, 800)