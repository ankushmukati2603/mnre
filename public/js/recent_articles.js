var hash = `${location.pathname.split('/')[2]}`
console.log(hash)
axios.get(`http://10.246.24.71/newsarticles/${hash}`).then(response => response.data).catch(error => {
    console.log(error)
}).then(data => {
    var keyword = data.meta_keywords.split(' ')[1]
    axios.get(`http://10.246.24.71/newsarticles?meta_keywords_contains=${keyword}`).then(response => response.data).catch(error => {
        console.log(error)
    }).then(wata => {
        var match = wata.findIndex(w => w._id == data._id)
        console.log(match)
        for (var i = 0; i < 3; i++) {
            if (i != match) {
                if (wata[i].thumbnail) {
                    $('.blog-sidebar').append(`
                        <div class="col" style="padding-top:20px;padding-bottom: 20px">
                            <div class="blog-content">
                                <p class="content text-left" style="width:90%">${wata[i].title}</p>
                                <a href="/news/${wata[i]._id}" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `)
                } else {
                    $('.blog-sidebar').append(`
                        <div class="col" style="padding-top:20px;padding-bottom: 20px">
                            <div class="blog-content">
                                <p class="content text-left" style="width:90%">${wata[i].title}</p>
                                <a href="/news/${wata[i]._id}" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `)
                }
            }
        }
    })
})