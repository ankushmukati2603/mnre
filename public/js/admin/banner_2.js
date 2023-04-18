const addPageLoader = function (message) {
    $('.pageloader__message').html(message)
    $('.pageloader').addClass('is-active')
}

const removePageLoader = function () {
    $('.pageloader').removeClass('is-active')
}



$('.edit_green_intro').click(function () {
    // $("#green_current").addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {

            $('#greenIntroduction').trumbowyg("html", data.content.GEC.INTRODUCTION)
            $('#green_current').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveGreenIntroduction').click(function () {

    var green_introduction_text = $('#greenIntroduction').trumbowyg('html')
    addPageLoader("Saving Green Energy Corridor Introduction")
    axios.post('/admin/green-energy-corridor/introduction', {
        summary: green_introduction_text
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#greenIntroduction').trumbowyg('html', '')
            $('#green_current').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Green Energy Corridor Introduction Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Green Energy Corridor Introduction Update Error: Code 500')
            openNotification()
        }
    })
})


var hydrogen_section_banner = ''

const hydrogenSectionInputElement = document.querySelector('#hydrogenEnergyInputFileElement')
const hydrogenSectionPond = FilePond.create(hydrogenSectionInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
hydrogenSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        hydrogen_section_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit__hydrogen--section-one').click(function () {
    //$('#hydrogen__section--one').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydrogenPanelSavedImage').attr('src', data.content.HYDROGEN.SECTION_ONE.IMAGE.LOCATION)
            hydrogenSectionPond.addFile(data.content.HYDROGEN.SECTION_ONE.IMAGE.LOCATION)
            $('#hydrogenEnergyDescription').trumbowyg("html", data.content.HYDROGEN.SECTION_ONE.SUMMARY)
            $('#hydrogen__section--one').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Bio Panel Two Update Error Code: 500')
            openNotification()
        }
    })
})


$('.saveHydrogenSectionOne').click(function () {
    addPageLoader("Saving Hydrogen Energy Section One")
    var image = hydrogen_section_banner.file
    var summary = $('#hydrogenEnergyDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/hydrogen-energy/section-one', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydrogen__section--one').removeClass('is-active')
            hydrogenSectionPond.removeFile()
            $('#hydrogenEnergyDescription').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Hydrogen Energy Section One Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Hydrogen Energy Section One Update Error. Error Code: 500')
            openNotification()
        }
    })
})

var sindow = {}

$('.edit_home_banner').on('click', function () {

    addPageLoader("Fetching Home Banners")
    axios.get('/admin/get-content').then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeBannerElement').addClass('is-active')
            var content = data.content.HOME_PAGE_BANNER_IMAGE
            for (var i = 0; i < content.length; i++) {
                var itm = content[i]

                $('._added_banners').append(`
                    <div class="_banner_wrap">
                        <div class="_left">
                            <div class="_image">
                                <img src="${itm.BANNER_IMAGE.LOCATION}" alt="">
                            </div>
                            <div class="field">
                                <div class="control">
                                    <label for="bannerImageSavedFileInputElement-${i}" class="label">Banner Image Saved File</label>
                                    <input type="file" class="banner_file" id="bannerImageSavedFileInputElement-${i}">
                                </div>
                            </div>
                        </div>
                        <div class="_right">
                            <form id = "banner_edit_form-${i}"
                            name = "banner_edit_form-${i}" >
                            
                                <div class="_added_banner_info">
                                    <div class="_form_field">
                                            <label for="savedContentHomeTitle" class="label">Title</label>
                                            <input type = "text"
                                            id = "savedContentHomeTitle-${i}"
                                            value = '${itm.BANNER_IMAGE_TITLE}'
                                            class = "input"
                                            name = "savedContentHomeTitle-${i}" >
                                    </div>
                                    <div class="_form_field">
                                            <label for="savedContentDescription" class="label">Description</label>
                                            <input type = "text"
                                            id = "savedContentDescription-${i}"
                                            value = "${itm.BANNER_IMAGE_DESCRIPTION}"
                                            class = "input"
                                            name = "savedContentDescription-${i}" >
                                    </div>
                                    <div class="_form_field">
                                            <label for="savedContentbuttonText" class="label">Button Text</label>
                                            <input type = "text"
                                            id = "savedContentbuttonText-${i}"
                                            value = "${itm.BANNER_BUTTON_TEXT}"
                                            class = "input"
                                            name = "savedContentbuttonText-${i}" >
                                    </div>
                                    <div class="_form_field">
                                            <label for="savedContentbuttonColor" class="label">Button Color</label>
                                            <input type = "text"
                                            id = "savedContentbuttonColor-${i}"
                                            value = "${itm.BANNER_BUTTON_COLOUR}"
                                            class = "input"
                                            name = "savedContentbuttonColor-${i}" >
                                    </div>
                                    <div class="_form_field">
                                            <label for="savedContentbuttonLink" class="label">Button Link</label>
                                            <input type = "text"
                                            id = "savedContentbuttonLink-${i}"
                                            value = "${itm.BANNER_BUTTON_LINK}"
                                            class = "input"
                                            name = "savedContentbuttonLink-${i}" >
                                            <input class = "is-hidden"
                                            value = "${itm.BANNER_IMAGE.LOCATION}" >
                                    </div>
                                    <div class="_form_field">
                                            <label for="savedContentbuttonOrdering" class="label">Ordering</label>
                                            <input type = "text"
                                            id = "savedContentbuttonOrdering-${i}"
                                            value = "${itm.ORDERING}"
                                            class = "input"
                                            name = "savedContentbuttonOrdering-${i}">
                                    </div>
                                    <div class="_actions">
                                        <div class = "button is-success is-fullwidth"
                                        onclick = "saveEditedBanner('${itm._id}','${i}')"
                                        data-id = ''>
                                            Save
                                        </div>
                                        <div class = "button is-danger is-fullwidth editDeleteBanner" onclick = "deleteEditedBanner('${itm._id}')">
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                `)
                sindow["homeBannerImageFileElement" + i] = document.querySelector(`#bannerImageSavedFileInputElement-${i}`)
                sindow["homeBannerSectionPond" + i] = FilePond.create(sindow["homeBannerImageFileElement" + i], {
                    allowFileTypeValidation: true,
                    acceptedFileTypes: ['image/*'],
                    labelFileTypeNotAllowed: "Incorrect File upload Format"
                })
                sindow["homeBannerSectionPond" + i].on('addfile', (error, file) => {
                    if (error) {
                        $('#dashboardNotification').addClass('is-danger')
                        $('#notification_message').text('Banner Image Upload Error Code: 500')
                        openNotification()
                    } else {
                        sindow["banner_file_" + i] = file
                        $('#dashboardNotification').addClass('is-success')
                        $('#notification_message').text('Banner Image Added')
                        openNotification()
                    }
                })
                sindow["homeBannerSectionPond" + i].addFile(itm.BANNER_IMAGE.LOCATION)
            }

        } else {
            console.log("Failed To Fetch")
        }
    })
})


function saveEditedBanner(id, pos) {
    addPageLoader("Updating Home Banners")
    var values = document.getElementById(`banner_edit_form-${pos}`)
    var ordering = document.getElementById(`savedContentbuttonOrdering-${pos}`).value
    var image = sindow["homeBannerSectionPond" + pos].getFile().file
    image.name = "home_banner_" + pos
    var fd = new FormData()
    fd.append('image', image)
    fd.append('id', id)
    fd.append('title', values["0"]["value"])
    fd.append('description', values["1"]["value"])
    fd.append('buttonText', values["2"]["value"])
    fd.append('buttonColour', values["3"]["value"])
    fd.append('buttonLink', values["4"]["value"])
    fd.append('ordering', ordering)
    axios.post('/admin/home/banner/edit', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('.banners_multiple').html('')
            $('.modal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`Banner Image Edited`)
            openNotification()
        } else {
            alert('Error Occured')
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Banner Image Update Error')
            openNotification()
        }
    })
}

function deleteEditedBanner(id) {
    addPageLoader("Deleting Banner")
    axios.post('/admin/home/banner/delete', {
        id: id
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        if (data.status == "Success") {
            console.log(data)
            $('.modal').removeClass('is-active')
            $('.banners_multiple').html('')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`Banner Image Edited`)
            removePageLoader()
            openNotification()
        } else {
            alert('Error Occured')
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Banner Image Update Error')
            removePageLoader()
            openNotification()
        }
    })
}
var home_banner_file = ''
var homeBannerImageFileElement = document.querySelector(`#homePageBannerFileElement`)
var homeBannerFilePond = FilePond.create(homeBannerImageFileElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
homeBannerFilePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        home_banner_file = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.homePageBannerSectionSave').click(function (e) {
    e.preventDefault();
    addPageLoader("Saving Home Page Banner")
    var image = home_banner_file.file

    var fd = new FormData()
    fd.append('image', image)
    fd.append('title', $('#homePageBannerTitle').val())
    fd.append('description', $('#homePageBannerDescription').val())
    fd.append('buttonText', $('#homePageBannerButtonText').val())
    fd.append('buttonColour', $('#homePageBannerButtonColor').val())
    fd.append('buttonLink', $('#homePageBannerButtonLink').val())

    axios.post('/admin/home/banner/add', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.status == "Success") {
            $('.modal').removeClass('is-active')
            $('#homePageBannerTitle').val('')
            $('#homePageBannerDescription').val('')
            $('#homePageBannerButtonText').val('')
            $('#homePageBannerButtonColor').val('')
            $('#homePageBannerButtonLink').val('')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`Banner Image Added`)
            removePageLoader()
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Banner Image Update Error')
            removePageLoader()
            openNotification()
        }
    })
})


var block_one_file = ''

var homeBlockOneImageFileInputElement = document.querySelector('#homeBlockOneBannerFileElement')
var homeBlockOnePond = FilePond.create(homeBlockOneImageFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
homeBlockOnePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Error')
        openNotification()
    } else {
        block_one_file = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editBlockOne').click(function () {
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeBlockOneModal').addClass('is-active')
            var cnt = data.content.HOME_PAGE_BLOCK_ONE
            $('.hboi').attr('src', cnt.IMAGE.LOCATION)
            homeBlockOnePond.addFile(cnt.IMAGE.LOCATION)
            $('#homeBlockOneText').val(`${cnt.TEXT}`)
            $('#homeBlockOneMouseOverText').val(`${cnt.MOUSEOVER_TEXT}`)
            $('#homeBlockOneFacebookLink').val(`${cnt.FACEBOOK}`)
            $('#homeBlockOneTwitterLink').val(`${cnt.TWITTER}`)
            $('#homeBlockOneLinkedInLink').val(`${cnt.LINKEDIN}`)
            $('#homeBlockOneWebsiteLink').val(`${cnt.WEBSITE}`)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Success')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error')
            openNotification()
        }
    })
})

$('.homeBlockOneSave').click(function () {
    addPageLoader("Saving Home Page Block One Content")
    var fd = new FormData()
    fd.append('image', block_one_file.file)
    fd.append('text', $('#homeBlockOneText').val())
    fd.append('mouseOverText', $('#homeBlockOneMouseOverText').val())
    fd.append('facebook', $('#homeBlockOneFacebookLink').val())
    fd.append('twitter', $('#homeBlockOneTwitterLink').val())
    fd.append('linkedin', $('#homeBlockOneLinkedInLink').val())
    fd.append('website', $('#homeBlockOneWebsiteLink').val())

    axios.post('/admin/home/block-one/edit', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeBlockOneText').val('')
            $('#homeBlockOneMouseOverText').val('')
            $('#homeBlockOneFacebookLink').val('')
            $('#homeBlockOneTwitterLink').val('')
            $('#homeBlockOneLinkedInLink').val('')
            $('#homeBlockOneWebsiteLink').val('')
            $('#homeBlockOneModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`Block One Updated`)
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text(`Block One Update Error Please Try Again`)
            openNotification()
        }
    })
})



var block_two_file = ''

var homeBlockTwoImageFileInputElement = document.querySelector('#homeBlockTwoBannerFileElement')
var homeBlockTwoPond = FilePond.create(homeBlockTwoImageFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
homeBlockTwoPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Error')
        openNotification()
    } else {
        block_two_file = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editBlockTwo').click(function () {
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeBlockTwoModal').addClass('is-active')
            var cnt = data.content.HOME_PAGE_BLOCK_TWO
            homeBlockTwoPond.addFile(cnt.IMAGE.LOCATION)
            $('#homeBlockTwoText').val(`${cnt.TEXT}`)
            $('#homeBlockTwoMouseOverText').val(`${cnt.MOUSEOVER_TEXT}`)
            $('#homeBlockTwoButtonText').val(`${cnt.BUTTON.TEXT}`)
            $('#homeBlockTwoButtonLink').val(`${cnt.BUTTON.LINK}`)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Success')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error')
            openNotification()
        }
    })
})

$('.homeBlockTwoSave').click(function () {
    addPageLoader("Saving Home Page Block Two Content")
    var fd = new FormData()
    fd.append('image', block_two_file.file)
    fd.append('text', $('#homeBlockTwoText').val())
    fd.append('mouseOverText', $('#homeBlockTwoMouseOverText').val())
    fd.append('buttonText', $('#homeBlockTwoButtonText').val())
    fd.append('buttonLink', $('#homeBlockTwoButtonLink').val())
    axios.post('/admin/home/block/two/edit', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeBlockTwoText').val('')
            $('#homeBlockTwoMouseOverText').val('')
            $('#homeBlockTwoButtonText').val('')
            $('#homeBlockTwoButtonLink').val('')
            $('#homeBlockTwoModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`Block One Updated`)
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text(`Block One Update Error Please Try Again`)
            openNotification()
        }
    })
})

var block_three_file = ''

var homeBlockThreeImageFileInputElement = document.querySelector('#homeBlockThreeBannerFileElement')
var homeBlockThreePond = FilePond.create(homeBlockThreeImageFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
homeBlockThreePond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Error')
        openNotification()
    } else {
        block_three_file = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editBlockThree').click(function () {
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeBlockThreeModal').addClass('is-active')
            var cnt = data.content.HOME_PAGE_BLOCK_THREE
            homeBlockThreePond.addFile(cnt.IMAGE.LOCATION)
            $('#homeBlockThreeText').val(`${cnt.TEXT}`)
            $('#homeBlockThreeMouseOverText').val(`${cnt.MOUSEOVER_TEXT}`)
            $('#homeBlockThreeFacebookLink').val(`${cnt.FACEBOOK}`)
            $('#homeBlockThreeTwitterLink').val(`${cnt.TWITTER}`)
            $('#homeBlockThreeLinkedInLink').val(`${cnt.LINKEDIN}`)
            $('#homeBlockThreeWebsiteLink').val(`${cnt.WEBSITE}`)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Success')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error')
            openNotification()
        }
    })
})

$('.homeBlockThreeSave').click(function () {
    addPageLoader("Saving Home Page Block Three Content")
    var fd = new FormData()
    fd.append('image', block_three_file.file)
    fd.append('text', $('#homeBlockThreeText').val())
    fd.append('mouseOverText', $('#homeBlockThreeMouseOverText').val())
    fd.append('facebook', $('#homeBlockThreeFacebookLink').val())
    fd.append('twitter', $('#homeBlockThreeTwitterLink').val())
    fd.append('linkedin', $('#homeBlockThreeLinkedInLink').val())
    fd.append('website', $('#homeBlockThreeWebsiteLink').val())

    axios.post('/admin/home/block/three/edit', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeBlockThreeText').val('')
            $('#homeBlockThreeMouseOverText').val('')
            $('#homeBlockThreeFacebookLink').val('')
            $('#homeBlockThreeTwitterLink').val('')
            $('#homeBlockThreeLinkedInLink').val('')
            $('#homeBlockThreeWebsiteLink').val('')
            $('#homeBlockThreeModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`Block Three Updated`)
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text(`Block Three Update Error Please Try Again`)
            openNotification()
        }
    })
})

$('.edit_irix').click(function () {
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homePageIrix').addClass('is-active')
            var cnt = data.content
            $('#homePageIrixDescription').trumbowyg('html', cnt.IRIX.DESCRIPTION)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Success')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error')
            openNotification()
        }
    })
})

$('.saveHomePageIrix').click(function () {
    addPageLoader("Saving Home Page IRIX Section Content")
    var irix_description = $('#homePageIrixDescription').trumbowyg('html')
    axios.post('/admin/home/irix/edit', {
        summary: irix_description
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homePageIrixDescription').trumbowyg('html', '')
            $('#homePageIrix').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`IRIX Description Updated`)
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text(`IRIX Description Update Error`)
            openNotification()
        }
    })
})


var isa_file = ''

var isaSectionImageFileInputElement = document.querySelector('#homeIsaInputFileElement')
var isaSectionPond = FilePond.create(isaSectionImageFileInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
isaSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Error')
        openNotification()
    } else {
        isa_file = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edit_isa').click(function () {
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeIsaModal').addClass('is-active')
            var cnt = data.content.ISA
            $('.isai').attr('src', cnt.IMAGE.LOCATION)
            isaSectionPond.addFile(cnt.IMAGE.LOCATION)
            $('#homeIsaTitle').val(cnt.TITLE)
            $('#homeIsaButtonText').val(cnt.BUTTON.TEXT)
            $('#homeIsaButtonLink').val(cnt.BUTTON.LINK)
            $('#homeIsaDescription').trumbowyg('html', cnt.DESCRIPTION)
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Success')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error')
            openNotification()
        }
    })
})

$('.saveHomeIsa').click(function () {
    addPageLoader("Saving Home Page ISA Content")
    var image = isa_file
    var fd = new FormData()
    fd.append('image', image.file)
    fd.append('title', $('#homeIsaTitle').val())
    fd.append('summary', $('#homeIsaDescription').trumbowyg('html'))
    fd.append('buttonText', $('#homeIsaButtonText').val())
    fd.append('buttonLink', $('#homeIsaButtonLink').val())
    axios.post('/admin/home/isa/edit', fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#homeIsaTitle').val('')
            $('#homeIsaDescription').trumbowyg('html', '')
            $('#homeIsaButtonText').val('')
            $('#homeIsaButtonLink').val('')
            $('#homeIsaModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text(`Success`)
            openNotification()
        }
    })
})


$('.edit_rfd_overview').click(function () {
    // $('#rfdOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rfd_description').trumbowyg("html", data.content.RFD.OVERVIEW)
            $('#rfdOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.rfd_overview_save').click(function () {
    addPageLoader("Saving RFD Overview")
    var summary = $('#rfd_description').trumbowyg('html')
    axios.post('/admin/rfd/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rfd_overview_save').trumbowyg('html', "")
            $('#rfdOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_policies_overview').click(function () {
    //$('#policiesOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#policies_description').trumbowyg("html", data.content.POLICIES.OVERVIEW)
            $('#policiesOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.policies_overview_save').click(function () {
    addPageLoader("Saving Policies Description")
    var summary = $('#policies_description').trumbowyg('html')
    axios.post('/admin/policies/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#policies_description').trumbowyg('html', "")
            $('#policiesOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_presentation_overview').click(function () {
    // $('#presentationOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#presentation_description').trumbowyg("html", data.content.PRESENTATIONS.OVERVIEW)
            $('#presentationOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.presentation_overview_save').click(function () {
    addPageLoader("Saving Presentations")
    var summary = $('#presentation_description').trumbowyg('html')
    axios.post('/admin/presentations/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#presentation_description').trumbowyg('html', "")
            $('#presentationOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})


$('.edit_ad_overview').click(function () {
    //$('#adsOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ads_description').trumbowyg("html", data.content.ADS.OVERVIEW)
            $('#adsOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.ads_overview_save').click(function () {
    addPageLoader("Saving Ads Content")
    var summary = $('#ads_description').trumbowyg('html')
    axios.post('/admin/ads/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ads_description').trumbowyg('html', "")
            $('#adsOverviewModal').removeClass('is-active')
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
$('.edit_event_overview').click(function () {
    //$('#eventOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#event_description').trumbowyg("html", data.content.ADS.OVERVIEW)
            $('#eventOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.event_overview_save').click(function () {
    addPageLoader("Saving Event Description")
    var summary = $('#event_description').trumbowyg('html')
    axios.post('/admin/events/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#event_desription').trumbowyg('html', "")
            $('#eventOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_report_overview').click(function () {
    //$('#reportOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#report_description').trumbowyg("html", data.content.REPORTS.OVERVIEW)
            $('#reportOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.report_overview_save').click(function () {
    addPageLoader("Saving Report Overview Description")
    var summary = $('#report_description').trumbowyg('html')
    axios.post('/admin/reports/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#report_description').trumbowyg('html', "")
            $('#reportOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_circular_overview').click(function () {
    //$('#circularOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#circular_description').trumbowyg("html", data.content.CIRCULAR.OVERVIEW)
            $('#circularOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.circular_overview_save').click(function () {
    addPageLoader("Saving Circular Overview Content")
    var summary = $('#circular_description').trumbowyg('html')
    axios.post('/admin/circular/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#circular_description').trumbowyg('html', "")
            $('#circularOverviewModal').removeClass('is-active')
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
$('.edit_notification_overview').click(function () {
    //$('#notificationOverviewModal').addClass('is-active')
    addPageLoader("Saving Notification Overview")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#notification_description').trumbowyg("html", data.content.NOTIFICATION.OVERVIEW)
            $('#notificationOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.notification_overview_save').click(function () {
    addPageLoader("Saving Notifications Overview")
    var summary = $('#notification_description').trumbowyg('html')
    axios.post('/admin/notification/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#notification_description').trumbowyg('html', "")
            $('#notificationOverviewModal').removeClass('is-active')
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

$('.edit_account_overview').click(function () {
    //$('#accountOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#account_description').trumbowyg("html", data.content.ACCOUNT.OVERVIEW)
            $('#accountOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.account_overview_save').click(function () {
    addPageLoader("Saving Account Overview Content")
    var summary = $('#account_description').trumbowyg('html')
    axios.post('/admin/account/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#account_description').trumbowyg('html', "")
            $('#accountOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})

$('.edit_sup_overview').click(function () {
    //$('#supOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#sup_description').trumbowyg("html", data.content.SUPPORTING_PROGRAMMES.OVERVIEW)
            $('#supOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.sup_overview_save').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#sup_description').trumbowyg('html')
    axios.post('/admin/sup-prog/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#sup_description').trumbowyg('html', "")
            $('#supOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_pidpi_overview').click(function () {
    // $('#pidpiOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#pidpi_description').trumbowyg("html", data.content.PIDPI.OVERVIEW)
            $('#pidpiOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.pidpi_overview_save').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#pidpi_description').trumbowyg('html')
    axios.post('/admin/pidpi/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#pidpi_overview_save').trumbowyg('html', "")
            $('#pidpiOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_comp_overview').click(function () {
    //$('#compOverviewModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#comp_description').trumbowyg("html", data.content.COMPENDIUM.OVERVIEW)
            $('#compOverviewModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.comp_overview_save').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#comp_description').trumbowyg('html')
    axios.post('/admin/comp/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#comp_description').trumbowyg('html', "")
            $('#compOverviewModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})

$('.edit_training').click(function () {
    // $('#kc_training').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#training_description').trumbowyg("html", data.content.KC_TRAINING_MODULES.OVERVIEW)
            $('#kc_training').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.kctrainingsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#training_description').trumbowyg('html')
    axios.post('/admin/kc-training/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#training_description').trumbowyg('html', "")
            $('#kc_training').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_infographs').click(function () {
    // $('#kc_infograph').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#infograph_description').trumbowyg("html", data.content.KC_INFOGRAPHICS.OVERVIEW)
            $('#kc_infograph').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.kcinfographsave').click(function () {
    addPageLoader("Savig Content")
    var summary = $('#infograph_description').trumbowyg('html')
    axios.post('/admin/kc-infograph/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#infograph_description').trumbowyg('html', "")
            $('#kc_infograph').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_videos').click(function () {
    // $('#kc_videos').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#videos_description').trumbowyg("html", data.content.KC_VIDEOS.OVERVIEW)
            $('#kc_videos').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.kcvideosave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#videos_description').trumbowyg('html')
    axios.post('/admin/kc-videos/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#videos_description').trumbowyg('html', "")
            $('#kc_videos').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_case').click(function () {
    // $('#kc_case').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#case_description').trumbowyg("html", data.content.KC_CASE_STUDIES.OVERVIEW)
            $('#kc_case').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.kccasesave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#case_description').trumbowyg('html')
    axios.post('/admin/kc-case-studies/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#case_description').trumbowyg('html', "")
            $('#kc_case').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_akshay').click(function () {
    // $('#kc_akshay').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#akshay_description').trumbowyg("html", data.content.KC_AKSHAY.OVERVIEW)
            $('#kc_akshay').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.kcakshaysave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#akshay_description').trumbowyg('html')
    axios.post('/admin/kc-akshay/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#akshay_description').trumbowyg('html', "")
            $('#kc_akshay').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})

$('.edit_recent').click(function () {
    // $('#mc_recent').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#news_description').trumbowyg("html", data.content.MC_RECENT_NEWS.OVERVIEW)
            $('#mc_recent').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.mcnewssave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#news_description').trumbowyg('html')


    console.log(summary)
    axios.post('/admin/mc-recent/overview', {
        summary: summary
    }).then(response => {
        console.log(response)
        return response.data
    }).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#news_description').trumbowyg('html', "")
            $('#mc_recent').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_speeches').click(function () {
    //    $('#mc_speeches').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#speeches_description').trumbowyg("html", data.content.MC_SPEECHES_VISITS.OVERVIEW)
            $('#mc_speeches').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.mcspeechsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#speeches_description').trumbowyg('html')
    axios.post('/admin/mc-speeches/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#speeches_description').trumbowyg('html', "")
            $('#mc_speeches').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_ia').click(function () {
    //$('#mc_ia').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ia_description').trumbowyg("html", data.content.MC_IA.OVERVIEW)
            $('#mc_ia').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.mciasave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#ia_description').trumbowyg('html')
    axios.post('/admin/mc-ia/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ia_description').trumbowyg('html', "")
            $('#mc_ia').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})

$('.edit_ir').click(function () {
    // $('#irModal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ir_desc').trumbowyg("html", data.content.IR.OVERVIEW)
            $('#irModal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irSave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#ir_desc').trumbowyg('html')
    axios.post('/admin/ir/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ir_desc').trumbowyg('html', "")
            $('#irModal').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_irio').click(function () {
    // $('#iriom').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#iriodesc').trumbowyg("html", data.content.IR.INT_ORG)
            $('#iriom').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.iriosave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#iriodesc').trumbowyg('html')
    axios.post('/admin/ir/int-org', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#iriodesc').trumbowyg('html', "")
            $('#iriom').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_irsup').click(function () {
    // $('#irsupm').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irsupdesc').trumbowyg("html", data.content.IR.SUP_CON)
            $('#irsupm').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irsupsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#irsupdesc').trumbowyg('html')
    axios.post('/admin/ir/sup', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irsupdesc').trumbowyg('html', "")
            $('#irsupm').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})

$('.edit_irena').click(function () {
    // $('#irenam').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irenadesc').trumbowyg("html", data.content.IR.IRENA)
            $('#irenam').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irenasave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#irenadesc').trumbowyg('html')
    axios.post('/admin/ir/irena', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irenadesc').trumbowyg('html', "")
            $('#irenam').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})


$('.edit_re_2018').click(function () {
    // $('#reModal1').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#re2018_desc').trumbowyg("html", data.content.RE_1.OVERVIEW)
            $('#reModal1').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.reonesave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#re2018_desc').trumbowyg('html')
    axios.post('/admin/re/2018/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#re2018_desc').trumbowyg('html', "")
            $('#reModal1').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_re_2019').click(function () {
    // $('#reModal2').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#re2019_desc').trumbowyg("html", data.content.RE_2.OVERVIEW)
            $('#reModal2').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.retwosave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#re2019_desc').trumbowyg('html')
    axios.post('/admin/re/2019/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#re2019_desc').trumbowyg('html', "")
            $('#reModal2').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_solar_ir').click(function () {
    // $('#ir_solar').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irsolardesc').trumbowyg("html", data.content.IR_SOLAR.OVERVIEW)
            $('#ir_solar').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irsolarsave').click(function () {
    addPageLoader("Savig Content")
    var summary = $('#irsolardesc').trumbowyg('html')
    axios.post('/admin/ir/solar/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irsolardesc').trumbowyg('html', "")
            $('#ir_solar').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_wind_ir').click(function () {
    // $('#ir_wind').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irwinddesc').trumbowyg("html", data.content.IR_WIND.OVERVIEW)
            $('#ir_wind').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irwindsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#irwinddesc').trumbowyg('html')
    axios.post('/admin/ir/wind/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irwinddesc').trumbowyg('html', "")
            $('#ir_wind').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_small_ir').click(function () {
    // $('#ir_small').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irsmalldesc').trumbowyg("html", data.content.IR_SMALL_HYDRO.OVERVIEW)
            $('#ir_small').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irsmallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#irsmalldesc').trumbowyg('html')
    axios.post('/admin/ir/small/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irsmalldesc').trumbowyg('html', "")
            $('#ir_small').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_bio_ir').click(function () {
    // $('#ir_bio').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irbiodesc').trumbowyg("html", data.content.IR_BIO.OVERVIEW)
            $('#ir_bio').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irbiosave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#irbiodesc').trumbowyg('html')
    axios.post('/admin/ir/bio/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irbiodesc').trumbowyg('html', "")
            $('#ir_bio').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edit_waste_ir').click(function () {
    // $('#ir_waste').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irwastedesc').trumbowyg("html", data.content.IR_WASTE.OVERVIEW)
            $('#ir_waste').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.irwastesave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#irwastedesc').trumbowyg('html')
    axios.post('/admin/ir/waste/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#irwastedesc').trumbowyg('html', "")
            $('#ir_waste').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.editmansolar').click(function () {
    // $('#mansolar').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#mansolardesc').trumbowyg("html", data.content.MAN_SOLAR.OVERVIEW)
            $('#mansolar').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.mansolarsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#mansolardesc').trumbowyg('html')
    axios.post('/admin/man/solar/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#mansolardesc').trumbowyg('html', "")
            $('#mansolar').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.editmanwind').click(function () {
    // $('#manwind').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#manwinddesc').trumbowyg("html", data.content.MAN_WIND.OVERVIEW)
            $('#manwind').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.manwindsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#manwinddesc').trumbowyg('html')
    axios.post('/admin/man/wind/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#manwinddesc').trumbowyg('html', "")
            $('#manwind').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.editmansmall').click(function () {
    // $('#mansmall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#mansmalldesc').trumbowyg("html", data.content.MAN_SMALL_HYDRO.OVERVIEW)
            $('#mansmall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.mansmallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#mansmalldesc').trumbowyg('html')
    axios.post('/admin/man/small/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#mansmalldesc').trumbowyg('html', "")
            $('#mansmall').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.editmanbio').click(function () {
    // $('#manbio').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#manbiodesc').trumbowyg("html", data.content.MAN_BIO.OVERVIEW)
            $('#manbio').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.manbiosave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#manbiodesc').trumbowyg('html')
    axios.post('/admin/man/bio/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#manbiodesc').trumbowyg('html', "")
            $('#manbio').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.editmanwaste').click(function () {
    // $('#manwaste').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#manwastedesc').trumbowyg("html", data.content.MAN_WASTE.OVERVIEW)
            $('#manwaste').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.manwastesave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#manwastedesc').trumbowyg('html')
    axios.post('/admin/man/waste/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#manwastedesc').trumbowyg('html', "")
            $('#manwaste').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
var isapage_file = ''

var isaPageFileElement = document.querySelector('#isapagefile')
var isaPond = FilePond.create(isaPageFileElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
isaPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Error')
        openNotification()
    } else {
        isapage_file = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editisaoverview').click(function () {
    // $('#isapage').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            console.log(data.content.ISA_PAGE)
            $('#isadesc').trumbowyg("html", data.content.ISA_PAGE.OVERVIEW)
            $('.isai').attr('src', data.content.ISA_PAGE.IMAGE.LOCATION)
            isaPond.addFile(data.content.ISA_PAGE.IMAGE.LOCATION)
            $('#isapage').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.isapagesave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#isadesc').trumbowyg('html')
    axios.post('/admin/isa/overview', { summary }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#isadesc').trumbowyg('html', "")
            $('#isapage').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})




$('.editrtender').click(function () {
    // $('#rtender').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rtenderdesc').trumbowyg("html", data.content.RECENT_TENDERS.OVERVIEW)
            $('#rtender').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.rtendersave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rtenderdesc').trumbowyg('html')
    axios.post('/admin/recent-tenders/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rtenderdesc').trumbowyg('html', "")
            $('#rtender').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.editatender').click(function () {
    // $('#atender').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#atenderdesc').trumbowyg("html", data.content.ARCHIVED_TENDERS.OVERVIEW)
            $('#atender').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.atendersave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#atenderdesc').trumbowyg('html')
    axios.post('/admin/archived-tenders/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#atenderdesc').trumbowyg('html', "")
            $('#atender').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydobj').click(function () {
    // $('#hydobj').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            console.log(data.content)
            $('#hydobjdesc').trumbowyg("html", data.content.HYDROGEN.OBJECTIVES.OVERVIEW)
            $('#hydobj').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydobjsave').click(function () {
    addPageLoader("Fetching Content")
    var summary = $('#hydobjdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-objectives/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydobjdesc').trumbowyg('html', "")
            $('#hydobj').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydact').click(function () {
    // $('#hydact').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydactdesc').trumbowyg("html", data.content.HYDROGEN.ACTIVITIES.OVERVIEW)
            $('#hydact').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydactsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydactdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-activities/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydactdesc').trumbowyg('html', "")
            $('#hydact').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydong').click(function () {
    // $('#hydong').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydongdesc').trumbowyg("html", data.content.HYDROGEN.ONGOING_PROJECTS.OVERVIEW)
            $('#hydong').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydongsave').click(function () {
    addPageLoader("Savng Content")
    var summary = $('#hydongdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-ongoing/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydongdesc').trumbowyg('html', "")
            $('#hydong').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydach').click(function () {
    // $('#hydach').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydachdesc').trumbowyg("html", data.content.HYDROGEN.ACHIEVEMENTS.OVERVIEW)
            $('#hydach').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydachsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydachdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-achievements/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydachdesc').trumbowyg('html', "")
            $('#hydach').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydthrust').click(function () {
    // $('#hydthrust').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydthrustdesc').trumbowyg("html", data.content.HYDROGEN.THRUST_AREAS.OVERVIEW)
            $('#hydthrust').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydthrustsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydthrustdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-thrust/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydthrustdesc').trumbowyg('html', "")
            $('#hydthrust').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydpot').click(function () {
    // $('#hydpot').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydpotdesc').trumbowyg("html", data.content.HYDROGEN.POT_APP.OVERVIEW)
            $('#hydpot').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydpotsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydpotdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-potential/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydpotdesc').trumbowyg('html', "")
            $('#hydpot').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydorg').click(function () {
    // $('#hydorg').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydorgdesc').trumbowyg("html", data.content.HYDROGEN.ORGS.OVERVIEW)
            $('#hydorg').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydorgsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydorgdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-orgs/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydorgdesc').trumbowyg('html', "")
            $('#hydorg').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydsto').click(function () {
    // $('#hydsto').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydstodesc').trumbowyg("html", data.content.HYDROGEN.STORAGE.OVERVIEW)
            $('#hydsto').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydstosave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydstodesc').trumbowyg('html')
    axios.post('/admin/hydrogen-storage/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydstodesc').trumbowyg('html', "")
            $('#hydsto').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydapp').click(function () {
    // $('#hydapp').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydappdesc').trumbowyg("html", data.content.HYDROGEN.APPLICATION.OVERVIEW)
            $('#hydapp').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydappsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydappdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-application/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydappdesc').trumbowyg('html', "")
            $('#hydapp').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})
$('.edithydoth').click(function () {
    // $('#hydoth').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydothdesc').trumbowyg("html", data.content["HYDROGEN"]["OTHER_AREAS"].OVERVIEW)
            $('#hydoth').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Code: 500')
            openNotification()
        }
    })
})

$('.hydothsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hydothdesc').trumbowyg('html')
    axios.post('/admin/hydrogen-other/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hydothdesc').trumbowyg('html', "")
            $('#hydoth').removeClass('is-active')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Server Error. Please Try Again.')
            openNotification()
        }
    })
})

var FCM = [{
    modal_id: "fcobj",
    textarea_id: "fcobjdesc",
    saveButtonClass: "fcobjsave",
    title: "Fuel Cell Objectives",
    field: "OBJECTIVES",
    route: "chemical-objectives",
    energy: "CHEMICAL"
}, {
    modal_id: "fcact",
    textarea_id: "fcactdesc",
    saveButtonClass: "fcactsave",
    title: "Fuel Cell Activities",
    field: "ACTIVITIES",
    route: "chemical-activities",
    energy: "CHEMICAL"
}, {
    modal_id: "fcong",
    textarea_id: "fcongdesc",
    saveButtonClass: "fcongsave",
    title: "Fuel Cell Ongoing Projects",
    field: "ONGOING_PROJECTS",
    route: "chemical-ongoing",
    energy: "CHEMICAL"
}, {
    modal_id: "fcach",
    textarea_id: "fcachdesc",
    saveButtonClass: "dcachsave",
    title: "Fuel Cell Achievements",
    field: "ACHIEVEMENTS",
    route: "chemical-achievements",
    energy: "CHEMICAL"
}, {
    modal_id: "fcthrust",
    textarea_id: "fcthrustdesc",
    saveButtonClass: "fcthrustsave",
    title: "Fuel Cell Thrust Areas",
    field: "THRUST_AREAS",
    route: "chemical-thrust",
    energy: "CHEMICAL"
},
{
    modal_id: "bovobj",
    textarea_id: "bovobjdesc",
    saveButtonClass: "bovobjsave",
    field: "OBJECTIVES",
    route: "battery-objectives",
    energy: "BATTERY_OPERATED"
},
{
    modal_id: "bovact",
    textarea_id: "bovactdesc",
    saveButtonClass: "bovactsave",
    field: "ACTIVITIES",
    route: "battery-activities",
    energy: "BATTERY_OPERATED"
},
{
    modal_id: "bovong",
    textarea_id: "bovongdesc",
    saveButtonClass: "bovongsave",
    field: "ONGOING_PROJECTS",
    route: "battery-ongoing",
    energy: "BATTERY_OPERATED"
},
{
    modal_id: "bovach",
    textarea_id: "bovachdesc",
    saveButtonClass: "bovachsave",
    field: "ACHIEVEMENTS",
    route: "battery-achievements",
    energy: "BATTERY_OPERATED"
},
{
    modal_id: "bovthrust",
    textarea_id: "bovthrustdesc",
    saveButtonClass: "bovthrustsave",
    field: "THRUST_AREAS",
    route: "battery-thrust",
    energy: "BATTERY_OPERATED"
},
{
    modal_id: "geoobj",
    textarea_id: "geoobjdesc",
    saveButtonClass: "geoobjsave",
    field: "OBJECTIVES",
    route: "geo-objectives",
    energy: "GEO_THERMAL"
},
{
    modal_id: "geoact",
    textarea_id: "geoactdesc",
    saveButtonClass: "geoactsave",
    field: "ACTIVITIES",
    route: "geo-activities",
    energy: "GEO_THERMAL"
},
{
    modal_id: "geoong",
    textarea_id: "geoongdesc",
    saveButtonClass: "geoongsave",
    field: "ONGOING_PROJECTS",
    route: "geo-ongoing",
    energy: "GEO_THERMAL"
},
{
    modal_id: "geoach",
    textarea_id: "geoachdesc",
    saveButtonClass: "geoachsave",
    field: "ACHIEVEMENTS",
    route: "geo-achievements",
    energy: "GEO_THERMAL"
},
{
    modal_id: "geothrust",
    textarea_id: "geothrustdesc",
    saveButtonClass: "geothrustsave",
    field: "THRUST_AREAS",
    route: "geo-thrust",
    energy: "GEO_THERMAL"
},
{
    modal_id: "esobj",
    textarea_id: "esobjdesc",
    saveButtonClass: "esobjsave",
    field: "OBJECTIVES",
    route: "es-objectives",
    energy: "ENERGY_STORAGE"
},
{
    modal_id: "esact",
    textarea_id: "esactdesc",
    saveButtonClass: "esactsave",
    field: "ACTIVITIES",
    route: "es-activities",
    energy: "ENERGY_STORAGE"
},
{
    modal_id: "esong",
    textarea_id: "esongdesc",
    saveButtonClass: "esongsave",
    field: "ONGOING_PROJECTS",
    route: "es-ongoing",
    energy: "ENERGY_STORAGE"
},
{
    modal_id: "esach",
    textarea_id: "esachdesc",
    saveButtonClass: "esachsave",
    field: "ACHIEVEMENTS",
    route: "es-achievements",
    energy: "ENERGY_STORAGE"
},
{
    modal_id: "esthrust",
    textarea_id: "esthrustdesc",
    saveButtonClass: "esthrustsave",
    field: "THRUST_AREAS",
    route: "es-thrust",
    energy: "ENERGY_STORAGE"
},
{
    modal_id: "biofobj",
    textarea_id: "biofobjdesc",
    saveButtonClass: "biofobjsave",
    field: "OBJECTIVES",
    route: "biof-objectives",
    energy: "BIOFUELS"
},
{
    modal_id: "biofact",
    textarea_id: "biofactdesc",
    saveButtonClass: "biofactsave",
    field: "ACTIVITIES",
    route: "biof-activities",
    energy: "BIOFUELS"
},
{
    modal_id: "biofong",
    textarea_id: "biofongdesc",
    saveButtonClass: "biofongsave",
    field: "ONGOING_PROJECTS",
    route: "biof-ongoing",
    energy: "BIOFUELS"
},
{
    modal_id: "biofach",
    textarea_id: "biofachdesc",
    saveButtonClass: "biofachsave",
    field: "ACHIEVEMENTS",
    route: "biof-achievements",
    energy: "BIOFUELS"
},
{
    modal_id: "biofthrust",
    textarea_id: "biofthrustdesc",
    saveButtonClass: "biofthrustsave",
    field: "THRUST_AREAS",
    route: "biof-thrust",
    energy: "BIOFUELS"
},
{
    modal_id: "oceanobj",
    textarea_id: "oceanobjdesc",
    saveButtonClass: "oceanobjsave",
    field: "OBJECTIVES",
    route: "ocean-objectives",
    energy: "OCEAN"
},
{
    modal_id: "oceanact",
    textarea_id: "oceanactdesc",
    saveButtonClass: "oceanactsave",
    field: "ACTIVITIES",
    route: "ocean-activities",
    energy: "BIO_FUELS"
},
{
    modal_id: "oceanong",
    textarea_id: "oceanongdesc",
    saveButtonClass: "oceanongsave",
    field: "ONGOING_PROJECTS",
    route: "ocean-ongoing",
    energy: "OCEAN"
},
{
    modal_id: "oceanach",
    textarea_id: "oceanachdesc",
    saveButtonClass: "oceanachsave",
    field: "ACHIEVEMENTS",
    route: "ocean-achievements",
    energy: "OCEAN"
},
{
    modal_id: "oceanthrust",
    textarea_id: "oceanthrustdesc",
    saveButtonClass: "oceanthrustsave",
    field: "THRUST_AREAS",
    route: "ocean-thrust",
    energy: "OCEAN"
},
]

FCM.forEach(f => {
    $(`.edit${f.modal_id}`).click(function () {
        // $(`#${f.modal_id}`).addClass('is-active')
        addPageLoader("Fetching Content")
        axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
            removePageLoader()
            if (data.status == "Success") {
                $(`#${f.textarea_id}`).trumbowyg("html", data.content[f.energy][f.field].OVERVIEW)
                $(`#${f.modal_id}`).addClass('is-active')
            } else {
                $('#dashboardNotification').addClass('is-danger')
                $('#notification_message').text('Error Code: 500')
                openNotification()
            }
        })
    })

    $(`.${f.saveButtonClass}`).click(function () {
        addPageLoader("Saving Content")
        var summary = $(`#${f.textarea_id}`).trumbowyg('html')
        axios.post(`/admin/${f.route}/overview`, {
            summary: summary
        }).then(response => response.data).catch(error => {
            console.log(error)
        }).then(data => {
            removePageLoader()
            if (data.status == "Success") {
                $(`#${f.textarea_id}`).trumbowyg('html', "")
                $(`#${f.modal_id}`).removeClass('is-active')
                $('#dashboardNotification').addClass('is-success')
                $('#notification_message').text('Updated')
                openNotification()
            } else {
                $('#dashboardNotification').addClass('is-danger')
                $('#notification_message').text('Server Error. Please Try Again.')
                openNotification()
            }
        })
    })
})

var fuel_section_banner = ''

const fuelSectionInputElement = document.querySelector('#fuelCellInputFileElement')
const fuelSectionPond = FilePond.create(fuelSectionInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
fuelSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        fuel_section_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editfc').click(function () {
    // $('#fcsectionone').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#fuelCellPanelSavedImage').attr('src', data.content.CHEMICAL.SECTION_ONE.IMAGE.LOCATION)
            fuelSectionPond.addFile(data.content.CHEMICAL.SECTION_ONE.IMAGE.LOCATION)
            $('#fuelCellDescription').trumbowyg("html", data.content.CHEMICAL.SECTION_ONE.SUMMARY)
            $('#fcsectionone').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Chemical Energy Panel One Update Error Code: 500')
            openNotification()
        }
    })
})


$('.saveFuelCellSectionOne').click(function () {
    addPageLoader("Saving Content")
    var image = fuel_section_banner.file
    var summary = $('#fuelCellDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/chemical-energy/section-one', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#fcsectionone').removeClass('is-active')
            fuelSectionPond.removeFile()
            $('#fuelCellDescription').trumbowyg('html', '')
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Hydrogen Energy Section One Updated')
            openNotification()
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Chemical Energy Section One Update Error. Error Code: 500')
            openNotification()
        }
    })
})
var battery_section_banner = ''

const batterySectionInputElement = document.querySelector('#batteryInputFileElement')
const batterySectionPond = FilePond.create(batterySectionInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
batterySectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        battery_section_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editbov').click(function () {
    // $('#batterysectionone').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#batteryPanelSavedImage').attr('src', data.content.BATTERY_OPERATED.SECTION_ONE.IMAGE.LOCATION)
            batterySectionPond.addFile(data.content.BATTERY_OPERATED.SECTION_ONE.IMAGE.LOCATION)
            $('#batteryDescription').trumbowyg("html", data.content.BATTERY_OPERATED.SECTION_ONE.SUMMARY)
            $('#batterysectionone').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('BATTERY OPERATED VEHICLES Panel One Update Error Code: 500')
            openNotification()
        }
    })
})

$('.saveBatterySectionOne').click(function () {
    addPageLoader("Saving Content")
    var image = battery_section_banner.file
    var summary = $('#batteryDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/battery-operated-vehicles/section-one', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#batterysectionone').removeClass('is-active')
            geoSectionPond.removeFile()
            $('#batteryDescription').trumbowyg('html', '')
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

var geo_section_banner = ''

const geoSectionInputElement = document.querySelector('#geoInputFileElement')
const geoSectionPond = FilePond.create(geoSectionInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
geoSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        if (file.fileExtension == 'png' || file.fileExtension == "jpg") {
            geo_section_banner = file
            $('#dashboardNotification').addClass('is-success')
            $('#notification_message').text('Banner Image Added')
            openNotification()
        } else {
            geoSectionPond.removeFile()
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('File Error, Please Check Format.')
            openNotification()
        }
    }
})

$('.editgeo').click(function () {
    // $('#geosectionone').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#geoPanelSavedImage').attr('src', data.content.GEO_THERMAL.SECTION_ONE.IMAGE.LOCATION)
            geoSectionPond.addFile(data.content.GEO_THERMAL.SECTION_ONE.IMAGE.LOCATION)
            $('#geoDescription').trumbowyg("html", data.content.GEO_THERMAL.SECTION_ONE.SUMMARY)
            $('#geosectionone').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Geo Thermal Panel One Update Error Code: 500')
            openNotification()
        }
    })
})


$('.saveGeoSectionOne').click(function () {
    addPageLoader("Saving Content")
    var image = geo_section_banner.file
    var summary = $('#geoDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/geo-thermal-energy/section-one', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#geosectionone').removeClass('is-active')
            geoSectionPond.removeFile()
            $('#geoDescription').trumbowyg('html', '')
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

var es_section_banner = ''

const esSectionInputElement = document.querySelector('#esInputFileElement')
const esSectionPond = FilePond.create(esSectionInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
esSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        es_section_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.edites').click(function () {
    // $('#essectionone').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
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
    addPageLoader("Saving Content")
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
        removePageLoader()
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

var biof_section_banner = ''

const biofSectionInputElement = document.querySelector('#biofInputFileElement')
const biofSectionPond = FilePond.create(biofSectionInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
biofSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        biof_section_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editbiof').click(function () {
    // $('#biofsectionone').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#biofPanelSavedImage').attr('src', data.content.BIOFUELS.SECTION_ONE.IMAGE.LOCATION)
            biofSectionPond.addFile(data.content.BIOFUELS.SECTION_ONE.IMAGE.LOCATION)
            $('#biofDescription').trumbowyg("html", data.content.BIOFUELS.SECTION_ONE.SUMMARY)
            $('#biofsectionone').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Geo Thermal Panel One Update Error Code: 500')
            openNotification()
        }
    })
})


$('.saveBioFSectionOne').click(function () {
    addPageLoader("Saving Content")
    var image = biof_section_banner.file
    var summary = $('#biofDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/bio-fuels/section-one', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#biofsectionone').removeClass('is-active')
            biofSectionPond.removeFile()
            $('#biofDescription').trumbowyg('html', '')
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
var ocean_section_banner = ''

const oceanSectionInputElement = document.querySelector('#oceanInputFileElement')
const oceanSectionPond = FilePond.create(oceanSectionInputElement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
oceanSectionPond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Banner Image Upload Error Code: 500')
        openNotification()
    } else {
        ocean_section_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editocean').click(function () {
    // $('#oceansectionone').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#oceanPanelSavedImage').attr('src', data.content.OCEAN.SECTION_ONE.IMAGE.LOCATION)
            oceanSectionPond.addFile(data.content.OCEAN.SECTION_ONE.IMAGE.LOCATION)
            $('#oceanDescription').trumbowyg("html", data.content.OCEAN.SECTION_ONE.SUMMARY)
            $('#oceansectionone').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Panel One Update Error Code: 500')
            openNotification()
        }
    })
})


$('.saveOceanSectionOne').click(function () {
    addPageLoader("Saving Content")
    var image = ocean_section_banner.file
    var summary = $('#oceanDescription').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/ocean-energy/section-one', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#oceansectionone').removeClass('is-active')
            oceanSectionPond.removeFile()
            $('#oceanDescription').trumbowyg('html', '')
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

var offwind_banner = ''

const offshorewindsectionfileinputelement = document.querySelector('#offwindInputFileElement')
const offwindpond = FilePond.create(offshorewindsectionfileinputelement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
offwindpond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Image Upload Error Code: 500')
        openNotification()
    } else {
        offwind_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editoffwind').click(function () {
    // $('#offwindmodal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#offwind_desc').trumbowyg("html", data.content.OFF_WIND.OVERVIEW)
            $('#savedoffwindimage').attr('src', data.content.OFF_WIND.IMAGE.LOCATION)
            offwindpond.addFile(data.content.OFF_WIND.IMAGE.LOCATION)
            $('#offwindmodal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.saveoffwind').click(function () {
    addPageLoader("Saving Content")
    var image = offwind_banner.file
    var summary = $('#offwind_desc').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/off-wind/overview', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#offwindmodal').removeClass('is-active')
            offwindpond.removeFile()
            $('#offwind_desc').trumbowyg('html', '')
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

var solardec_banner = ''

const solardecsectionfileinputelement = document.querySelector('#solardecInputFileElement')
const solardecpond = FilePond.create(solardecsectionfileinputelement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
solardecpond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Image Upload Error Code: 500')
        openNotification()
    } else {
        solardec_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editsolardec').click(function () {
    // $('#solardecmodal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#solardec_desc').trumbowyg("html", data.content.SOLAR_DEC.OVERVIEW)
            $('#savedsolardecimage').attr('src', data.content.SOLAR_DEC.IMAGE.LOCATION)
            solardecpond.addFile(data.content.SOLAR_DEC.IMAGE.LOCATION)
            $('#solardecmodal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.savesolardec').click(function () {
    addPageLoader("Saving Content")
    var image = solardec_banner.file
    var summary = $('#solardec_desc').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/solar-dec/overview', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#solardecmodal').removeClass('is-active')
            solardecpond.removeFile()
            $('#solardec_desc').trumbowyg('html', '')
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
var solarnew_banner = ''

const solarnewsectionfileinputelement = document.querySelector('#solarnewInputFileElement')
const solarnewpond = FilePond.create(solarnewsectionfileinputelement, {
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/*'],
    labelFileTypeNotAllowed: "Incorrect File upload Format"
})
solarnewpond.on('addfile', (error, file) => {
    if (error) {
        $('#dashboardNotification').addClass('is-danger')
        $('#notification_message').text('Upload Error Code: 500')
        openNotification()
    } else {
        solarnew_banner = file
        $('#dashboardNotification').addClass('is-success')
        $('#notification_message').text('Banner Image Added')
        openNotification()
    }
})

$('.editsolarnew').click(function () {
    // $('#solarnewmodal').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#solarnew_desc').trumbowyg("html", data.content.SOLAR_NEW.OVERVIEW)
            $('#savedsolarnewimage').attr('src', data.content.SOLAR_NEW.IMAGE.LOCATION)
            solarnewpond.addFile(data.content.SOLAR_NEW.IMAGE.LOCATION)
            $('#solarnewmodal').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.savesolarnew').click(function () {
    addPageLoader("Saving Content")
    var image = solarnew_banner.file
    var summary = $('#solarnew_desc').trumbowyg('html')
    var fd = new FormData()
    fd.append('image', image)
    fd.append('summary', summary)
    axios.post('/admin/solar-new/overview', fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#solarnewmodal').removeClass('is-active')
            solardecpond.removeFile()
            $('#solarnew_desc').trumbowyg('html', '')
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



$('.editrdoverall').click(function () {
    // $('#rdoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdoveralldesc').trumbowyg("html", data.content.RD.OVERALL.OVERVIEW)
            $('#rdoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.rdoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rdoveralldesc').trumbowyg('html')
    axios.post('/admin/rd-overall/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdoverall').removeClass('is-active')
            $('#rdoveralldesc').trumbowyg('html', '')
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
$('.editrdsolar').click(function () {
    // $('#rdsolar').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdsolardesc').trumbowyg("html", data.content.RD.SOLAR.OVERVIEW)
            $('#rdsolar').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.rdsolarsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rdsolardesc').trumbowyg('html')
    axios.post('/admin/rd-solar/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdsolar').removeClass('is-active')
            $('#rdsolardesc').trumbowyg('html', '')
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
$('.editrdwind').click(function () {
    // $('#rdwind').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdwinddesc').trumbowyg("html", data.content.RD.WIND.OVERVIEW)
            $('#rdwind').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.rdwindsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rdwinddesc').trumbowyg('html')
    axios.post('/admin/rd-wind/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdwind').removeClass('is-active')
            $('#rdwinddesc').trumbowyg('html', '')
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
$('.editrdsmall').click(function () {
    // $('#rdsmall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdsmalldesc').trumbowyg("html", data.content.RD.SMALL_HYDRO.OVERVIEW)
            $('#rdsmall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.rdsmallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rdsmalldesc').trumbowyg('html')
    axios.post('/admin/rd-small/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdsmall').removeClass('is-active')
            $('#rdsmalldesc').trumbowyg('html', '')
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
$('.editrdbio').click(function () {
    // $('#rdbio').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdbiodesc').trumbowyg("html", data.content.RD.BIO.OVERVIEW)
            $('#rdbio').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.rdbiosave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rdbiodesc').trumbowyg('html')
    axios.post('/admin/rd-bio/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdbio').removeClass('is-active')
            $('#rdbiodesc').trumbowyg('html', '')
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
$('.editrdwaste').click(function () {
    // $('#rdwaste').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdwastedesc').trumbowyg("html", data.content.RD.WASTE.OVERVIEW)
            $('#rdwaste').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.rdwastesave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rdwastedesc').trumbowyg('html')
    axios.post('/admin/rd-waste/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rdwaste').removeClass('is-active')
            $('#rdwastedesc').trumbowyg('html', '')
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

$('.edithrdoverall').click(function () {
    // $('#hrdoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            console.log(data.content.HRD)
            $('#hrdoveralldesc').trumbowyg("html", data.content.HRD.OVERVIEW)
            $('#hrdoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.editlabpolicystandard').click(function () {
    // $('#hrdoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#labpolicystandarddesc').trumbowyg("html", data.content.LAB_POLICY_STANDARDS.OVERVIEW)
            $('#lab_policy_container1').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.labpolicystandardsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#labpolicystandarddesc').trumbowyg('html')
    axios.post('/admin/lab-policy-standard/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#lab_policy_container1').removeClass('is-active')
            $('#labpolicystandarddesc').trumbowyg('html', '')
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



$('.editrti').click(function () {
    // $('#hrdoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rtiddesc').trumbowyg("html", data.content.RIGHT_TO_INFORMATION.OVERVIEW)
            $('#rti_container').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.rtisave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#rtiddesc').trumbowyg('html')
    axios.post('/admin/rti/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#rti_container').removeClass('is-active')
            $('#rtiddesc').trumbowyg('html', '')
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



$('.hrdoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#hrdoveralldesc').trumbowyg('html')
    axios.post('/admin/hrd/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#hrdoverall').removeClass('is-active')
            $('#hrdoveralldesc').trumbowyg('html', '')
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

$('.esc').click(function () {
    // $('#scoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#scoveralldesc').trumbowyg("html", data.content.SC.OVERVIEW)
            $('#scoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.scoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#scoveralldesc').trumbowyg('html')
    axios.post('/admin/sc/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#scoverall').removeClass('is-active')
            $('#scoveralldesc').trumbowyg('html', '')
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
$('.egb').click(function () {
    //  $('#gboverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#gboveralldesc').trumbowyg("html", data.content.GB.OVERVIEW)
            $('#gboverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.gboverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#gboveralldesc').trumbowyg('html')
    axios.post('/admin/gb/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#gboverall').removeClass('is-active')
            $('#gboveralldesc').trumbowyg('html', '')
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
$('.essd').click(function () {
    // $('#ssoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ssoveralldesc').trumbowyg("html", data.content.SOLAR.SCHEME.OVERVIEW)
            $('#ssoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.ssoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#ssoveralldesc').trumbowyg('html')
    axios.post('/admin/solar/scheme/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#ssoverall').removeClass('is-active')
            $('#ssoveralldesc').trumbowyg('html', '')
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
$('.ewsd').click(function () {
    // $('#wsoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#wsoveralldesc').trumbowyg("html", data.content.WIND.SCHEME.OVERVIEW)
            $('#wsoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.wsoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#wsoveralldesc').trumbowyg('html')
    axios.post('/admin/wind/scheme/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#wsoverall').removeClass('is-active')
            $('#wsoveralldesc').trumbowyg('html', '')
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
$('.eshsd').click(function () {
    //  $('#shsoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#shsoveralldesc').trumbowyg("html", data.content.SMALL_HYDRO.SCHEME.OVERVIEW)
            $('#shsoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.shsoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#shsoveralldesc').trumbowyg('html')
    axios.post('/admin/small-hydro/scheme/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#shsoverall').removeClass('is-active')
            $('#shsoveralldesc').trumbowyg('html', '')
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
$('.ewssd').click(function () {
    //  $('#wssoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#wssoveralldesc').trumbowyg("html", data.content.WASTE.SCHEME.OVERVIEW)
            $('#wssoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.wssoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#wssoveralldesc').trumbowyg('html')
    axios.post('/admin/waste/scheme/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#wssoverall').removeClass('is-active')
            $('#wssoveralldesc').trumbowyg('html', '')
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
$('.ebsd').click(function () {
    //  $('#bsoverall').addClass('is-active')
    addPageLoader("Fetching Content")
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#bsoveralldesc').trumbowyg("html", data.content.BIO.SCHEME.OVERVIEW)
            $('#bsoverall').addClass('is-active')
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Update Error Code: 500')
            openNotification()
        }
    })
})


$('.bsoverallsave').click(function () {
    addPageLoader("Saving Content")
    var summary = $('#bsoveralldesc').trumbowyg('html')
    axios.post('/admin/bio/scheme/overview', {
        summary: summary
    }).then(response => response.data).catch(error => {
        console.log(error)
    }).then(data => {
        removePageLoader()
        if (data.status == "Success") {
            $('#bsoverall').removeClass('is-active')
            $('#bsoveralldesc').trumbowyg('html', '')
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


var LabPolicy = [
    {
        button: "selp",
        modal: "selpm",
        desc: "selpd",
        save: "selpsave",
        model: "SOLAR"
    },
    {
        button: "welp",
        modal: "welpm",
        desc: "welpd",
        save: "welpsave",
        model: "WIND"
    },
    {
        button: "shelp",
        modal: "shelpm",
        desc: "shelpd",
        save: "shelpsave",
        model: "SMALL_HYDRO"
    },
    {
        button: "wtelp",
        modal: "wtelpm",
        desc: "wtelpd",
        save: "wtelpsave",
        model: "WASTE"
    },
    {
        button: "belp",
        modal: "belpm",
        desc: "belpd",
        save: "belpsave",
        model: "BIO"
    }
]

LabPolicy.forEach(lp => {
    $(`.${lp.button}`).click(function () {
        //  $(`#${lp.modal}`).addClass('is-active')
        addPageLoader("Fetching Content")
        axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
            removePageLoader()
            if (data.status == "Success") {
                $(`#${lp.desc}`).trumbowyg("html", data.content.LAB_POLICY[`${lp.model}`])
                $(`#${lp.modal}`).addClass('is-active')
            } else {
                $('#dashboardNotification').addClass('is-danger')
                $('#notification_message').text('Update Error Code: 500')
                openNotification()
            }
        })
    })


    $(`.${lp.save}`).click(function () {
        addPageLoader("Saving Content")
        var summary = $(`#${lp.desc}`).trumbowyg('html')
        axios.post(`/admin/lab-policy/${lp.model}`, {
            summary: summary
        }).then(response => response.data).catch(error => {
            console.log(error)
        }).then(data => {
            removePageLoader()
            if (data.status == "Success") {
                $(`#${lp.modal}`).removeClass('is-active')
                $(`#${lp.desc}`).trumbowyg('html', '')
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
})
