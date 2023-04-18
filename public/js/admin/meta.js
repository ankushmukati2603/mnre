
var section = location.pathname.split('/')[2]
var region = location.pathname.split('/')[3]

$('.edit_title').click(function () {
    //  $('#titlem').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get(`/meta/get/meta/content`).then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#titlem').addClass('is-active')
            $('#title').val(data.payload[region].title)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.titlesave').click(function () {
    addPageLoader("Saving Content")
    var title = $('#title').val()
    axios.post(`/meta/edit/${section}/${region}`, {
        title: title
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#titlem').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error. Error Code: 500')
            openNotification()
        }
    })
})
$('.edit_heading').click(function () {
    // $('#headingm').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get(`/meta/get/meta/content`).then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#headingm').addClass('is-active')
            $('#heading').val(data.payload[region].heading)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})



$('.headingsave').click(function () {
    addPageLoader("Saving Content")
    var heading = $('#heading').val()
    console.log(title)
    axios.post(`/meta/edit/${section}/${region}`, {
        heading: heading
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#headingm').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error. Error Code: 500')
            openNotification()
        }
    })
})

$('.edit_meta_keywords').click(function () {
    // $('#keywordm').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get(`/meta/get/meta/content`).then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#keywordm').addClass('is-active')
            $('#keyword').trumbowyg("html", data.payload[region].keywords)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})



$('.keywordsave').click(function () {
    addPageLoader("Saving Content")
    var keywords = $('#keyword').trumbowyg("html")
    axios.post(`/meta/edit/${section}/${region}`, {
        keywords: keywords
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#keywordm').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error. Error Code: 500')
            openNotification()
        }
    })
})

$('.edit_meta_description').click(function () {
    // $('#descriptionm').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get(`/meta/get/meta/content`).then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#descriptionm').addClass('is-active')
            $('#description').trumbowyg("html", data.payload[region].description)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})



$('.descriptionsave').click(function () {
    addPageLoader("Saving Content")
    var description = $('#description').trumbowyg("html")
    axios.post(`/meta/edit/${section}/${region}`, {
        description: description
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#descriptionm').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error. Error Code: 500')
            openNotification()
        }
    })
})