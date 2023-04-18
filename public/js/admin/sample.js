var es_section_banner = ''

const esSectionInputElement = document.querySelector('#esInputFileElement')
const esSectionPond = FilePond.create(esSectionInputElement)
esSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        console.log(file)
        es_section_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edites').click(function () {
    // $('#essectionone').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#esPanelSavedImage').attr('src', data.content.ENERGY_STORAGE.SECTION_ONE.IMAGE.LOCATION)
            esSectionPond.addFile(data.content.ENERGY_STORAGE.SECTION_ONE.IMAGE.LOCATION)
            $('#esDescription').trumbowyg("html", data.content.ENERGY_STORAGE.SECTION_ONE.SUMMARY)
            $('#essectionone').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Geo Thermal Panel One Update Error Code: 500')
            openNotification()
        }
    })
})


$('.saveEsSectionOne').click(function () {
    var image = es_section_banner.file
    var summary = $('#esDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/energy-storage/section-one', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#essectionone').removeClass('is-active')
            esSectionPond.removeFile()
            $('#esDescription').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Section One Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Section One Update Error. Error Code: 500')
            openNotification()
        }
    })
})