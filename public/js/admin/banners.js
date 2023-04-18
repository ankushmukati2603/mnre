
const openNotification = function () {
    $('#dashboardNotification').addClass('is-visible')
    setTimeout(function () {
        $('#dashboardNotification').removeClass('is-visible')
    }, 1500)
}

$('.ministryModalClose').on('click', function () {
    $('.modal').removeClass('is-active')
    $('.banners_multiple').html('')
    ministryBannerPond.removeFile()
})



var ministry_banner = ''

const ministryBannerInputElement = document.querySelector('#ministryBannerFileElement');
const ministryBannerPond = FilePond.create(ministryBannerInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File Upload Format"
});
ministryBannerPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        ministry_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_banner_ministry').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministryBanner').addClass('is-active')
            $('#ministryBannerDescription').trumbowyg('html', data.content.MINISTRY_BANNER.DESCRIPTION);
            $('#ministry_banner_image_db').attr('src', data.content.MINISTRY_BANNER.IMAGE.LOCATION)
            ministryBannerPond.addFile(data.content.MINISTRY_BANNER.IMAGE.LOCATION)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Occured in Getting Banner Data')
            openNotification()
        }
    })
})

$('.bannerModalSave').click(function () {
    console.log('ok')

    var banner_description = $('#ministryBannerDescription').trumbowyg('html');
    console.log(banner_description)
    var fd = new FormData()
    fd.append('image', ministry_banner.file)
    fd.append('banner_description', banner_description)
    console.log(fd)
    axios.post('/admin/ministry-banner', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#ministryBanner').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Banner Image & Banner Description Uploaded')
            ministryBannerPond.removeFile()
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Refresh and Try Again')
            openNotification()
        }
    })
})

const ministryJourneyInputElement = document.querySelector('#journeyImageFileElement')
const ministryJourneyPond = FilePond.create(ministryJourneyInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var journey_image = ''

ministryJourneyPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        journey_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_journey_image').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministryJourney').addClass('is-active')
            $("#journeyDescription").trumbowyg('html', data.content.MINISTRY_JOURNEY.DESCRIPTION)
            $('#journey_banner_image_db').attr('src', data.content.MINISTRY_JOURNEY.IMAGE.LOCATION)
            ministryJourneyPond.addFile(data.content.MINISTRY_JOURNEY.IMAGE.LOCATION)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Occured in Getting Banner Data')
            openNotification()
        }
    })
})

$('.journeyModalSave').click(function () {
    var journey_description = $('#journeyDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', journey_image.file)
    fd.append('journey_description', journey_description)
    axios.post('/admin/journey-image', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data
    }).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#ministryJourney').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Journey Image & Journey Description Uploaded')
            ministryJourneyPond.removeFile()
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Refresh and Try Again')
            openNotification()
        }
    })
})



$('.edit_vision_description').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministryVision').addClass('is-active')
            $("#ministry-vision-description").trumbowyg('html', data.content.MINISTRY_VISION_DESCRIPTION)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Occured in Getting Banner Data')
            openNotification()
        }
    })
})

$('.saveMinistryVision').click(function () {
    var ministry_vision = $('#ministry-vision-description').trumbowyg('html')
    axios.post('/admin/ministry-vision', {
        ministry_vision: ministry_vision
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministry-vision-description').trumbowyg("html", data.content.MINISTRY_VISION_DESCRIPTION)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Ministry Vision Description Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error Occured. Please Refresh the Page ')
            openNotification()
        }
    })
})

$('.edit_aob').click(function () {
    $('#ministryAobDescription').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministryAobDescription').addClass('is-active')
            $("#ministry-aob-description").trumbowyg('html', data.content.MINISTRY_AOB_DESCRIPTION)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Occured in Getting Banner Data')
            openNotification()
        }
    })
})

$('.saveMinistryAOB').click(function () {
    var ministry_aob = $('#ministry-aob-description').trumbowyg('html')
    axios.post('/admin/ministry-aob', {
        ministry_aob: ministry_aob
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministry-aob-description').trumbowyg("html", data.content.MINISTRY_AOB_DESCRIPTION)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Ministry AOB Description Updated')
            openNotification()
            location.reload();
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error Occured. Please Refresh the Page ')
            openNotification()
        }
    })
})



$('.edit_func').click(function () {
    $('#ministryFunctionDescription').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministryFunctionDescription').addClass('is-active')
            $("#ministry-function-description").trumbowyg('html', data.content.MINISTRY_FUNCTION_DESCRIPTION)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Occured in Getting Banner Data')
            openNotification()
        }
    })
})

$('.saveMinistryFunc').click(function () {
    var ministry_func = $("#ministry-function-description").trumbowyg('html')
    axios.post('/admin/ministry-function', {
        ministry_func: ministry_func
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#ministry-function-description').trumbowyg("html", data.content.MINISTRY_FUNCTION_DESCRIPTION)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Ministry Function Description Updated')
            openNotification()
            location.reload();
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error Occured. Please Refresh the Page ')
            openNotification()
        }
    })
})



$('.edit_solar_current').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#solarCurrentStatus').trumbowyg("html", data.content.SOLAR.CURRENT_STATUS)
            $('#solarCurrent').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Banner Image Upload Error Code: 500')
            openNotification()
        }
    })
})

$('.saveSolarCurrentStatus').click(function () {
    var current_status = $('#solarCurrentStatus').trumbowyg("html")
    axios.post('/admin/solar/current-status', {
        current_status: current_status
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#solarCurrentStatus').trumbowyg('html', "")
            $('#solarCurrent').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Solar Current Status Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})



var section_two_image = ''

const solarSectionTwoInputElement = document.querySelector('#solarSectionTwoImageFileElement')
const sectionTwoImagePond = FilePond.create(solarSectionTwoInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})


sectionTwoImagePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        section_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_solar_section2').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#sectionTwoSavedImage').attr('src', data.content.SOLAR.SECTION_TWO.IMAGE.LOCATION)
            sectionTwoImagePond.addFile(data.content.SOLAR.SECTION_TWO.IMAGE.LOCATION)
            $('#solarSectionTwoTitle').val(data.content.SOLAR.SECTION_TWO.TITLE)
            $('#solarSectionTwoDescription').trumbowyg("html", data.content.SOLAR.SECTION_TWO.SUMMARY)
            $('#solarSectionTwoButtonLink').val(data.content.SOLAR.SECTION_TWO.LINK)
            $('#solarSection2').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Banner Image Upload Error Code: 500')
            openNotification()
        }
    })
})

$('.saveSolarSectionTwo').click(function () {
    var image = section_two_image.file
    var title = $('#solarSectionTwoTitle').val()
    var summary = $('#solarSectionTwoDescription').trumbowyg("html")
    var link = $('#solarSectionTwoButtonLink').val()

    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)

    axios.post('/admin/solar/section-two', fd, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {

            sectionTwoImagePond.removeFile()
            $('#solarSectionTwoTitle').val('')
            $('#solarSectionTwoButtonLink').val('')
            $('#solarSectionTwoDescription').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Solar Section Image Added')
            openNotification()
            $('#solarSection2').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Section Image Upload Error, Please Try Again')
            openNotification()
        }
    })
})



const solarPanelOneFileInputElement = document.querySelector('#solarPaneOneImageFileElement')
const solarPanelOnePond = FilePond.create(solarPanelOneFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var solar_panel_one_image = ''

solarPanelOnePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Solar Panel One Update Error Code: 500')
        openNotification()
    } else {
        solar_panel_one_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})


$('.edit_solar_panel_one').click(function () {
    // $('#solarPanelOne').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#solarPanelOneSavedImage').attr('src', data.content.SOLAR.PANE_ONE.IMAGE.LOCATION)
            solarPanelOnePond.addFile(data.content.SOLAR.PANE_ONE.IMAGE.LOCATION)
            $('#solarPaneOneTitle').val(data.content.SOLAR.PANE_ONE.TITLE)
            $('#solarPaneOneSummary').trumbowyg("html", data.content.SOLAR.PANE_ONE.SUMMARY)
            $('#solarPaneOneButtonLink').val(data.content.SOLAR.PANE_ONE.LINK)
            $('#solarPanelOne').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Panel One Update Error Code: 500')
            openNotification()
        }
    })
})

$('.solarPanelOneSubmit').click(function () {
    var image = solar_panel_one_image.file
    var title = $('#solarPaneOneTitle').val()
    var summary = $('#solarPaneOneSummary').trumbowyg("html")
    var link = $('#solarPaneOneButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/solar/panel/one', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            solarPanelOnePond.removeFile()
            $('#solarPaneOneTitle').val('')
            $('#solarPaneOneButtonLink').val('')
            $('#solarPaneOneSummary').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Solar Panel One Updated')
            openNotification()
            $('#solarPanelOne').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Panel One Update Error, Please Try Again')
            openNotification()
        }
    })
})


const solarPanelTwoFileInputElement = document.querySelector('#solarPaneTwoImageFileElement')
const solarPanelTwoPond = FilePond.create(solarPanelTwoFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var solar_panel_two_image = ''

solarPanelTwoPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Solar Panel Two Update Error Code: 500')
        openNotification()
    } else {
        solar_panel_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})


$('.edit_solar_panel_two').click(function () {
    // $('#solarPanelTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#solarPanelTwoSavedImage').attr('src', data.content.SOLAR.PANE_TWO.IMAGE.LOCATION)
            solarPanelTwoPond.addFile(data.content.SOLAR.PANE_TWO.IMAGE.LOCATION)
            $('#solarPaneTwoTitle').val(data.content.SOLAR.PANE_TWO.TITLE)
            $('#solarPaneTwoSummary').trumbowyg("html", data.content.SOLAR.PANE_TWO.SUMMARY)
            $('#solarPaneTwoButtonLink').val(data.content.SOLAR.PANE_TWO.LINK)
            $('#solarPanelTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.solarPanelTwoSubmit').click(function () {
    var image = solar_panel_two_image.file
    var title = $('#solarPaneTwoTitle').val()
    var summary = $('#solarPaneTwoSummary').trumbowyg("html")
    var link = $('#solarPaneTwoButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/solar/panel/two', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            solarPanelTwoPond.removeFile()
            $('#solarPaneTwoTitle').val('')
            $('#solarPaneTwoButtonLink').val('')
            $('#solarPaneTwoSummary').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Solar Panel Two Updated')
            openNotification()
            $('#solarPanelTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Panel Two Update Error, Please Try Again')
            openNotification()
        }
    })
})


const solarPanelThreeFileInputElement = document.querySelector('#solarPaneThreeImageFileElement')
const solarPanelThreePond = FilePond.create(solarPanelThreeFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var solar_panel_three_image = ''

solarPanelThreePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Solar Panel Three Update Error Code: 500')
        openNotification()
    } else {
        solar_panel_three_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_solar_panel_three').click(function () {
    // $('#solarPanelThree').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#solarPanelThreeSavedImage').attr('src', data.content.SOLAR.PANE_THREE.IMAGE.LOCATION)
            solarPanelThreePond.addFile(data.content.SOLAR.PANE_THREE.IMAGE.LOCATION)
            $('#solarPaneThreeTitle').val(data.content.SOLAR.PANE_THREE.TITLE)
            $('#solarPaneThreeSummary').trumbowyg("html", data.content.SOLAR.PANE_THREE.SUMMARY)
            $('#solarPaneThreeButtonLink').val(data.content.SOLAR.PANE_THREE.LINK)
            $('#solarPanelThree').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Panel Three Update Error Code: 500')
            openNotification()
        }
    })
})
$('.solarPanelThreeSubmit').click(function () {
    var image = solar_panel_three_image.file
    var title = $('#solarPaneThreeTitle').val()
    var summary = $('#solarPaneThreeSummary').trumbowyg("html")
    var link = $('#solarPaneThreeButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/solar/panel/three', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            solarPanelThreePond.removeFile()
            $('#solarPaneThreeTitle').val('')
            $('#solarPaneThreeButtonLink').val('')
            $('#solarPaneThreeSummary').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Solar Panel Three Updated')
            openNotification()
            $('#solarPanelThree').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Panel Three Update Error, Please Try Again')
            openNotification()
        }
    })
})

$('.edit_wind_current').click(function () {

    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#windCurrentStatus').trumbowyg("html", data.content.WIND.CURRENT_STATUS)
            $('#windCurrent').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Current Status Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveWindCurrentStatus').click(function () {
    var current_status = $('#windCurrentStatus').trumbowyg("html")
    axios.post('/admin/wind/current-status', {
        current_status: current_status
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#windCurrentStatus').trumbowyg('html', "")
            $('#windCurrent').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Wind Current Status Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})




var wind_section_two_image = ''

const windSectionTwoInputElement = document.querySelector('#windSectionTwoImageFileElement')
const windSectionTwoImagePond = FilePond.create(windSectionTwoInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})


windSectionTwoImagePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Section Two Update Error Code: 500')
        openNotification()
    } else {
        wind_section_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_wind_section2').click(function () {
    //$('#windSectionTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#windSectionTwoSavedImage').attr('src', data.content.WIND.SECTION_TWO.IMAGE.LOCATION)
            windSectionTwoImagePond.addFile(data.content.WIND.SECTION_TWO.IMAGE.LOCATION)
            $('#windSectionTwoTitle').val(data.content.WIND.SECTION_TWO.TITLE)
            $('#windSectionTwoDescription').trumbowyg("html", data.content.WIND.SECTION_TWO.SUMMARY)
            $('#windSectionTwoButtonLink').val(data.content.WIND.SECTION_TWO.LINK)
            $('#windSectionTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Section Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveWindSectionTwo').click(function () {
    var image = wind_section_two_image.file
    var title = $('#windSectionTwoTitle').val()
    var summary = $('#windSectionTwoDescription').trumbowyg("html")
    var link = $('#windSectionTwoButtonLink').val()

    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)

    axios.post('/admin/wind/section-two', fd, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {

            windSectionTwoImagePond.removeFile()
            $('#windSectionTwoTitle').val('')
            $('#windSectionTwoButtonLink').val('')
            $('#windSectionTwoDescription').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Wind Section Image Added')
            openNotification()
            $('#windSectionTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Section Image Upload Error, Please Try Again')
            openNotification()
        }
    })
})



const windPanelOneFileInputElement = document.querySelector('#windPaneOneImageFileElement')
const windPanelOnePond = FilePond.create(windPanelOneFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var wind_panel_one_image = ''

windPanelOnePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Wind Panel One Update Error Code: 500')
        openNotification()
    } else {
        wind_panel_one_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_wind_panel_one').click(function () {
    //$('#windPanelOne').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#windPanelOneSavedImage').attr('src', data.content.WIND.PANE_ONE.IMAGE.LOCATION)
            windPanelOnePond.addFile(data.content.WIND.PANE_ONE.IMAGE.LOCATION)
            $('#windPaneOneTitle').val(data.content.WIND.PANE_ONE.TITLE)
            $('#windPaneOneSummary').trumbowyg("html", data.content.WIND.PANE_ONE.SUMMARY)
            $('#windPaneOneButtonLink').val(data.content.WIND.PANE_ONE.LINK)
            $('#windPanelOne').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Panel One Update Error Code: 500')
            openNotification()
        }
    })
})

$('.windPanelOneSubmit').click(function () {
    var image = wind_panel_one_image.file
    var title = $('#windPaneOneTitle').val()
    var summary = $('#windPaneOneSummary').trumbowyg("html")
    var link = $('#windPaneOneButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/wind/panel/one', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            windPanelOnePond.removeFile()
            $('#windPaneOneTitle').val('')
            $('#windPaneOneButtonLink').val('')
            $('#windPaneOneSummary').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Wind Panel One Updated')
            openNotification()
            $('#windPanelOne').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Panel One Update Error, Please Try Again')
            openNotification()
        }
    })
})


const windPanelTwoFileInputElement = document.querySelector('#windPaneTwoImageFileElement')
const windPanelTwoPond = FilePond.create(windPanelTwoFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var wind_panel_two_image = ''

windPanelTwoPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Wind Panel Two Update Error Code: 500')
        openNotification()
    } else {
        wind_panel_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_wind_panel_two').click(function () {
    // $('#windPanelTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#windPanelTwoSavedImage').attr('src', data.content.WIND.PANE_TWO.IMAGE.LOCATION)
            windPanelTwoPond.addFile(data.content.WIND.PANE_TWO.IMAGE.LOCATION)
            $('#windPaneTwoTitle').val(data.content.WIND.PANE_TWO.TITLE)
            $('#windPaneTwoSummary').trumbowyg("html", data.content.WIND.PANE_TWO.SUMMARY)
            $('#windPaneTwoButtonLink').val(data.content.WIND.PANE_TWO.LINK)
            $('#windPanelTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.windPanelTwoSubmit').click(function () {
    var image = wind_panel_two_image.file
    var title = $('#windPaneTwoTitle').val()
    var summary = $('#windPaneTwoSummary').trumbowyg("html")
    var link = $('#windPaneTwoButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/wind/panel/two', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            windPanelTwoPond.removeFile()
            $('#windPaneTwoTitle').val('')
            $('#windPaneTwoButtonLink').val('')
            $('#windPaneTwoSummary').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Wind Panel Two Updated')
            openNotification()
            $('#windPanelTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Panel Two Update Error, Please Try Again')
            openNotification()
        }
    })
})


const windPanelThreeFileInputElement = document.querySelector('#windPaneThreeImageFileElement')
const windPanelThreePond = FilePond.create(windPanelThreeFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var wind_panel_three_image = ''

windPanelThreePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Wind Panel Three Update Error Code: 500')
        openNotification()
    } else {
        wind_panel_three_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_wind_panel_three').click(function () {
    //  $('#windPanelThree').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#windPanelThreeSavedImage').attr('src', data.content.WIND.PANE_THREE.IMAGE.LOCATION)
            windPanelThreePond.addFile(data.content.WIND.PANE_THREE.IMAGE.LOCATION)
            $('#windPaneThreeTitle').val(data.content.WIND.PANE_THREE.TITLE)
            $('#windPaneThreeSummary').trumbowyg("html", data.content.WIND.PANE_THREE.SUMMARY)
            $('#windPaneThreeButtonLink').val(data.content.WIND.PANE_THREE.LINK)
            $('#windPanelThree').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Solar Panel Three Update Error Code: 500')
            openNotification()
        }
    })
})

$('.windPanelThreeSubmit').click(function () {
    var image = wind_panel_three_image.file
    var title = $('#windPaneThreeTitle').val()
    var summary = $('#windPaneThreeSummary').trumbowyg("html")
    var link = $('#windPaneThreeButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/wind/panel/three', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            windPanelThreePond.removeFile()
            $('#windPaneThreeTitle').val('')
            $('#windPaneThreeButtonLink').val('')
            $('#windPaneThreeSummary').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Wind Panel Three Updated')
            openNotification()
            $('#windPanelThree').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Wind Panel Three Update Error, Please Try Again')
            openNotification()
        }
    })
})

$('.edit_small_hydro_current').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#smallHydroCurrentStatus').trumbowyg("html", data.content.SMALL_HYDRO.CURRENT_STATUS)
            $('#smallHydroCurrent').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Current Status Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveSmallHydroCurrentStatus').click(function () {
    var current_status = $('#smallHydroCurrentStatus').trumbowyg("html")
    axios.post('/admin/small-hydro/current-status', {
        current_status: current_status
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#smallHydroCurrentStatus').trumbowyg('html', '')
            $('#smallHydroCurrent').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Small Hydro Current Status Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})




var small_hydro_section_two_image = ''

const smallHydroSectionTwoInputElement = document.querySelector('#smallHydroSectionTwoImageFileElement')
const smallHydroSectionTwoImagePond = FilePond.create(smallHydroSectionTwoInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})


smallHydroSectionTwoImagePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Section Two Update Error Code: 500')
        openNotification()
    } else {
        small_hydro_section_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_small_hydro_section2').click(function () {
    //  $('#smallHydroSectionTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#smallHydroSectionTwoSavedImage').attr('src', data.content.SMALL_HYDRO.SECTION_TWO.IMAGE.LOCATION)
            smallHydroSectionTwoImagePond.addFile(data.content.SMALL_HYDRO.SECTION_TWO.IMAGE.LOCATION)
            $('#smallHydroSectionTwoTitle').val(data.content.SMALL_HYDRO.SECTION_TWO.TITLE)
            $('#smallHydroSectionTwoDescription').trumbowyg("html", data.content.SMALL_HYDRO.SECTION_TWO.SUMMARY)
            $('#smallHydroSectionTwoButtonLink').val(data.content.SMALL_HYDRO.SECTION_TWO.LINK)
            $('#smallHydroSectionTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Section Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveSmallHydroSectionTwo').click(function () {
    var image = small_hydro_section_two_image.file
    var title = $('#smallHydroSectionTwoTitle').val()
    var summary = $('#smallHydroSectionTwoDescription').trumbowyg("html")
    var link = $('#smallHydroSectionTwoButtonLink').val()

    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)

    axios.post('/admin/small-hydro/section-two', fd, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            smallHydroSectionTwoImagePond.removeFile()
            $('#smallHydroSectionTwoTitle').val('')
            $('#smallHydroSectionTwoButtonLink').val('')
            $('#smallHydroSectionTwoDescription').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Small Hydro Section Image Added')
            openNotification()
            $('#smallHydroSectionTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Section Image Upload Error, Please Try Again')
            openNotification()
        }
    })
})



const smallHydroPanelOneFileInputElement = document.querySelector('#smallHydroPaneOneImageFileElement')
const smallHydroPanelOnePond = FilePond.create(smallHydroPanelOneFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var small_hydro_panel_one_image = ''

smallHydroPanelOnePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Small Hydro Panel One Update Error Code: 500')
        openNotification()
    } else {
        small_hydro_panel_one_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_small_hydro_panel_one').click(function () {
    // $('#smallHydroPanelOne').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#smallHydroPanelOneSavedImage').attr('src', data.content.SMALL_HYDRO.PANE_ONE.IMAGE.LOCATION)
            smallHydroPanelOnePond.addFile(data.content.SMALL_HYDRO.PANE_ONE.IMAGE.LOCATION)
            $('#smallHydroPaneOneTitle').val(data.content.SMALL_HYDRO.PANE_ONE.TITLE)
            $('#smallHydroPaneOneSummary').trumbowyg("html", data.content.SMALL_HYDRO.PANE_ONE.SUMMARY)
            $('#smallHydroPaneOneButtonLink').val(data.content.SMALL_HYDRO.PANE_ONE.LINK)
            $('#smallHydroPanelOne').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Panel One Update Error Code: 500')
            openNotification()
        }
    })
})

$('.smallHydroPanelOneSubmit').click(function () {
    var image = small_hydro_panel_one_image.file
    var title = $('#smallHydroPaneOneTitle').val()
    var summary = $('#smallHydroPaneOneSummary').trumbowyg("html")
    var link = $('#smallHydroPaneOneButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/small-hydro/panel/one', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            smallHydroPanelOnePond.removeFile()
            $('#smallHydroPaneOneTitle').val('')
            $('#smallHydroPaneOneButtonLink').val('')
            $('#smallHydroPaneOneSummary').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Small Hydro Panel One Updated')
            openNotification()
            $('#smallHydroPanelOne').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Panel One Update Error, Please Try Again')
            openNotification()
        }
    })
})


const smallHydroPanelTwoFileInputElement = document.querySelector('#smallHydroPaneTwoImageFileElement')
const smallHydroPanelTwoPond = FilePond.create(smallHydroPanelTwoFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var small_hydro_panel_two_image = ''

smallHydroPanelTwoPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Small Hydro Panel Two Update Error Code: 500')
        openNotification()
    } else {
        small_hydro_panel_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_small_hydro_panel_two').click(function () {
    // $('#smallHydroPanelTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#smallHydroPanelTwoSavedImage').attr('src', data.content.SMALL_HYDRO.PANE_TWO.IMAGE.LOCATION)
            smallHydroPanelTwoPond.addFile(data.content.SMALL_HYDRO.PANE_TWO.IMAGE.LOCATION)
            $('#smallHydroPaneTwoTitle').val(data.content.SMALL_HYDRO.PANE_TWO.TITLE)
            $('#smallHydroPaneTwoSummary').trumbowyg("html", data.content.SMALL_HYDRO.PANE_TWO.SUMMARY)
            $('#smallHydroPaneTwoButtonLink').val(data.content.SMALL_HYDRO.PANE_TWO.LINK)
            $('#smallHydroPanelTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.smallHydroPanelTwoSubmit').click(function () {
    var image = small_hydro_panel_two_image.file
    var title = $('#smallHydroPaneTwoTitle').val()
    var summary = $('#smallHydroPaneTwoSummary').trumbowyg("html")
    var link = $('#smallHydroPaneTwoButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/small-hydro/panel/two', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            smallHydroPanelTwoPond.removeFile()
            $('#smallHydroPaneTwoTitle').val('')
            $('#smallHydroPaneTwoButtonLink').val('')
            $('#smallHydroPaneTwoSummary').trumbowyg("html", '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Small Hydro Panel Two Updated')
            openNotification()
            $('#smallHydroPanelTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Panel Two Update Error, Please Try Again')
            openNotification()
        }
    })
})


const smallHydroPanelThreeFileInputElement = document.querySelector('#smallHydroPaneThreeImageFileElement')
const smallHydroPanelThreePond = FilePond.create(smallHydroPanelThreeFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var small_hydro_panel_three_image = ''

smallHydroPanelThreePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Small Hydro Panel Three Update Error Code: 500')
        openNotification()
    } else {
        small_hydro_panel_three_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_small_hydro_panel_three').click(function () {
    //  $('#smallHydroPanelThree').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#smallHydroPanelThreeSavedImage').attr('src', data.content.SMALL_HYDRO.PANE_THREE.IMAGE.LOCATION)
            smallHydroPanelThreePond.addFile(data.content.SMALL_HYDRO.PANE_THREE.IMAGE.LOCATION)
            $('#smallHydroPaneThreeTitle').val(data.content.SMALL_HYDRO.PANE_THREE.TITLE)
            $('#smallHydroPaneThreeSummary').trumbowyg("html", data.content.SMALL_HYDRO.PANE_THREE.SUMMARY)
            $('#smallHydroPaneThreeButtonLink').val(data.content.SMALL_HYDRO.PANE_THREE.LINK)
            $('#smallHydroPanelThree').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Panel Three Update Error Code: 500')
            openNotification()
        }
    })
})

$('.smallHydroPanelThreeSubmit').click(function () {
    var image = small_hydro_panel_three_image.file
    var title = $('#smallHydroPaneThreeTitle').val()
    var summary = $('#smallHydroPaneThreeSummary').trumbowyg("html")
    var link = $('#smallHydroPaneThreeButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/small-hydro/panel/three', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            smallHydroPanelThreePond.removeFile()
            $('#smallHydroPaneThreeTitle').val('')
            $('#smallHydroPaneThreeButtonLink').val('')
            $('#smallHydroPaneThreeSummary').trumbowyg('html', "")
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Small Hydro Panel Three Updated')
            openNotification()
            $('#smallHydroPanelThree').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Small Hydro Panel Three Update Error, Please Try Again')
            openNotification()
        }
    })
})


$('.edit_waste_current').click(function () {
    //$('#wasteCurrent').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#wasteCurrentStatus').trumbowyg("html", data.content.WASTE.CURRENT_STATUS)
            $('#wasteCurrent').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Current Status Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveWasteCurrentStatus').click(function () {
    var current_status = $('#wasteCurrentStatus').val()
    axios.post('/admin/waste/current-status', {
        current_status: current_status
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#wasteCurrentStatus').trumbowyg('html', '')
            $('#wasteCurrent').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Waste To Energy Current Status Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})


$('.edit_waste_section2').click(function () {
    // $('#wasteSectionTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#wasteSectionTwoSavedImage').attr('src', data.content.WASTE.SECTION_TWO.IMAGE.LOCATION)
            $('#wasteSectionTwoTitle').val(data.content.WASTE.SECTION_TWO.TITLE)
            $('#wasteSectionTwoDescription').trumbowyg("html", data.content.WASTE.SECTION_TWO.SUMMARY)
            $('#wasteSectionTwoButtonLink').val(data.content.WASTE.SECTION_TWO.LINK)
            $('#wasteSectionTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Section Two Update Error Code: 500')
            openNotification()
        }
    })
})

var waste_section_two_image = ''

const wasteSectionTwoInputElement = document.querySelector('#wasteSectionTwoImageFileElement')
const wasteSectionTwoImagePond = FilePond.create(wasteSectionTwoInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})


wasteSectionTwoImagePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Section Two Update Error Code: 500')
        openNotification()
    } else {
        waste_section_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_waste_section2').click(function () {
    // $('#wasteSectionTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#wasteSectionTwoSavedImage').attr('src', data.content.WASTE.SECTION_TWO.IMAGE.LOCATION)
            wasteSectionTwoImagePond.addFile(data.content.WASTE.SECTION_TWO.IMAGE.LOCATION)
            $('#wasteSectionTwoTitle').val(data.content.WASTE.SECTION_TWO.TITLE)
            $('#wasteSectionTwoDescription').trumbowyg("html", data.content.WASTE.SECTION_TWO.SUMMARY)
            $('#wasteSectionTwoButtonLink').val(data.content.WASTE.SECTION_TWO.LINK)
            $('#wasteSectionTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Section Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveWasteSectionTwo').click(function () {
    var image = waste_section_two_image.file
    var title = $('#wasteSectionTwoTitle').val()
    var summary = $('#wasteSectionTwoDescription').trumbowyg("html")
    var link = $('#wasteSectionTwoButtonLink').val()

    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)

    axios.post('/admin/waste/section-two', fd, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            wasteSectionTwoImagePond.removeFile()
            $('#wasteSectionTwoTitle').val('')
            $('#wasteSectionTwoButtonLink').val('')
            $('#wasteSectionTwoDescription').trumbowyg("html", '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Waste To Energy Section Image Added')
            openNotification()
            $('#wasteSectionTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Section Image Upload Error, Please Try Again')
            openNotification()
        }
    })
})



const wastePanelOneFileInputElement = document.querySelector('#wastePaneOneImageFileElement')
const wastePanelOnePond = FilePond.create(wastePanelOneFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var waste_panel_one_image = ''

wastePanelOnePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Waste To Energy Panel One Update Error Code: 500')
        openNotification()
    } else {
        waste_panel_one_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_waste_panel_one').click(function () {
    // $('#wastePanelOne').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#wastePanelOneSavedImage').attr('src', data.content.WASTE.PANE_ONE.IMAGE.LOCATION)
            wastePanelOnePond.addFile(data.content.WASTE.PANE_ONE.IMAGE.LOCATION)
            $('#wastePaneOneTitle').val(data.content.WASTE.PANE_ONE.TITLE)
            $('#wastePaneOneSummary').trumbowyg("html", data.content.WASTE.PANE_ONE.SUMMARY)
            $('#wastePaneOneButtonLink').val(data.content.WASTE.PANE_ONE.LINK)
            $('#wastePanelOne').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Panel One Update Error Code: 500')
            openNotification()
        }
    })
})

$('.wastePanelOneSubmit').click(function () {
    var image = waste_panel_one_image.file
    var title = $('#wastePaneOneTitle').val()
    var summary = $('#wastePaneOneSummary').trumbowyg("html")
    var link = $('#wastePaneOneButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/waste/panel/one', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            wastePanelOnePond.removeFile()
            $('#wastePaneOneTitle').val('')
            $('#wastePaneOneButtonLink').val('')
            $('#wastePaneOneSummary').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Waste To Energy Panel One Updated')
            openNotification()
            $('#wastePanelOne').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Panel One Update Error, Please Try Again')
            openNotification()
        }
    })
})


const wastePanelTwoFileInputElement = document.querySelector('#wastePaneTwoImageFileElement')
const wastePanelTwoPond = FilePond.create(wastePanelTwoFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var waste_panel_two_image = ''

wastePanelTwoPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Waste To Energy Panel Two Update Error Code: 500')
        openNotification()
    } else {
        waste_panel_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_waste_panel_two').click(function () {
    // $('#wastePanelTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#wastePanelTwoSavedImage').attr('src', data.content.WASTE.PANE_TWO.IMAGE.LOCATION)
            wastePanelTwoPond.addFile(data.content.WASTE.PANE_TWO.IMAGE.LOCATION)
            $('#wastePaneTwoTitle').val(data.content.WASTE.PANE_TWO.TITLE)
            $('#wastePaneTwoSummary').trumbowyg("html", data.content.WASTE.PANE_TWO.SUMMARY)
            $('#wastePaneTwoButtonLink').val(data.content.WASTE.PANE_TWO.LINK)
            $('#wastePanelTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.wastePanelTwoSubmit').click(function () {
    var image = waste_panel_two_image.file
    var title = $('#wastePaneTwoTitle').val()
    var summary = $('#wastePaneTwoSummary').trumbowyg("html")
    var link = $('#wastePaneTwoButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/waste/panel/two', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            wastePanelTwoPond.removeFile()
            $('#wastePaneTwoTitle').val('')
            $('#wastePaneTwoButtonLink').val('')
            $('#wastePaneTwoSummary').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Waste To Energy Panel Two Updated')
            openNotification()
            $('#wastePanelTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Panel Two Update Error, Please Try Again')
            openNotification()
        }
    })
})


const wastePanelThreeFileInputElement = document.querySelector('#wastePaneThreeImageFileElement')
const wastePanelThreePond = FilePond.create(wastePanelThreeFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var waste_panel_three_image = ''

wastePanelThreePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Waste To Energy Panel Three Update Error Code: 500')
        openNotification()
    } else {
        waste_panel_three_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_waste_panel_three').click(function () {
    // $('#wastePanelThree').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#wastePanelThreeSavedImage').attr('src', data.content.WASTE.PANE_THREE.IMAGE.LOCATION)
            wastePanelThreePond.addFile(data.content.WASTE.PANE_THREE.IMAGE.LOCATION)
            $('#wastePaneThreeTitle').val(data.content.WASTE.PANE_THREE.TITLE)
            $('#wastePaneThreeSummary').trumbowyg("html", data.content.WASTE.PANE_THREE.SUMMARY)
            $('#wastePaneThreeButtonLink').val(data.content.WASTE.PANE_THREE.LINK)
            $('#wastePanelThree').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Panel Three Update Error Code: 500')
            openNotification()
        }
    })
})

$('.wastePanelThreeSubmit').click(function () {
    var image = waste_panel_three_image.file
    var title = $('#wastePaneThreeTitle').val()
    var summary = $('#wastePaneThreeSummary').trumbowyg("html")
    var link = $('#wastePaneThreeButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/waste/panel/three', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            wastePanelThreePond.removeFile()
            $('#wastePaneThreeTitle').val('')
            $('#wastePaneThreeButtonLink').val('')
            $('#wastePaneThreeSummary').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Waste To Energy Panel Three Updated')
            openNotification()
            $('#wastePanelThree').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Waste To Energy Panel Three Update Error, Please Try Again')
            openNotification()
        }
    })
})

$('.edit_bio_current').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#bioCurrentStatus').trumbowyg("html", data.content.BIO.CURRENT_STATUS)
            $('#bioCurrent').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Current Status Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveBioCurrentStatus').click(function () {
    var current_status = $('#bioCurrentStatus').trumbowyg('html')
    axios.post('/admin/bio/current-status', {
        current_status: current_status
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#bioCurrentStatus').trumbowyg('html', '')
            $('#bioCurrent').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Bio Energy Current Status Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})


$('.edit_bio_section2').click(function () {
    //  $('#bioSectionTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#bioSectionTwoSavedImage').attr('src', data.content.BIO.SECTION_TWO.IMAGE.LOCATION)
            $('#bioSectionTwoTitle').val(data.content.BIO.SECTION_TWO.TITLE)
            $('#bioSectionTwoDescription').val(data.content.BIO.SECTION_TWO.SUMMARY)
            $('#bioSectionTwoButtonLink').val(data.content.BIO.SECTION_TWO.LINK)
            $('#bioSectionTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Section Two Update Error Code: 500')
            openNotification()
        }
    })
})

var bio_section_two_image = ''

const bioSectionTwoInputElement = document.querySelector('#bioSectionTwoImageFileElement')
const bioSectionTwoImagePond = FilePond.create(bioSectionTwoInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})


bioSectionTwoImagePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Section Two Update Error Code: 500')
        openNotification()
    } else {
        bio_section_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.saveBioSectionTwo').click(function () {
    var image = bio_section_two_image.file
    var title = $('#bioSectionTwoTitle').val()
    var summary = $('#bioSectionTwoDescription').val()
    var link = $('#bioSectionTwoButtonLink').val()

    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)

    axios.post('/admin/bio/section-two', fd, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            bioSectionTwoImagePond.removeFile()
            $('#bioSectionTwoTitle').val('')
            $('#bioSectionTwoButtonLink').val('')
            $('#bioSectionTwoDescription').val('')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Bio Energy Section Image Added')
            openNotification()
            $('#bioSectionTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Section Image Upload Error, Please Try Again')
            openNotification()
        }
    })
})



const bioPanelOneFileInputElement = document.querySelector('#bioPaneOneImageFileElement')
const bioPanelOnePond = FilePond.create(bioPanelOneFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var bio_panel_one_image = ''

bioPanelOnePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Bio Energy Panel One Update Error Code: 500')
        openNotification()
    } else {
        bio_panel_one_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_bio_panel_one').click(function () {
    // $('#smallHydroPanelOne').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#bioPanelOneSavedImage').attr('src', data.content.BIO.PANE_ONE.IMAGE.LOCATION)
            bioPanelOnePond.addFile(data.content.BIO.PANE_ONE.IMAGE.LOCATION)
            $('#bioPaneOneTitle').val(data.content.BIO.PANE_ONE.TITLE)
            $('#bioPaneOneSummary').trumbowyg("html", data.content.BIO.PANE_ONE.SUMMARY)
            $('#bioPaneOneButtonLink').val(data.content.BIO.PANE_ONE.LINK)
            $('#bioPanelOne').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Panel One Update Error Code: 500')
            openNotification()
        }
    })
})

$('.bioPanelOneSubmit').click(function () {
    var image = bio_panel_one_image.file
    var title = $('#bioPaneOneTitle').val()
    var summary = $('#bioPaneOneSummary').trumbowyg("html")
    var link = $('#bioPaneOneButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/bio/panel/one', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            bioPanelOnePond.removeFile()
            $('#bioPaneOneTitle').val('')
            $('#bioPaneOneButtonLink').val('')
            $('#bioPaneOneSummary').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Bio Energy Panel One Updated')
            openNotification()
            $('#bioPanelOne').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Panel One Update Error, Please Try Again')
            openNotification()
        }
    })
})


const bioPanelTwoFileInputElement = document.querySelector('#bioPaneTwoImageFileElement')
const bioPanelTwoPond = FilePond.create(bioPanelTwoFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var bio_panel_two_image = ''

bioPanelTwoPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Bio Panel Two Update Error Code: 500')
        openNotification()
    } else {
        bio_panel_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_bio_panel_two').click(function () {
    // $('#smallHydroPanelTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#bioPanelTwoSavedImage').attr('src', data.content.BIO.PANE_TWO.IMAGE.LOCATION)
            bioPanelTwoPond.addFile(data.content.BIO.PANE_TWO.IMAGE.LOCATION)
            $('#bioPaneTwoTitle').val(data.content.BIO.PANE_TWO.TITLE)
            $('#bioPaneTwoSummary').trumbowyg("html", data.content.BIO.PANE_TWO.SUMMARY)
            $('#bioPaneTwoButtonLink').val(data.content.BIO.PANE_TWO.LINK)
            $('#bioPanelTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.bioPanelTwoSubmit').click(function () {
    var image = bio_panel_two_image.file
    var title = $('#bioPaneTwoTitle').val()
    var summary = $('#bioPaneTwoSummary').trumbowyg("html")
    var link = $('#bioPaneTwoButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/bio/panel/two', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            bioPanelTwoPond.removeFile()
            $('#bioPaneTwoTitle').val('')
            $('#bioPaneTwoButtonLink').val('')
            $('#bioPaneTwoSummary').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Bio Energy Panel Two Updated')
            openNotification()
            $('#bioPanelTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Panel Two Update Error, Please Try Again')
            openNotification()
        }
    })
})


const bioPanelThreeFileInputElement = document.querySelector('#bioPaneThreeImageFileElement')
const bioPanelThreePond = FilePond.create(bioPanelThreeFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var bio_panel_three_image = ''

bioPanelThreePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Bio Energy Panel Three Update Error Code: 500')
        openNotification()
    } else {
        bio_panel_three_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_bio_panel_three').click(function () {
    //  $('#smallHydroPanelThree').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#bioPanelThreeSavedImage').attr('src', data.content.BIO.PANE_THREE.IMAGE.LOCATION)
            bioPanelThreePond.addFile(data.content.BIO.PANE_THREE.IMAGE.LOCATION)
            $('#bioPaneThreeTitle').val(data.content.BIO.PANE_THREE.TITLE)
            $('#bioPaneThreeSummary').trumbowyg("html", data.content.BIO.PANE_THREE.SUMMARY)
            $('#bioPaneThreeButtonLink').val(data.content.BIO.PANE_THREE.LINK)
            $('#bioPanelThree').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Panel Three Update Error Code: 500')
            openNotification()
        }
    })
})

$('.bioPanelThreeSubmit').click(function () {
    var image = bio_panel_three_image.file
    var title = $('#bioPaneThreeTitle').val()
    var summary = $('#bioPaneThreeSummary').trumbowyg("html")
    var link = $('#bioPaneThreeButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/bio/panel/three', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            bioPanelThreePond.removeFile()
            $('#bioPaneThreeTitle').val('')
            $('#bioPaneThreeButtonLink').val('')
            $('#bioPaneThreeSummary').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Bio Energy Panel Three Updated')
            openNotification()
            $('#bioPanelThree').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Panel Three Update Error, Please Try Again')
            openNotification()
        }
    })
})


$('.edit_other_current').click(function () {
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#otherCurrentStatus').val(data.content.OTHER.CURRENT_STATUS)
            $('#otherCurrent').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Other Renewables Current Status Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveOtherCurrentStatus').click(function () {
    var current_status = $('#otherCurrentStatus').val()
    axios.post('/admin/other/current-status', {
        current_status: current_status
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            $('#otherCurrentStatus').val('')
            $('#otherCurrent').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Other Renewables Current Status Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})


$('.edit_other_section2').click(function () {
    //  $('#smallHydroSectionTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#otherSectionTwoSavedImage').attr('src', data.content.OTHER.SECTION_TWO.IMAGE.LOCATION)
            $('#otherSectionTwoTitle').val(data.content.OTHER.SECTION_TWO.TITLE)
            $('#otherSectionTwoDescription').val(data.content.OTHER.SECTION_TWO.SUMMARY)
            $('#otherSectionTwoButtonLink').val(data.content.OTHER.SECTION_TWO.LINK)
            $('#otherSectionTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Other Renewables Section Two Update Error Code: 500')
            openNotification()
        }
    })
})

var other_section_two_image = ''

const otherSectionTwoInputElement = document.querySelector('#otherSectionTwoImageFileElement')
const otherSectionTwoImagePond = FilePond.create(otherSectionTwoInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})


otherSectionTwoImagePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Section Two Update Error Code: 500')
        openNotification()
    } else {
        other_section_two_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.saveOtherSectionTwo').click(function () {
    var image = other_section_two_image.file
    var title = $('#otherSectionTwoTitle').val()
    var summary = $('#otherSectionTwoDescription').val()
    var link = $('#otherSectionTwoButtonLink').val()

    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)

    axios.post('/admin/other/section-two', fd, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            otherSectionTwoImagePond.removeFile()
            $('#otherSectionTwoTitle').val('')
            $('#otherSectionTwoButtonLink').val('')
            $('#otherSectionTwoDescription').val('')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Bio Energy Section Image Added')
            openNotification()
            $('#otherSectionTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Section Image Upload Error, Please Try Again')
            openNotification()
        }
    })
})

$('.edit_other_panel_one').click(function () {
    // $('#smallHydroPanelOne').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#otherPanelOneSavedImage').attr('src', data.content.BIO.PANE_ONE.IMAGE.LOCATION)
            $('#otherPaneOneTitle').val(data.content.BIO.PANE_ONE.TITLE)
            $('#otherPaneOneSummary').val(data.content.BIO.PANE_ONE.SUMMARY)
            $('#otherPaneOneButtonLink').val(data.content.BIO.PANE_ONE.LINK)
            $('#otherPanelOne').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Panel One Update Error Code: 500')
            openNotification()
        }
    })
})

const otherPanelOneFileInputElement = document.querySelector('#otherPaneOneImageFileElement')
const otherPanelOnePond = FilePond.create(otherPanelOneFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var other_panel_one_image = ''

otherPanelOnePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Bio Energy Panel One Update Error Code: 500')
        openNotification()
    } else {
        other_panel_one_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.otherPanelOneSubmit').click(function () {
    var image = other_panel_one_image.file
    var title = $('#otherPaneOneTitle').val()
    var summary = $('#otherPaneOneSummary').val()
    var link = $('#otherPaneOneButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/other/panel/one', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            otherPanelOnePond.removeFile()
            $('#otherPaneOneTitle').val('')
            $('#otherPaneOneButtonLink').val('')
            $('#otherPaneOneSummary').val('')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Bio Energy Panel One Updated')
            openNotification()
            $('#otherPanelOne').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Energy Panel One Update Error, Please Try Again')
            openNotification()
        }
    })
})
$('.edit_other_panel_two').click(function () {
    // $('#smallHydroPanelTwo').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#otherPanelTwoSavedImage').attr('src', data.content.OTHER.PANE_TWO.IMAGE.LOCATION)
            $('#otherPaneTwoTitle').val(data.content.OTHER.PANE_TWO.TITLE)
            $('#otherPaneTwoSummary').val(data.content.OTHER.PANE_TWO.SUMMARY)
            $('#otherPaneTwoButtonLink').val(data.content.OTHER.PANE_TWO.LINK)
            $('#otherPanelTwo').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})

const otherPanelTwoFileInputElement = document.querySelector('#otherPaneTwoImageFileElement')
const otherPanelTwoPond = FilePond.create(otherPanelTwoFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var other_panel_two_image = ''

otherPanelTwoPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Bio Panel Two Update Error Code: 500')
        openNotification()
    } else {
        if (file.fileExtension == 'png' || file.fileExtension == "jpg") {
            other_panel_two_image = file
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Banner Image Added')
            openNotification()
        } else {
            otherPanelTwoPond.removeFile()
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('File Error, Please Check Format.')
            openNotification()
        }
    }
})

$('.otherPanelTwoSubmit').click(function () {
    var image = other_panel_two_image.file
    var title = $('#otherPaneTwoTitle').val()
    var summary = $('#otherPaneTwoSummary').val()
    var link = $('#otherPaneTwoButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/other/panel/two', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            otherPanelTwoPond.removeFile()
            $('#otherPaneTwoTitle').val('')
            $('#otherPaneTwoButtonLink').val('')
            $('#otherPaneTwoSummary').val('')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Other Renewables Panel Two Updated')
            openNotification()
            $('#otherPanelTwo').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Other Renewables Panel Two Update Error, Please Try Again')
            openNotification()
        }
    })
})
$('.edit_other_panel_three').click(function () {
    //  $('#smallHydroPanelThree').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('#otherPanelThreeSavedImage').attr('src', data.content.BIO.PANE_THREE.IMAGE.LOCATION)
            $('#otherPaneThreeTitle').val(data.content.BIO.PANE_THREE.TITLE)
            $('#otherPaneThreeSummary').val(data.content.BIO.PANE_THREE.SUMMARY)
            $('#otherPaneThreeButtonLink').val(data.content.BIO.PANE_THREE.LINK)
            $('#otherPanelThree').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Other Renewables Panel Three Update Error Code: 500')
            openNotification()
        }
    })
})

const otherPanelThreeFileInputElement = document.querySelector('#otherPaneThreeImageFileElement')
const otherPanelThreePond = FilePond.create(otherPanelThreeFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})

var other_panel_three_image = ''

otherPanelThreePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Bio Energy Panel Three Update Error Code: 500')
        openNotification()
    } else {
        other_panel_three_image = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.otherPanelThreeSubmit').click(function () {
    var image = other_panel_three_image.file
    var title = $('#otherPaneThreeTitle').val()
    var summary = $('#otherPaneThreeSummary').val()
    var link = $('#otherPaneThreeButtonLink').val()
    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', title)
    fd.append('summary', summary)
    fd.append('link', link)
    axios.post('/admin/other/panel/three', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {

            otherPanelThreePond.removeFile()
            $('#otherPaneThreeTitle').val('')
            $('#otherPaneThreeButtonLink').val('')
            $('#otherPaneThreeSummary').val('')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Other Renewables Panel Three Updated')
            openNotification()
            $('#otherPanelThree').removeClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Other Renewables Panel Three Update Error, Please Try Again')
            openNotification()
        }
    })
})
