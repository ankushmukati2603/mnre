var _open_schemes_modal = function () {
    $('#schemesModal').addClass('is-active');
    document.getElementById("_schemes_form").reset();
    $('#scheme_content').trumbowyg("html", '');
    $('input[name="_action_mode"]').val('add');
}

var _close_schemes_modal = function () {
    $('#schemesModal').removeClass('is-active');
}

var _show_notification = function (message) {
    $('#dashboardNotification').addClass('is-success')
    $('#notification_message').text(message);
    openNotification();
}

var _editScheme = function ($this) {
    var id = $this.getAttribute('data-id');
    axios.get(`/admin/energy/scheme/${id}`).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#schemesModal').addClass('is-active');
            var row = data.data
            $('input[name="_action_mode"]').val(id)
            $('#scheme_type').val(row.category)
            $('#scheme_title').val(row.title)
            $('#pdf_english').val(row.pdf_en)
            $('#pdf_hindi').val(row.pdf_hi)
            $('#year').val(row.year)
            $('#ordering').val(row.ordering)
            $('#scheme_content').trumbowyg("html", row.content)
        }
    });
}

var _save_schemes = function ($this) {
    $('#_save_schemes_action').click();
}

$('#_schemes_form').submit(function (e) {
    e.preventDefault();
    var scheme_category = $('input[name="scheme_category"]').val()
    var action_mode = $('input[name="_action_mode"]').val()
    var postUrl = ''
    var message = ''
    if (action_mode == 'add') {
        postUrl = '/admin/energy/scheme'
        message = 'Scheme Added'
    } else if (action_mode != 'add') {
        postUrl = `/admin/energy/scheme/${action_mode}`
        message = 'Scheme Updated'
    }
    var scheme_type = $('#scheme_type').val()
    var scheme_title = $('#scheme_title').val()
    var pdf_english = $('#pdf_english').val()
    var pdf_hindi = $('#pdf_hindi').val()
    var year = $('#year').val()
    var ordering = $('#ordering').val()
    var scheme_content = $('#scheme_content').trumbowyg("html")
    var postData = {
        'category': scheme_type,
        'title': scheme_title,
        'pdf_en': pdf_english,
        'pdf_hi': pdf_hindi,
        'content': scheme_content,
        'year': year,
        'ordering': ordering,
        'parent_category': scheme_category
    }
    axios.post(postUrl, postData).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            _close_schemes_modal();
            _show_notification(message);
            location.reload();
        } else {
            _close_schemes_modal();
            _show_notification('Failed');
        }
    })
})

var _removeScheme = function ($this) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        var id = $this.getAttribute('data-id');
        if (id) {
            axios.delete(`/admin/energy/scheme`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.status == 'Success') {
                    location.reload();
                }
            });
        }
    }
}

/* Ministry */
$('._edit_ministry_mission').click(function () {
    $('#_ministry_mission_modal').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#_ministry_mission_modal').addClass('is-active')
            $("#_ministry_mission_description").trumbowyg('html', data.content.MINISTRY_MISSION_DESCRIPTION)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Occured in Getting Banner Data')
            openNotification()
        }
    })
})

$('._save_ministry_mission').click(function () {
    var ministry_mission = $("#_ministry_mission_description").trumbowyg('html')
    axios.post('/admin/ministry-mission', {
        ministry_mission: ministry_mission
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
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

$('._edit_physical_progress').click(function () {
    $('#_ministry_progress_modal').addClass('is-active')
    axios.get('/admin/get-content').then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
            $('#_ministry_progress_modal').addClass('is-active')
            $("#_ministry_progress_description").trumbowyg('html', data.content.MINISTRY_PHYSICAL_PROGRESS_DESCRIPTION)
        } else {
            $('#dashboardNotification').addClass('is-danger')
            $('#notification_message').text('Error Occured in Getting Banner Data')
            openNotification()
        }
    })
})

$('._save_physical_progress').click(function () {
    var ministry_progress = $("#_ministry_progress_description").trumbowyg('html')
    axios.post('/admin/ministry-progress', {
        ministry_progress: ministry_progress
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.status == "Success") {
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
/* Ministry */



/* STRAPI */

var _accountModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('.textarea').trumbowyg("html", '');
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _accountFileMainPond.removeFile()
    _accountFileThumbPond.removeFile()
}

var _closeModal = function (modalId) {
    $(`#${modalId}`).removeClass('is-active');
}


/* Account Upload */
// File Main
var _accountFileMain = ''
var _accountFileMainEl = document.querySelector(`#_accountFileMain`)
var _accountFileMainPond = FilePond.create(_accountFileMainEl)
_accountFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _accountFileMain = file
    }
})

// File Thumbnail
var _accountFileThumb = ''
var _accountFileThumbEl = document.querySelector(`#_accountFileThumb`)
var _accountFileThumbPond = FilePond.create(_accountFileThumbEl)
_accountFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _accountFileThumb = file
    }
})


$('#_account_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _issue_date = $('input[name="_issue_date"]').val()
    var _url = $('input[name="_url"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/account';
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_accountFileMain.file != undefined) {
            fd.append('file_f', _accountFileMain.file)
        }
        if (_accountFileThumb.file != undefined) {
            fd.append('file_s', _accountFileThumb.file)
        }
    } else {
        postUrl = '/docs/editAccount';
        var _file = $('input[name="_file"]').val()
        var _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_accountFileMain.file != undefined) {
            if (_accountFileMain.file.name != _file) {
                fd.append('file_f', _accountFileMain.file)
            }
        }

        if (_accountFileThumb.file != undefined) {
            if (_accountFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _accountFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.status == "Success") {
            _show_notification("File Uploaded!");
            //  location.reload();
        } else {
            location.reload();
        }
    })
})

var _getAccountById = function (id, modalId) {
    $('._show_uploaded').html('');
    _accountFileMainPond.removeFile()
    _accountFileThumbPond.removeFile()
    axios.get(`/docs/account/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            var issue_final_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                issue_final_date = data.issue_date.split('T')[0]
            }
            $('input[name="_issue_date"]').val(issue_final_date)
            $('input[name="_url"]').val(data.url)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_accountFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _accountFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_accountFileThumbPond,'_thumbnail')">Remove</a>`
                        _accountFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}


var _removeAccountById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/account`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* Account */


/* Ads ======= */

var _adsFileMain = ''
var _adsFileMainEl = document.querySelector(`#_adsFileMain`)
var _adsFileMainPond = FilePond.create(_adsFileMainEl)
_adsFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _adsFileMain = file
    }
})

var _adsFileThumb = ''
var _adsFileThumbEl = document.querySelector(`#_adsFileThumb`)
var _adsFileThumbPond = FilePond.create(_adsFileThumbEl)
_adsFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _adsFileThumb = file
    }
})

var _adsModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _adsFileMainPond.removeFile()
    _adsFileThumbPond.removeFile()
}


var _getAdsById = function (id, modalId) {
    $('._show_uploaded').html('');
    _adsFileMainPond.removeFile()
    _adsFileThumbPond.removeFile()
    axios.get(`/docs/ads/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('input[name="_url"]').val(data.url)
            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_adsFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _adsFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_adsFileThumbPond,'_thumbnail')">Remove</a>`
                        _adsFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_ads_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _url = $('input[name="_url"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()

    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/ads';
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_adsFileMain.file != undefined) {
            fd.append('file_f', _adsFileMain.file)
        }
        if (_adsFileThumb.file != undefined) {
            fd.append('file_s', _adsFileThumb.file)
        }
    } else {
        postUrl = '/docs/editAds';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_adsFileMain.file != undefined) {
            if (_adsFileMain.file.name != _file) {
                fd.append('file_f', _adsFileMain.file)
            }
        }

        if (_adsFileThumb.file != undefined) {
            if (_adsFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _adsFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeAdsById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/ads`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Akshay Urja ======= */

var _akshayUrjaFileMain = ''
var _akshayUrjaFileMainEl = document.querySelector(`#_akshayUrjaFileMain`)
var _akshayUrjaFileMainPond = FilePond.create(_akshayUrjaFileMainEl)
_akshayUrjaFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _akshayUrjaFileMain = file
    }
})

var _akshayUrjaFileThumb = ''
var _akshayUrjaFileThumbEl = document.querySelector(`#_akshayUrjaFileThumb`)
var _akshayUrjaFileThumbPond = FilePond.create(_akshayUrjaFileThumbEl)
_akshayUrjaFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _akshayUrjaFileThumb = file
    }
})

var _akshayUrjaModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _akshayUrjaFileMainPond.removeFile()
    _akshayUrjaFileThumbPond.removeFile()
}


var _getAkshayUrjaById = function (id, modalId) {
    $('._show_uploaded').html('');
    _akshayUrjaFileMainPond.removeFile()
    _akshayUrjaFileThumbPond.removeFile()
    axios.get(`/docs/akshay-urja/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('input[name="_url"]').val(data.url)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_akshayUrjaFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _akshayUrjaFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)

                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_akshayUrjaFileThumbPond,'_thumbnail')">Remove</a>`
                        _akshayUrjaFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_ajshayurja_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _url = $('input[name="_url"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/akshay-urja';
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_akshayUrjaFileMain.file != undefined) {
            fd.append('file_f', _akshayUrjaFileMain.file)
        }
        if (_akshayUrjaFileThumb.file != undefined) {
            fd.append('file_s', _akshayUrjaFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-akshay-urja';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_adsFileMain.file != undefined) {
            if (_adsFileMain.file.name != _file) {
                fd.append('file_f', _akshayUrjaFileMain.file)
            }
        }

        if (_akshayUrjaFileThumb.file != undefined) {
            if (_akshayUrjaFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _akshayUrjaFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _removeAkshayUrjaById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/akshay-urja`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Annual Reports ======= */

var _annualReportsFileMain = ''
var _annualReportsFileMainEl = document.querySelector(`#_annualReportsFileMain`)
var _annualReportsFileMainPond = FilePond.create(_annualReportsFileMainEl)
_annualReportsFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _annualReportsFileMain = file
    }
})

var _annualReportsFileThumb = ''
var _annualReportsFileThumbEl = document.querySelector(`#_annualReportsFileThumb`)
var _annualReportsFileThumbPond = FilePond.create(_annualReportsFileThumbEl)
_annualReportsFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _annualReportsFileThumb = file
    }
})

var _annualReportsModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _annualReportsFileMainPond.removeFile()
    _annualReportsFileThumbPond.removeFile()
}

var _getAnnualReportsById = function (id, modalId) {
    $('._show_uploaded').html('');
    _annualReportsFileMainPond.removeFile()
    _annualReportsFileThumbPond.removeFile()
    axios.get(`/docs/annual-report/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('input[name="_url"]').val(data.url)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_annualReportsFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _annualReportsFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_annualReportsFileThumbPond,'_thumbnail')">Remove</a>`
                        _annualReportsFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_annualreports_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _url = $('input[name="_url"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/annual-report';
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_annualReportsFileMain.file != undefined) {
            fd.append('file_f', _annualReportsFileMain.file)
        }
        if (_annualReportsFileThumb.file != undefined) {
            fd.append('file_s', _annualReportsFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-annual-report';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_annualReportsFileMain.file != undefined) {
            if (_annualReportsFileMain.file.name != _file) {
                fd.append('file_f', _annualReportsFileMain.file)
            }
        }

        if (_annualReportsFileThumb.file != undefined) {
            if (_annualReportsFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _annualReportsFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeAnnualReportById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/annual-report`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Case Study ======= */

var _caseStudyFileMain = ''
var _caseStudyFileMainEl = document.querySelector(`#_caseStudyFileMain`)
var _caseStudyFileMainPond = FilePond.create(_caseStudyFileMainEl)
_caseStudyFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _caseStudyFileMain = file
    }
})

var _caseStudyFileThumb = ''
var _caseStudyFileThumbEl = document.querySelector(`#_caseStudyFileThumb`)
var _caseStudyFileThumbPond = FilePond.create(_caseStudyFileThumbEl)
_caseStudyFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _caseStudyFileThumb = file
    }
})

var _caseStudyModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _caseStudyFileMainPond.removeFile()
    _caseStudyFileThumbPond.removeFile()
}

var _getCaseStudyById = function (id, modalId) {
    $('._show_uploaded').html('');
    _caseStudyFileMainPond.removeFile()
    _caseStudyFileThumbPond.removeFile()
    axios.get(`/docs/case-study/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('input[name="_url"]').val(data.url)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category);

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_caseStudyFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _caseStudyFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_caseStudyFileThumbPond,'_thumbnail')">Remove</a>`
                        _caseStudyFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}


$('#_casestudy_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _url = $('input[name="_url"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/case-study';
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_caseStudyFileMain.file != undefined) {
            fd.append('file_f', _caseStudyFileMain.file)
        }
        if (_caseStudyFileThumb.file != undefined) {
            fd.append('file_s', _caseStudyFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-case-study';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_caseStudyFileMain.file != undefined) {
            if (_caseStudyFileMain.file.name != _file) {
                fd.append('file_f', _caseStudyFileMain.file)
            }
        }

        if (_caseStudyFileThumb.file != undefined) {
            if (_caseStudyFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _caseStudyFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            //location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeCaseStudyById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/case-study`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Circular ======= */

var _circularFileMain = ''
var _circularFileMainEl = document.querySelector(`#_circularFileMain`)
var _circularFileMainPond = FilePond.create(_circularFileMainEl)
_circularFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _circularFileMain = file
    }
})

var _circularFileThumb = ''
var _circularFileThumbEl = document.querySelector(`#_circularFileThumb`)
var _circularFileThumbPond = FilePond.create(_circularFileThumbEl)
_circularFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _circularFileThumb = file
    }
})

var _circularsModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _circularFileMainPond.removeFile()
    _circularFileThumbPond.removeFile()
}

var _getCircularById = function (id, modalId) {
    $('._show_uploaded').html('');
    _circularFileMainPond.removeFile()
    _circularFileThumbPond.removeFile()
    axios.get(`/docs/circular/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category);

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_circularFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _circularFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_circularFileThumbPond,'_thumbnail')">Remove</a>`
                        _circularFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}


$('#_circulars_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/circular';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_circularFileMain.file != undefined) {
            fd.append('file_f', _circularFileMain.file)
        }
        if (_circularFileThumb.file != undefined) {
            fd.append('file_s', _circularFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-circular';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_circularFileMain.file != undefined) {
            if (_circularFileMain.file.name != _file) {
                fd.append('file_f', _circularFileMain.file)
            }
        }

        if (_circularFileThumb.file != undefined) {
            if (_circularFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _circularFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeCircularById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/circular`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* Citizen ======= */

var _citizenFileMain = ''
var _citizenFileMainEl = document.querySelector(`#_citizenFileMain`)
var _citizenFileMainPond = FilePond.create(_citizenFileMainEl)
_citizenFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _citizenFileMain = file
    }
})

var _citizenFileThumb = ''
var _citizenFileThumbEl = document.querySelector(`#_citizenFileThumb`)
var _citizenFileThumbPond = FilePond.create(_citizenFileThumbEl)
_citizenFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _citizenFileThumb = file
    }
})

var _citizenModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _citizenFileMainPond.removeFile()
}

var _getCitizenById = function (id, modalId) {
    $('._show_uploaded').html('');
    _citizenFileMainPond.removeFile()
    axios.get(`/docs/citizen/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "document") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_citizenFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _citizenFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_citizenFileThumbPond,'_thumbnail')">Remove</a>`
                        _citizenFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_citizen_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/citizen';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_citizenFileMain.file != undefined) {
            fd.append('file_f', _citizenFileMain.file)
        }
        if (_citizenFileThumb.file != undefined) {
            fd.append('file_s', _citizenFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-citizen';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_citizenFileMain.file != undefined) {
            if (_citizenFileMain.file.name != _file) {
                fd.append('file_f', _citizenFileMain.file)
            }
        }
        if (_citizenFileThumb.file != undefined) {
            if (_citizenFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _citizenFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeCitizenById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/citizen`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Corrigendum ======= */

var _corrigendumFileMain = ''
var _corrigendumFileMainEl = document.querySelector(`#_corrigendumFileMain`)
var _corrigendumFileMainPond = FilePond.create(_corrigendumFileMainEl)
_corrigendumFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _corrigendumFileMain = file
    }
})


var _corrigendumModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _corrigendumFileMainPond.removeFile()
}

var _getCorrigendumById = function (id, modalId) {
    $('._show_uploaded').html('');
    _corrigendumFileMainPond.removeFile()
    axios.get(`/docs/corrigendum/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            var issue_final_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                issue_final_date = data.issue_date.split('T')[0]
            }
            $('input[name="_issue_date"]').val(issue_final_date)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_corrigendumFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _corrigendumFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}


$('#_corrigendum_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _issue_date = $('input[name="_issue_date"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/corrigendum';
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_corrigendumFileMain.file != undefined) {
            fd.append('file_f', _corrigendumFileMain.file)
        }

    } else {
        postUrl = '/docs/editCorrigendum';
        var _file = $('input[name="_file"]').val()

        // Check if image is changed or not
        if (_corrigendumFileMain.file != undefined) {
            if (_corrigendumFileMain.file.name != _file) {
                fd.append('file_f', _corrigendumFileMain.file)
            }
        }

        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.status == "success") {
            location.reload();
        } else {
            location.reload();
        }
    })
})

var _removeCorrigendumById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/corrigendum`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Current Notices */

var _currentNoticesFileMain = ''
var _currentNoticesFileMainEl = document.querySelector(`#_currentNoticesFileMain`)
var _currentNoticesFileMainPond = FilePond.create(_currentNoticesFileMainEl)
_currentNoticesFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _currentNoticesFileMain = file
    }
})


var currentNoticesModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _currentNoticesFileMainPond.removeFile()
}


var _getCurrentNoticesById = function (id, modalId) {
    $('._show_uploaded').html('');
    _currentNoticesFileMainPond.removeFile()
    axios.get(`/docs/current-notices/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            var issue_final_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                issue_final_date = data.issue_date.split('T')[0]
            }
            $('input[name="_issue_date"]').val(issue_final_date)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_currentNoticesFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _currentNoticesFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}


$('#_currentNotices_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _issue_date = $('input[name="_issue_date"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/current-notices';
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_currentNoticesFileMain.file != undefined) {
            fd.append('file_f', _currentNoticesFileMain.file)
        }

    } else {
        postUrl = '/docs/edit-current-notices';
        var _file = $('input[name="_file"]').val()

        // Check if image is changed or not
        if (_currentNoticesFileMain.file != undefined) {
            if (_currentNoticesFileMain.file.name != _file) {
                fd.append('file_f', _currentNoticesFileMain.file)
            }
        }

        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.status == "success") {
            location.reload();
        } else {
            location.reload();
        }
    })
})

var _removeCurrentNoticeById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.post(`/docs/remove-current-notice`, { id: id }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    // location.reload();
                }
            });
        }
    }
}


/* ENERGY map Data */

var _energyMapDataModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
}


$('#_energyData_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _energy = $('#_energy').val()
    var _state = $('#_state').val()
    var _value = $('input[name="_value"]').val()
    var _year = $('#_year').val()
    var _code = $('#_code').val()

    if (action_mode == 'add') {
        postUrl = '/docs/energy-data'
    } else {
        postUrl = '/docs/edit-energy-data'
    }
    axios.post(postUrl, {
        id: action_mode,
        energy: _energy,
        state: _state,
        value: _value,
        code: _code,
        year: _year
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _getEnergyDataById = function (id, modalId) {
    axios.get(`/docs/energy-data/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('#_energy').val(data.energy)
            $('#_state').val(data.state)
            $('input[name="_value"]').val(data.value)
            $('#_year').val(data.year)
            $('#_code').val(data.code)
        }
    });
}

var _removeEnergyDataById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/energy-data`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Events ===== */

var _eventsFileMain = ''
var _eventsFileMainEl = document.querySelector(`#_eventsFileMain`)
var _eventsFileMainPond = FilePond.create(_eventsFileMainEl)
_eventsFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _eventsFileMain = file
    }
})

var _eventsFileThumb = ''
var _eventsFileThumbEl = document.querySelector(`#_eventsFileThumb`)
var _eventsFileThumbPond = FilePond.create(_eventsFileThumbEl)
_eventsFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _eventsFileThumb = file
    }
})

var _eventsModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _eventsFileMainPond.removeFile()
    _eventsFileThumbPond.removeFile()
}

var _getEventById = function (id, modalId) {
    $('._show_uploaded').html('');
    _eventsFileMainPond.removeFile()
    _eventsFileThumbPond.removeFile()
    axios.get(`/docs/event/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            var issue_final_date = ''
            if (data.publish_date != '' && data.publish_date != null) {
                issue_final_date = data.publish_date.split('T')[0]
            }

            $('input[name="_issue_date"]').val(issue_final_date)
            $('input[name="_title"]').val(data.title)
            $('#_short_content').val(data.short_content)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_content').val(data.content)
            $('input[name="_author"]').val(data.author)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category);

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_content_hi').val(data.content_hi)

            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_eventsFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _eventsFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_eventsFileThumbPond,'_thumbnail')">Remove</a>`
                        _eventsFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}


$('#_events_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _issue_date = $('input[name="_issue_date"]').val()
    var _title = $('input[name="_title"]').val()
    var _short_content = $('#_short_content').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _content = $('#_content').val()
    var _author = $('input[name="_author"]').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _content_hi = $('#_content_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/event';
        fd.append('title', _title)
        fd.append('publish_date', _issue_date)
        fd.append('short_content', _short_content)
        fd.append('content', _content)
        fd.append('author', _author)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('category', _category)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('content_hi', _content_hi)
        if (_eventsFileMain.file != undefined) {
            fd.append('file_f', _eventsFileMain.file)
        }
        if (_eventsFileThumb.file != undefined) {
            fd.append('file_s', _eventsFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-event';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_eventsFileMain.file != undefined) {
            if (_eventsFileMain.file.name != _file) {
                fd.append('file_f', _eventsFileMain.file)
            }
        }

        if (_eventsFileThumb.file != undefined) {
            if (_eventsFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _eventsFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('publish_date', _issue_date)
        fd.append('short_content', _short_content)
        fd.append('content', _content)
        fd.append('author', _author)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('category', _category)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('content_hi', _content_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeEventById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/event`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}



/* FAQ ====== */

var _faqModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
}


$('#_faq_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _question = $('#_question').val()
    var _answer = $('#_answer').trumbowyg("html")

    if (action_mode == 'add') {
        postUrl = '/docs/faq'
    } else {
        postUrl = '/docs/edit-faq'
    }
    axios.post(postUrl, {
        id: action_mode,
        question: _question,
        answer: _answer
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _getFaqById = function (id, modalId) {
    axios.get(`/docs/faq/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('#_question').val(data.question)
            $('#_answer').trumbowyg("html", data.answer)
        }
    });
}

var _removeFaqById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/faq`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* Green ENergy ======= */

var _greenEnergyFileMain = ''
var _greenEnergyFileMainEl = document.querySelector(`#_greenEnergyFileMain`)
var _greenEnergyFileMainPond = FilePond.create(_greenEnergyFileMainEl)
_greenEnergyFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _greenEnergyFileMain = file
    }
})

var _greenEnergyFileThumb = ''
var _greenEnergyFileThumbEl = document.querySelector(`#_greenEnergyFileThumb`)
var _greenEnergyFileThumbPond = FilePond.create(_greenEnergyFileThumbEl)
_greenEnergyFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _greenEnergyFileThumb = file
    }
})

var _greenEnergyModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _greenEnergyFileMainPond.removeFile()
    _greenEnergyFileThumbPond.removeFile()
}


var _getGreenEnergyById = function (id, modalId) {
    $('._show_uploaded').html('');
    _greenEnergyFileMainPond.removeFile()
    _greenEnergyFileThumbPond.removeFile()
    axios.get(`/docs/green-energy/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            var issue_final_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                issue_final_date = data.issue_date.split('T')[0]
            }
            $('input[name="_issue_date"]').val(issue_final_date)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_greenEnergyFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _greenEnergyFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_greenEnergyFileThumbPond,'_thumbnail')">Remove</a>`
                        _greenEnergyFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_green-energy_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _issue_date = $('input[name="_issue_date"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/green-energy';
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_greenEnergyFileMain.file != undefined) {
            fd.append('file_f', _greenEnergyFileMain.file)
        }
        if (_greenEnergyFileThumb.file != undefined) {
            fd.append('file_s', _greenEnergyFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-green-energy';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_greenEnergyFileMain.file != undefined) {
            if (_greenEnergyFileMain.file.name != _file) {
                fd.append('file_f', _greenEnergyFileMain.file)
            }
        }

        if (_greenEnergyFileThumb.file != undefined) {
            if (_greenEnergyFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _greenEnergyFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _removeGreenEnergyById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/green-energy`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* Hrd ======= */

var _hrdFileMain = ''
var _hrdFileMainEl = document.querySelector(`#_hrdFileMain`)
var _hrdFileMainPond = FilePond.create(_hrdFileMainEl)
_hrdFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _hrdFileMain = file
    }
})

var _hrdModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _hrdFileMainPond.removeFile()
}


var _getHrdById = function (id, modalId) {
    $('._show_uploaded').html('');
    _hrdFileMainPond.removeFile()
    axios.get(`/docs/hrd/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_hrdFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _hrdFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_hrd_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/hrd';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_hrdFileMain.file != undefined) {
            fd.append('file_f', _hrdFileMain.file)
        }
    } else {
        postUrl = '/docs/edit-hrd';
        let _file = $('input[name="_file"]').val()
        // Check if image is changed or not
        if (_hrdFileMain.file != undefined) {
            if (_hrdFileMain.file.name != _file) {
                fd.append('file_f', _hrdFileMain.file)
            }
        }

        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _removeHrdById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/hrd`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* IG ======= */

var _igFileMain = ''
var _igFileMainEl = document.querySelector(`#_igFileMain`)
var _igFileMainPond = FilePond.create(_igFileMainEl)
_igFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _igFileMain = file
    }
})

var _igFileThumb = ''
var _igFileThumbEl = document.querySelector(`#_igFileThumb`)
var _igFileThumbPond = FilePond.create(_igFileThumbEl)
_igFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _igFileThumb = file
    }
})

var _igModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _igFileMainPond.removeFile()
    _igFileThumbPond.removeFile()
}


var _getIgById = function (id, modalId) {
    $('._show_uploaded').html('');
    _igFileMainPond.removeFile()
    _igFileThumbPond.removeFile()
    axios.get(`/docs/ig/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_igFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _igFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_igFileThumbPond,'_thumbnail')">Remove</a>`
                        _igFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_IG_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/ig';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_igFileMain.file != undefined) {
            fd.append('file_f', _igFileMain.file)
        }
        if (_igFileThumb.file != undefined) {
            fd.append('file_s', _igFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-ig';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_igFileMain.file != undefined) {
            if (_igFileMain.file.name != _file) {
                fd.append('file_f', _igFileMain.file)
            }
        }

        if (_igFileThumb.file != undefined) {
            if (_igFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _igFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeIgById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/ig`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* Initiative Achievements  ia ======= */

var _iaModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
}


$('#_ia_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('#_title').trumbowyg("html")
    var _column = $('#_column').val()

    if (action_mode == 'add') {
        postUrl = '/docs/ia'
    } else {
        postUrl = '/docs/edit-ia'
    }
    axios.post(postUrl, {
        id: action_mode,
        title: _title,
        column: _column
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _getIaById = function (id, modalId) {
    axios.get(`/docs/ia/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('#_column').val(data.column)
            $('#_title').trumbowyg("html", data.title)
        }
    });
}

var _removeIaById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/ia`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* IR ======= */

var _irFileMain = ''
var _irFileMainEl = document.querySelector(`#_irFileMain`)
var _irFileMainPond = FilePond.create(_irFileMainEl)
_irFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _irFileMain = file
    }
})

var _irFileThumb = ''
var _irFileThumbEl = document.querySelector(`#_irFileThumb`)
var _irFileThumbPond = FilePond.create(_irFileThumbEl)
_irFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _irFileThumb = file
    }
})

var _irModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _irFileMainPond.removeFile()
    _irFileThumbPond.removeFile()
}


var _getIrById = function (id, modalId) {
    $('._show_uploaded').html('');
    _irFileMainPond.removeFile()
    _irFileThumbPond.removeFile()
    axios.get(`/docs/ir/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('#_country').val(data.country)
            $('#_doctype').val(data.doctype)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_irFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _irFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_irFileThumbPond,'_thumbnail')">Remove</a>`
                        _irFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_ir_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();
    var _country = $('#_country').val();
    var _doctype = $('#_doctype').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/ir';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('country', _country)
        fd.append('doctype', _doctype)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_irFileMain.file != undefined) {
            fd.append('file_f', _irFileMain.file)
        }
        if (_irFileThumb.file != undefined) {
            fd.append('file_s', _irFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-ir';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_irFileMain.file != undefined) {
            if (_irFileMain.file.name != _file) {
                fd.append('file_f', _irFileMain.file)
            }
        }

        if (_irFileThumb.file != undefined) {
            if (_irFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _irFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('country', _country)
        fd.append('doctype', _doctype)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeIrById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/ir`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Lab Policy ======= */

var _labPolicyFileMain = ''
var _labPolicyFileMainEl = document.querySelector(`#_labPolicyFileMain`)
var _labPolicyFileMainPond = FilePond.create(_labPolicyFileMainEl)
_labPolicyFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _labPolicyFileMain = file
    }
})

var _labPolicyFileThumb = ''
var _labPolicyFileThumbEl = document.querySelector(`#_labPolicyFileThumb`)
var _labPolicyFileThumbPond = FilePond.create(_labPolicyFileThumbEl)
_labPolicyFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _labPolicyFileThumb = file
    }
})

var _labPolicyModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _labPolicyFileMainPond.removeFile()
    _labPolicyFileThumbPond.removeFile()
}


var _getLabPolicyById = function (id, modalId) {
    $('._show_uploaded').html('');
    _labPolicyFileMainPond.removeFile()
    _labPolicyFileThumbPond.removeFile()
    axios.get(`/docs/lab-policy/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('#_energy').val(data.energy)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_labPolicyFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _labPolicyFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_labPolicyFileThumbPond,'_thumbnail')">Remove</a>`
                        _labPolicyFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_lab-policy_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();
    var _energy = $('#_energy').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/lab-policy';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('energy', _energy)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_labPolicyFileMain.file != undefined) {
            fd.append('file_f', _labPolicyFileMain.file)
        }
        if (_labPolicyFileThumb.file != undefined) {
            fd.append('file_s', _labPolicyFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-lab-policy';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_labPolicyFileMain.file != undefined) {
            if (_labPolicyFileMain.file.name != _file) {
                fd.append('file_f', _labPolicyFileMain.file)
            }
        }

        if (_labPolicyFileThumb.file != undefined) {
            if (_labPolicyFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _labPolicyFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('energy', _energy)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeLabPolicyById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/lab-policy`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Manufacturer Lists ======= */

var _maufacturerFileMain = ''
var _maufacturerFileMainEl = document.querySelector(`#_maufacturerFileMain`)
var _maufacturerFileMainPond = FilePond.create(_maufacturerFileMainEl)
_maufacturerFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _maufacturerFileMain = file
    }
})

var _maufacturerFileThumb = ''
var _maufacturerFileThumbEl = document.querySelector(`#_maufacturerFileThumb`)
var _maufacturerFileThumbPond = FilePond.create(_maufacturerFileThumbEl)
_maufacturerFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _maufacturerFileThumb = file
    }
})

var _manufacturerModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _maufacturerFileMainPond.removeFile()
    _maufacturerFileThumbPond.removeFile()
}


var _getManufacturerById = function (id, modalId) {
    $('._show_uploaded').html('');
    _maufacturerFileMainPond.removeFile()
    _maufacturerFileThumbPond.removeFile()
    axios.get(`/docs/manufacturer/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_maufacturerFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _maufacturerFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_maufacturerFileThumbPond,'_thumbnail')">Remove</a>`
                        _maufacturerFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_manufacturer_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/manufacturer';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_maufacturerFileMain.file != undefined) {
            fd.append('file_f', _maufacturerFileMain.file)
        }
        if (_maufacturerFileThumb.file != undefined) {
            fd.append('file_s', _maufacturerFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-manufacturer';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_maufacturerFileMain.file != undefined) {
            if (_maufacturerFileMain.file.name != _file) {
                fd.append('file_f', _maufacturerFileMain.file)
            }
        }

        if (_maufacturerFileThumb.file != undefined) {
            if (_maufacturerFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _maufacturerFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeManufacturerById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/manufacturer`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Menu ======= */

var _menuModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
}


$('#_menu_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('#_title').val();
    var _overview = $('#_overview').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _url = $('#_url').val()
    if (action_mode == 'add') {
        postUrl = '/docs/menu'
    } else {
        postUrl = '/docs/edit-menu'
    }
    axios.post(postUrl, {
        id: action_mode,
        title: _title,
        overview: _overview,
        meta_keywords: _meta_keywords,
        url: _url
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _getMenuById = function (id, modalId) {
    axios.get(`/docs/menu/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('#_title').val(data.title);
            $('#_overview').val(data.overview)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_url').val(data.url)
        }
    });
}

var _removeMenuById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/menu`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* News ======= */

var _newsFileMain = ''
var _newsFileMainEl = document.querySelector(`#_newsFileMain`)
var _newsFileMainPond = FilePond.create(_newsFileMainEl)
_newsFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _newsFileMain = file
    }
})

var _newsFileThumb = ''
var _newsFileThumbEl = document.querySelector(`#_newsFileThumb`)
var _newsFileThumbPond = FilePond.create(_newsFileThumbEl)
_newsFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _newsFileThumb = file
    }
})

var _newsModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _newsFileMainPond.removeFile()
    _newsFileThumbPond.removeFile()
}


var _getNewsById = function (id, modalId) {
    $('._show_uploaded').html('');
    _newsFileMainPond.removeFile()
    _newsFileThumbPond.removeFile()
    axios.get(`/docs/news/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_short_content').val(data.short_content)
            $('#_content').val(data.content)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_author"]').val(data.author)
            var publish_date = ''
            if (data.publish_date != '' && data.publish_date != null) {
                publish_date = data.publish_date.split('T')[0]
            }
            $('input[name="_publish_date"]').val(publish_date)
            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_content_hi').val(data.content_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_newsFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _newsFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_newsFileThumbPond,'_thumbnail')">Remove</a>`
                        _newsFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_news_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _short_content = $('#_short_content').val()
    var _content = $('#_content').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _author = $('input[name="_author"]').val()
    var _category = $('#_category').val();
    var _publish_date = $('#_publish_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _content_hi = $('#_content_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/news';
        fd.append('title', _title)
        fd.append('short_content', _short_content)
        fd.append('content', _content)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('author', _author)
        fd.append('category', _category)
        fd.append('publish_date', _publish_date)
        fd.append('title_hi', _title_hi)
        fd.append('content_hi', _content_hi)
        if (_newsFileMain.file != undefined) {
            fd.append('file_f', _newsFileMain.file)
        }
        if (_newsFileThumb.file != undefined) {
            fd.append('file_s', _newsFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-news';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_newsFileMain.file != undefined) {
            if (_newsFileMain.file.name != _file) {
                fd.append('file_f', _newsFileMain.file)
            }
        }

        if (_newsFileThumb.file != undefined) {
            if (_newsFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _newsFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('short_content', _short_content)
        fd.append('content', _content)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('author', _author)
        fd.append('category', _category)
        fd.append('publish_date', _publish_date)
        fd.append('title_hi', _title_hi)
        fd.append('content_hi', _content_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeNewsById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/news`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Notification ======= */

var _notificationFileMain = ''
var _notificationFileMainEl = document.querySelector(`#_notificationFileMain`)
var _notificationFileMainPond = FilePond.create(_notificationFileMainEl)
_notificationFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _notificationFileMain = file
    }
})

var _notificationFileThumb = ''
var _notificationFileThumbEl = document.querySelector(`#_notificationFileThumb`)
var _notificationFileThumbPond = FilePond.create(_notificationFileThumbEl)
_notificationFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _notificationFileThumb = file
    }
})

var _notificationModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _notificationFileMainPond.removeFile()
    _notificationFileThumbPond.removeFile()
}


var _getNotificationById = function (id, modalId) {
    $('._show_uploaded').html('');
    _notificationFileMainPond.removeFile()
    _notificationFileThumbPond.removeFile()
    axios.get(`/docs/notification/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)

            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_notificationFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _notificationFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_notificationFileThumbPond,'_thumbnail')">Remove</a>`
                        _notificationFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_notification_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _category = $('#_category').val();
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/notification';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('category', _category)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_notificationFileMain.file != undefined) {
            fd.append('file_f', _notificationFileMain.file)
        }
        if (_notificationFileThumb.file != undefined) {
            fd.append('file_s', _notificationFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-notification';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_notificationFileMain.file != undefined) {
            if (_notificationFileMain.file.name != _file) {
                fd.append('file_f', _notificationFileMain.file)
            }
        }

        if (_notificationFileThumb.file != undefined) {
            if (_notificationFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _notificationFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('category', _category)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeNotificationById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/notification`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* Office Memorandoms ======= */

var _officeMemoFileMain = ''
var _officeMemoFileMainEl = document.querySelector(`#_officeMemoFileMain`)
var _officeMemoFileMainPond = FilePond.create(_officeMemoFileMainEl)
_officeMemoFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _officeMemoFileMain = file
    }
})

var _officeMemoFileThumb = ''
var _officeMemoFileThumbEl = document.querySelector(`#_officeMemoFileThumb`)
var _officeMemoFileThumbPond = FilePond.create(_officeMemoFileThumbEl)
_officeMemoFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _officeMemoFileThumb = file
    }
})

var _officeMemoModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _officeMemoFileMainPond.removeFile()
    _officeMemoFileThumbPond.removeFile()
}


var _getOfficeMemoById = function (id, modalId) {
    $('._show_uploaded').html('');
    _officeMemoFileMainPond.removeFile()
    _officeMemoFileThumbPond.removeFile()
    axios.get(`/docs/office-memorandom/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)

            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_officeMemoFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _officeMemoFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_officeMemoFileThumbPond,'_thumbnail')">Remove</a>`
                        _officeMemoFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_office-memorandom_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/office-memorandom';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_officeMemoFileMain.file != undefined) {
            fd.append('file_f', _officeMemoFileMain.file)
        }
        if (_officeMemoFileThumb.file != undefined) {
            fd.append('file_s', _officeMemoFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-office-memorandom';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_officeMemoFileMain.file != undefined) {
            if (_officeMemoFileMain.file.name != _file) {
                fd.append('file_f', _officeMemoFileMain.file)
            }
        }

        if (_officeMemoFileThumb.file != undefined) {
            if (_officeMemoFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _officeMemoFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeOfficeMemoById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/office-memorandom`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Office Orders ======= */

var _officeOrderFileMain = ''
var _officeOrderFileMainEl = document.querySelector(`#_officeOrderFileMain`)
var _officeOrderFileMainPond = FilePond.create(_officeOrderFileMainEl)
_officeOrderFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _officeOrderFileMain = file
    }
})

var _officeOrderFileThumb = ''
var _officeOrderFileThumbEl = document.querySelector(`#_officeOrderFileThumb`)
var _officeOrderFileThumbPond = FilePond.create(_officeOrderFileThumbEl)
_officeOrderFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _officeOrderFileThumb = file
    }
})

var _officeOrderModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _officeOrderFileMainPond.removeFile()
    _officeOrderFileThumbPond.removeFile()
}


var _getOfficeOrderById = function (id, modalId) {
    $('._show_uploaded').html('');
    _officeOrderFileMainPond.removeFile()
    _officeOrderFileThumbPond.removeFile()
    axios.get(`/docs/office-order/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)

            $('#_description').val(data.description)
            $('#_category').val(data.category);
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_officeOrderFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _officeOrderFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_officeOrderFileThumbPond,'_thumbnail')">Remove</a>`
                        _officeOrderFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_office-order_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/office-order';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_officeOrderFileMain.file != undefined) {
            fd.append('file_f', _officeOrderFileMain.file)
        }
        if (_officeOrderFileThumb.file != undefined) {
            fd.append('file_s', _officeOrderFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-office-order';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_officeOrderFileMain.file != undefined) {
            if (_officeOrderFileMain.file.name != _file) {
                fd.append('file_f', _officeOrderFileMain.file)
            }
        }

        if (_officeOrderFileThumb.file != undefined) {
            if (_officeOrderFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _officeOrderFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeOfficeOrderById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/office-order`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}



/* Organograms======= */

var _organogramFileMain = ''
var _organogramFileMainEl = document.querySelector(`#_organogramFileMain`)
var _organogramFileMainPond = FilePond.create(_organogramFileMainEl)
_organogramFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _organogramFileMain = file
    }
})


var _organogramModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _organogramFileMainPond.removeFile()
}


var _getOrganogramById = function (id, modalId) {
    $('._show_uploaded').html('');
    _organogramFileMainPond.removeFile()
    axios.get(`/docs/organogram/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_prefix"]').val(data.prefix)
            $('input[name="_name"]').val(data.name)
            $('input[name="_designation"]').val(data.designation)
            $('input[name="_phone_residence"]').val(data.phone_residence)
            $('input[name="_fax"]').val(data.fax_number)
            $('input[name="_facebook"]').val(data.social_facebook)
            $('input[name="_twitter"]').val(data.social_twitter)
            $('input[name="_linkedin"]').val(data.social_linkedin)
            $('input[name="_website"]').val(data.social_website)
            $('input[name="_email"]').val(data.email)
            $('input[name="_phone_office"]').val(data.phone_office)
            $('input[name="_mobile"]').val(data.mobile)
            $('input[name="_department"]').val(data.department)
            $('#_category').val(data.new_category);
            $('#_programmes').val(data.programmes);

            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "image") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_organogramFileMainPond,'_image')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _organogramFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)
                    }
                }
            }
        }
    });
}

$('#_organogram_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()

    var _prefix = $('input[name="_prefix"]').val()
    var _name = $('input[name="_name"]').val()
    var _designation = $('input[name="_designation"]').val()
    var _phone_residence = $('input[name="_phone_residence"]').val()
    var _fax = $('input[name="_fax"]').val()
    var _facebook = $('input[name="_facebook"]').val()
    var _twitter = $('input[name="_twitter"]').val()
    var _linkedin = $('input[name="_linkedin"]').val()
    var _website = $('input[name="_website"]').val()
    var _email = $('input[name="_email"]').val()
    var _phone_office = $('input[name="_phone_office"]').val()
    var _mobile = $('input[name="_mobile"]').val()
    var _department = $('input[name="_department"]').val()
    var _category = $('#_category').val();
    var _programmes = $('#_programmes').val();

    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/organogram';
        fd.append('prefix', _prefix)
        fd.append('name', _name)
        fd.append('designation', _designation)
        fd.append('new_category', _category)
        fd.append('programmes', _programmes)
        fd.append('phone_residence', _phone_residence)
        fd.append('fax_number', _fax)
        fd.append('social_facebook', _facebook)
        fd.append('social_twitter', _twitter)
        fd.append('social_linkedin', _linkedin)
        fd.append('social_website', _website)
        fd.append('email', _email)
        fd.append('phone_office', _phone_office)
        fd.append('mobile', _mobile)
        fd.append('department', _department)

        if (_organogramFileMain.file != undefined) {
            fd.append('file_f', _organogramFileMain.file)
        }
    } else {
        postUrl = '/docs/edit-organogram';
        let _file = $('input[name="_file"]').val()

        // Check if image is changed or not
        if (_organogramFileMain.file != undefined) {
            if (_organogramFileMain.file.name != _file) {
                fd.append('file_f', _organogramFileMain.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('prefix', _prefix)
        fd.append('name', _name)
        fd.append('designation', _designation)
        fd.append('new_category', _category)
        fd.append('programmes', _programmes)
        fd.append('phone_residence', _phone_residence)
        fd.append('fax_number', _fax)
        fd.append('social_facebook', _facebook)
        fd.append('social_twitter', _twitter)
        fd.append('social_linkedin', _linkedin)
        fd.append('social_website', _website)
        fd.append('email', _email)
        fd.append('phone_office', _phone_office)
        fd.append('mobile', _mobile)
        fd.append('department', _department)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            setTimeout(() => {
                location.reload();
            }, 100);
        } else {
            alert('Error');
        }
    })
})


var _removeOrganogramById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/organogram`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Office Orders ======= */

var _parliamentQuestionFileMain = ''
var _parliamentQuestionFileMainEl = document.querySelector(`#_parliamentQuestionFileMain`)
var _parliamentQuestionFileMainPond = FilePond.create(_parliamentQuestionFileMainEl)
_parliamentQuestionFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _parliamentQuestionFileMain = file
    }
})

var _parliamentQuestionModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _parliamentQuestionFileMainPond.removeFile()
}


var _getParliamentQuestionById = function (id, modalId) {
    $('._show_uploaded').html('');
    _parliamentQuestionFileMainPond.removeFile()

    axios.get(`/docs/parliament-question/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)

            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_parliamentQuestionFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _parliamentQuestionFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_parliament-question_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/parliament-question';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_parliamentQuestionFileMain.file != undefined) {
            fd.append('file_f', _parliamentQuestionFileMain.file)
        }

    } else {
        postUrl = '/docs/edit-parliament-question';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_parliamentQuestionFileMain.file != undefined) {
            if (_parliamentQuestionFileMain.file.name != _file) {
                fd.append('file_f', _parliamentQuestionFileMain.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeParliamentQuestionById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/parliament-question`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* PIDPIS ======= */

var _pidpiFileMain = ''
var _pidpiFileMainEl = document.querySelector(`#_pidpiFileMain`)
var _pidpiFileMainPond = FilePond.create(_pidpiFileMainEl)
_pidpiFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _pidpiFileMain = file
    }
})

var _pidpiFileThumb = ''
var _pidpiFileThumbEl = document.querySelector(`#_pidpiFileThumb`)
var _pidpiFileThumbPond = FilePond.create(_pidpiFileThumbEl)
_pidpiFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _pidpiFileThumb = file
    }
})

var _pidpiModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _pidpiFileMainPond.removeFile()
    _pidpiFileThumbPond.removeFile()
}


var _getPidpiById = function (id, modalId) {
    $('._show_uploaded').html('');
    _pidpiFileMainPond.removeFile()
    _pidpiFileThumbPond.removeFile()
    axios.get(`/docs/pidpi/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_pidpiFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _pidpiFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_pidpiFileThumbPond,'_thumbnail')">Remove</a>`
                        _pidpiFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_pidpi_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/pidpi';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_pidpiFileMain.file != undefined) {
            fd.append('file_f', _pidpiFileMain.file)
        }
        if (_pidpiFileThumb.file != undefined) {
            fd.append('file_s', _pidpiFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-pidpi';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_pidpiFileMain.file != undefined) {
            if (_pidpiFileMain.file.name != _file) {
                fd.append('file_f', _pidpiFileMain.file)
            }
        }

        if (_pidpiFileThumb.file != undefined) {
            if (_pidpiFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _pidpiFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removePidpiById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/pidpi`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Policy Documents ======= */

var _policysFileMain = ''
var _policysFileMainEl = document.querySelector(`#_policysFileMain`)
var _policysFileMainPond = FilePond.create(_policysFileMainEl)
_policysFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _policysFileMain = file
    }
})

var _policysFileThumb = ''
var _policysFileThumbEl = document.querySelector(`#_policysFileThumb`)
var _policysFileThumbPond = FilePond.create(_policysFileThumbEl)
_policysFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _policysFileThumb = file
    }
})

var _policysModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _policysFileMainPond.removeFile()
    _policysFileThumbPond.removeFile()
}


var _getPolicysById = function (id, modalId) {
    $('._show_uploaded').html('');
    _policysFileMainPond.removeFile()
    _policysFileThumbPond.removeFile()
    axios.get(`/docs/policy/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)
            $('#_effective_date').val(data.effective_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_policysFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _policysFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_policysFileThumbPond,'_thumbnail')">Remove</a>`
                        _policysFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_policys_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()
    var _effective_date = $('#_effective_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/policy';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('effective_date', _effective_date)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_policysFileMain.file != undefined) {
            fd.append('file_f', _policysFileMain.file)
        }
        if (_policysFileThumb.file != undefined) {
            fd.append('file_s', _policysFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-policy';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_policysFileMain.file != undefined) {
            if (_policysFileMain.file.name != _file) {
                fd.append('file_f', _policysFileMain.file)
            }
        }

        if (_policysFileThumb.file != undefined) {
            if (_policysFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _policysFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('effective_date', _effective_date)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removePolicyById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/policy`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Presentation ======= */

var _presentationFileMain = ''
var _presentationFileMainEl = document.querySelector(`#_presentationFileMain`)
var _presentationFileMainPond = FilePond.create(_presentationFileMainEl)
_presentationFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _presentationFileMain = file
    }
})

var _presentationFileThumb = ''
var _presentationFileThumbEl = document.querySelector(`#_presentationFileThumb`)
var _presentationFileThumbPond = FilePond.create(_presentationFileThumbEl)
_presentationFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _presentationFileThumb = file
    }
})

var _presentationModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _presentationFileMainPond.removeFile()
    _presentationFileThumbPond.removeFile()
}


var _getPresentationById = function (id, modalId) {
    $('._show_uploaded').html('');
    _presentationFileMainPond.removeFile()
    _presentationFileThumbPond.removeFile()
    axios.get(`/docs/presentation/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.date != '' && data.date != null) {
                publish_date = data.date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_presentationFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _presentationFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_presentationFileThumbPond,'_thumbnail')">Remove</a>`
                        _presentationFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_presentation_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/presentation';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_presentationFileMain.file != undefined) {
            fd.append('file_f', _presentationFileMain.file)
        }
        if (_presentationFileThumb.file != undefined) {
            fd.append('file_s', _presentationFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-presentation';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_presentationFileMain.file != undefined) {
            if (_presentationFileMain.file.name != _file) {
                fd.append('file_f', _presentationFileMain.file)
            }
        }

        if (_presentationFileThumb.file != undefined) {
            if (_presentationFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _presentationFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removePresentationById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/presentation`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* Recruitment ======= */

var _recruitmentFileMain = ''
var _recruitmentFileMainEl = document.querySelector(`#_recruitmentFileMain`)
var _recruitmentFileMainPond = FilePond.create(_recruitmentFileMainEl)
_recruitmentFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _recruitmentFileMain = file
    }
})

var _recruitmentFileThumb = ''
var _recruitmentFileThumbEl = document.querySelector(`#_recruitmentFileThumb`)
var _recruitmentFileThumbPond = FilePond.create(_recruitmentFileThumbEl)
_recruitmentFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _recruitmentFileThumb = file
    }
})

var _recruitmentModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _recruitmentFileMainPond.removeFile()
    _recruitmentFileThumbPond.removeFile()
}


var _getRecruitmentById = function (id, modalId) {
    $('._show_uploaded').html('');
    _recruitmentFileMainPond.removeFile()
    _recruitmentFileThumbPond.removeFile()
    axios.get(`/docs/recruitment/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.date != '' && data.date != null) {
                publish_date = data.date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_recruitmentFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _recruitmentFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_recruitmentFileThumbPond,'_thumbnail')">Remove</a>`
                        _recruitmentFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_recruitment_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/recruitment';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_recruitmentFileMain.file != undefined) {
            fd.append('file_f', _recruitmentFileMain.file)
        }
        if (_recruitmentFileThumb.file != undefined) {
            fd.append('file_s', _recruitmentFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-recruitment';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_recruitmentFileMain.file != undefined) {
            if (_recruitmentFileMain.file.name != _file) {
                fd.append('file_f', _recruitmentFileMain.file)
            }
        }

        if (_recruitmentFileThumb.file != undefined) {
            if (_recruitmentFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _recruitmentFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeRecruitmentById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/recruitment`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}



/* Reports ======= */

var _reportFileMain = ''
var _reportFileMainEl = document.querySelector(`#_reportFileMain`)
var _reportFileMainPond = FilePond.create(_reportFileMainEl)
_reportFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _reportFileMain = file
    }
})

var _reportFileThumb = ''
var _reportFileThumbEl = document.querySelector(`#_reportFileThumb`)
var _reportFileThumbPond = FilePond.create(_reportFileThumbEl)
_reportFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _reportFileThumb = file
    }
})

var _reportModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _reportFileMainPond.removeFile()
    _reportFileThumbPond.removeFile()
}


var _getReportById = function (id, modalId) {
    $('._show_uploaded').html('');
    _reportFileMainPond.removeFile()
    _reportFileThumbPond.removeFile()
    axios.get(`/docs/report/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.date != '' && data.date != null) {
                publish_date = data.date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_reportFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _reportFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_reportFileThumbPond,'_thumbnail')">Remove</a>`
                        _reportFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_report_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/report';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_reportFileMain.file != undefined) {
            fd.append('file_f', _reportFileMain.file)
        }
        if (_reportFileThumb.file != undefined) {
            fd.append('file_s', _reportFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-report';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_reportFileMain.file != undefined) {
            if (_reportFileMain.file.name != _file) {
                fd.append('file_f', _reportFileMain.file)
            }
        }

        if (_reportFileThumb.file != undefined) {
            if (_reportFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _reportFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeReportById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/report`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* R&D ======= */

var _rndFileMain = ''
var _rndFileMainEl = document.querySelector(`#_rndFileMain`)
var _rndFileMainPond = FilePond.create(_rndFileMainEl)
_rndFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _rndFileMain = file
    }
})

var _rndFileThumb = ''
var _rndFileThumbEl = document.querySelector(`#_rndFileThumb`)
var _rndFileThumbPond = FilePond.create(_rndFileThumbEl)
_rndFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _rndFileThumb = file
    }
})

var _rndModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _rndFileMainPond.removeFile()
    _rndFileThumbPond.removeFile()
}


var _getRndById = function (id, modalId) {
    $('._show_uploaded').html('');
    _rndFileMainPond.removeFile()
    _rndFileThumbPond.removeFile()
    axios.get(`/docs/rnd/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_rndFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _rndFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_rndFileThumbPond,'_thumbnail')">Remove</a>`
                        _rndFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_rnd_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/rnd';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_rndFileMain.file != undefined) {
            fd.append('file_f', _rndFileMain.file)
        }
        if (_rndFileThumb.file != undefined) {
            fd.append('file_s', _rndFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-rnd';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_rndFileMain.file != undefined) {
            if (_rndFileMain.file.name != _file) {
                fd.append('file_f', _rndFileMain.file)
            }
        }

        if (_rndFileThumb.file != undefined) {
            if (_rndFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _rndFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeRndById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/rnd`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* RFD ======= */

var _rfdFileMain = ''
var _rfdFileMainEl = document.querySelector(`#_rfdFileMain`)
var _rfdFileMainPond = FilePond.create(_rfdFileMainEl)
_rfdFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _rfdFileMain = file
    }
})

var _rfdFileThumb = ''
var _rfdFileThumbEl = document.querySelector(`#_rfdFileThumb`)
var _rfdFileThumbPond = FilePond.create(_rfdFileThumbEl)
_rfdFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _rfdFileThumb = file
    }
})

var _rfdModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _rfdFileMainPond.removeFile()
    _rfdFileThumbPond.removeFile()
}


var _getRfdById = function (id, modalId) {
    $('._show_uploaded').html('');
    _rfdFileMainPond.removeFile()
    _rfdFileThumbPond.removeFile()
    axios.get(`/docs/rfd/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_rfdFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _rfdFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)

                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_rfdFileThumbPond,'_thumbnail')">Remove</a>`
                        _rfdFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_rfd_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/rfd';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_rfdFileMain.file != undefined) {
            fd.append('file_f', _rfdFileMain.file)
        }
        if (_rfdFileThumb.file != undefined) {
            fd.append('file_s', _rfdFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-rfd';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_rfdFileMain.file != undefined) {
            if (_rfdFileMain.file.name != _file) {
                fd.append('file_f', _rfdFileMain.file)
            }
        }

        if (_rfdFileThumb.file != undefined) {
            if (_rfdFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _rfdFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeRfdById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/rfd`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* SCHEME DOCUMENTS  ======= */

var _schemeFileMain = ''
var _schemeFileMainEl = document.querySelector(`#_schemeFileMain`)
var _schemeFileMainPond = FilePond.create(_schemeFileMainEl)
_schemeFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _schemeFileMain = file
    }
})

var _schemeFileThumb = ''
var _schemeFileThumbEl = document.querySelector(`#_schemeFileThumb`)
var _schemeFileThumbPond = FilePond.create(_schemeFileThumbEl)
_schemeFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _schemeFileThumb = file
    }
})

var _schemeModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _schemeFileMainPond.removeFile()
    _schemeFileThumbPond.removeFile()
}


var _getSchemeById = function (id, modalId) {
    $('._show_uploaded').html('');
    _schemeFileMainPond.removeFile()
    _schemeFileThumbPond.removeFile()
    axios.get(`/docs/scheme/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)
            $('#_effective_date').val(data.effective_date)
            $('#_doctype').val(data.doctype)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_schemeFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _schemeFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_schemeFileThumbPond,'_thumbnail')">Remove</a>`
                        _schemeFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_scheme_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()
    var _effective_date = $('#_effective_date').val()
    var _doctype = $('#_doctype').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/scheme';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('effective_date', _effective_date)
        fd.append('dcotype', _doctype)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_schemeFileMain.file != undefined) {
            fd.append('file_f', _schemeFileMain.file)
        }
        if (_schemeFileThumb.file != undefined) {
            fd.append('file_s', _schemeFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-scheme';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_schemeFileMain.file != undefined) {
            if (_schemeFileMain.file.name != _file) {
                fd.append('file_f', _schemeFileMain.file)
            }
        }

        if (_schemeFileThumb.file != undefined) {
            if (_schemeFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _schemeFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('effective_date', _effective_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('dcotype', _doctype)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeSchemeById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/scheme`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* SOlar map Data */

var _solarDataModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
}


$('#_solarData_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var lantern_lamp = $('#lantern_lamp').val()
    var home_light = $('#home_light').val()
    var street_light = $('#street_light').val()
    var pump = $('#pump').val()
    var standalone = $('#standalone').val()
    var _year = $('#_year').val()
    if (action_mode == 'add') {
        postUrl = '/docs/solar-data'
    } else {
        postUrl = '/docs/edit-solar-data'
    }
    axios.post(postUrl, {
        id: action_mode,
        lantern_lamp: lantern_lamp,
        home_light: home_light,
        street_light: street_light,
        pump: pump,
        standalone: standalone,
        year: _year
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})

var _getSolarDataById = function (id, modalId) {
    axios.get(`/docs/solar-data/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('#lantern_lamp').val(data.lantern_lamp)
            $('#home_light').val(data.home_light)
            $('#street_light').val(data.street_light)
            $('#pump').val(data.pump)
            $('#standalone').val(data.standalone)
            $('#_year').val(data.year)
        }
    });
}

var _removeSolarDataById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/solar-data`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* TENDER DOCUMENTS  ======= */

var _tenderFileMain = ''
var _tenderFileMainEl = document.querySelector(`#_tenderFileMain`)
var _tenderFileMainPond = FilePond.create(_tenderFileMainEl)
_tenderFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _tenderFileMain = file
    }
})

var _tenderFileThumb = ''
var _tenderFileThumbEl = document.querySelector(`#_tenderFileThumb`)
var _tenderFileThumbPond = FilePond.create(_tenderFileThumbEl)
_tenderFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _tenderFileThumb = file
    }
})

var _tenderModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _tenderFileMainPond.removeFile()
    _tenderFileThumbPond.removeFile()
}


var _getTenderById = function (id, modalId) {
    $('._show_uploaded').html('');
    _tenderFileMainPond.removeFile()
    _tenderFileThumbPond.removeFile()
    axios.get(`/docs/tender/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)
            var publish_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                publish_date = data.issue_date.split('T')[0]
            }
            $('#_issue_date').val(publish_date)
            $('#_submission_date').val(data.submission_date)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_tenderFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _tenderFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_tenderFileThumbPond,'_thumbnail')">Remove</a>`
                        _tenderFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_tender_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _issue_date = $('#_issue_date').val()
    var _submission_date = $('#_submission_date').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/tender';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('submission_date', _submission_date)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_tenderFileMain.file != undefined) {
            fd.append('file_f', _tenderFileMain.file)
        }
        if (_tenderFileThumb.file != undefined) {
            fd.append('file_s', _tenderFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-tender';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_tenderFileMain.file != undefined) {
            if (_tenderFileMain.file.name != _file) {
                fd.append('file_f', _tenderFileMain.file)
            }
        }

        if (_tenderFileThumb.file != undefined) {
            if (_tenderFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _tenderFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('issue_date', _issue_date)
        fd.append('submission_date', _submission_date)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeTenderById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/tender`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* VACANCY DOCUMENTS  ======= */

var _vacancyFileMain = ''
var _vacancyFileMainEl = document.querySelector(`#_vacancyFileMain`)
var _vacancyFileMainPond = FilePond.create(_vacancyFileMainEl)
_vacancyFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _vacancyFileMain = file
    }
})


var _vacancyModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _vacancyFileMainPond.removeFile()
}


var _getVacancyById = function (id, modalId) {
    $('._show_uploaded').html('');
    _vacancyFileMainPond.removeFile()
    axios.get(`/docs/vacancy/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "Document") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_vacancyFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _vacancyFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_vacancy_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/vacancy';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_vacancyFileMain.file != undefined) {
            fd.append('file_f', _vacancyFileMain.file)
        }

    } else {
        postUrl = '/docs/edit-vacancy';
        let _file = $('input[name="_file"]').val()
        // Check if image is changed or not
        if (_vacancyFileMain.file != undefined) {
            if (_vacancyFileMain.file.name != _file) {
                fd.append('file_f', _vacancyFileMain.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeVacancyById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/vacancy`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* VIDEO E LEARNING  ======= */

var _eLearningFileMain = ''
var _eLearningFileMainEl = document.querySelector(`#_eLearningFileMain`)
var _eLearningFileMainPond = FilePond.create(_eLearningFileMainEl)
_eLearningFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _eLearningFileMain = file
    }
})

var _eLearningFileThumb = ''
var _eLearningFileThumbEl = document.querySelector(`#_eLearningFileThumb`)
var _eLearningFileThumbPond = FilePond.create(_eLearningFileThumbEl)
_eLearningFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _eLearningFileThumb = file
    }
})

var _videoLearningModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _eLearningFileMainPond.removeFile()
    _eLearningFileThumbPond.removeFile()
}


var _getVideoLearningById = function (id, modalId) {
    $('._show_uploaded').html('');
    _eLearningFileMainPond.removeFile()
    _eLearningFileThumbPond.removeFile()
    axios.get(`/docs/videos-e/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_eLearningFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _eLearningFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_eLearningFileThumbPond,'_thumbnail')">Remove</a>`
                        _eLearningFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_elearning_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/videos-e';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_eLearningFileMain.file != undefined) {
            fd.append('file_f', _eLearningFileMain.file)
        }
        if (_eLearningFileThumb.file != undefined) {
            fd.append('file_s', _eLearningFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-videos-e';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_eLearningFileMain.file != undefined) {
            if (_eLearningFileMain.file.name != _file) {
                fd.append('file_f', _eLearningFileMain.file)
            }
        }

        if (_eLearningFileThumb.file != undefined) {
            if (_eLearningFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _eLearningFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeVideoLearningById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/videos-e`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}



/* VIDEO  ======= */

var _videoFileMain = ''
var _videoFileMainEl = document.querySelector(`#_videoFileMain`)
var _videoFileMainPond = FilePond.create(_videoFileMainEl)
_videoFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _videoFileMain = file
    }
})

var _videoFileThumb = ''
var _videoFileThumbEl = document.querySelector(`#_videoFileThumb`)
var _videoFileThumbPond = FilePond.create(_videoFileThumbEl)
_videoFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _videoFileThumb = file
    }
})

var _videoModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');

    $('._show_uploaded').html('');
    _videoFileMainPond.removeFile()
    _videoFileThumbPond.removeFile()
}


var _getVideoById = function (id, modalId) {
    $('._show_uploaded').html('');
    _videoFileMainPond.removeFile()
    _videoFileThumbPond.removeFile()
    axios.get(`/docs/video/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('input[name="_ordering"]').val(data.ordering)
            $('#_category').val(data.category)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_videoFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _videoFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_videoFileThumbPond,'_thumbnail')">Remove</a>`
                        _videoFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_video_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _category = $('#_category').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/video';
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_videoFileMain.file != undefined) {
            fd.append('file_f', _videoFileMain.file)
        }
        if (_videoFileThumb.file != undefined) {
            fd.append('file_s', _videoFileThumb.file)
        }
    } else {
        postUrl = '/docs/edit-video';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_videoFileMain.file != undefined) {
            if (_videoFileMain.file.name != _file) {
                fd.append('file_f', _videoFileMain.file)
            }
        }

        if (_videoFileThumb.file != undefined) {
            if (_videoFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _videoFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('ordering', _ordering)
        fd.append('category', _category)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removeVideoById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/video`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}


/* REMOVE UPLOAD FILE AND ROW */

var _removeUpload = function (id, pondRef, type) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        axios.delete(`/docs/removeUploads`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
            if (data.response == "success") {
                pondRef.removeFile();
                $(`input[name="${type}"]`).val('')
                $(`.${type}`).find('._show_uploaded').html("");
            } else if (data.response == "notexist") {
                alert('File not exist');
            } else {
                alert('Failed to delete file');
            }
        });
    }
}


$(document).on('click', '._reviewAction', function () {
    let checked = $(this).is(':checked')
    let id = $(this).attr('data-id')
    $(this).parent().removeClass('_true')
    $(this).parent().removeClass('_false')
    axios.post('/docs/reviewed', {
        id: id,
        mode: checked
    }).then(response => response.data).catch(error => console.log(error)).then(data => {
        if (data.response == "success") {
            if (data.mode) {
                $(this).parent().addClass(`_${data.mode}`)
            } else {
                $(this).parent().addClass(`_${data.mode}`)
            }
        } else {
            alert('Error');
        }
    })
})


/* Vigilance ======= */

var _vigilanceFileMain = ''
var _vigilanceFileMainEl = document.querySelector(`#_vigilanceFileMain`)
var _vigilanceFileMainPond = FilePond.create(_vigilanceFileMainEl)
_vigilanceFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _vigilanceFileMain = file
    }
})


var _vigilanceModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _vigilanceFileMainPond.removeFile()
}

var _getVigilanceById = function (id, modalId) {
    $('._show_uploaded').html('');
    _vigilanceFileMainPond.removeFile()
    axios.get(`/docs/vigilance/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            var issue_final_date = ''
            if (data.issue_date != '' && data.issue_date != null) {
                issue_final_date = data.issue_date.split('T')[0]
            }
            $('input[name="_issue_date"]').val(issue_final_date)
            $('#_description').val(data.description)
            $('#_meta_keywords').val(data.meta_keywords)
            $('#_year').val(data.year)
            $('input[name="_ordering"]').val(data.ordering)

            $('input[name="_title_hi"]').val(data.title_hi)
            $('#_description_hi').val(data.description_hi)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_vigilanceFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _vigilanceFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}


$('#_vigilance_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _issue_date = $('input[name="_issue_date"]').val()
    var _description = $('#_description').val()
    var _meta_keywords = $('#_meta_keywords').val()
    var _year = $('#_year').val()
    var _ordering = $('input[name="_ordering"]').val()

    var _title_hi = $('input[name="_title_hi"]').val()
    var _description_hi = $('#_description_hi').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/vigilance';
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
        if (_vigilanceFileMain.file != undefined) {
            fd.append('file_f', _vigilanceFileMain.file)
        }

    } else {
        postUrl = '/docs/editVigilance';
        var _file = $('input[name="_file"]').val()

        // Check if image is changed or not
        if (_vigilanceFileMain.file != undefined) {
            if (_vigilanceFileMain.file.name != _file) {
                fd.append('file_f', _vigilanceFileMain.file)
            }
        }

        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('issue_date', _issue_date)
        fd.append('description', _description)
        fd.append('meta_keywords', _meta_keywords)
        fd.append('year', _year)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('description_hi', _description_hi)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.status == "success") {
            location.reload();
        } else {
            location.reload();
        }
    })
})

var _removeVigilanceById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.delete(`/docs/vigilance`, { data: { id: id } }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}

/* RTI ======= */

var _rtiFileMain = ''
var _rtiFileMainEl = document.querySelector(`#_rtiFileMain`)
var _rtiFileMainPond = FilePond.create(_rtiFileMainEl)
_rtiFileMainPond.on('addfile', (error, file) => {
    if (error) {
        alert('Image Upload Error Code: 500');
    } else {
        _rtiFileMain = file
    }
})

var _rtiFileThumb = ''
var _rtiFileThumbEl = document.querySelector(`#_rtiFileThumb`)
var _rtiFileThumbPond = FilePond.create(_rtiFileThumbEl)
_rtiFileThumbPond.on('addfile', (error, file) => {
    if (error) {
        console.log(error);
        alert('Image Upload Error Code: 500');
    } else {
        _rtiFileThumb = file
    }
})

var _rtiModal = function (modalId, formId) {
    $(`#${modalId}`).addClass('is-active');
    document.getElementById(`_${formId}_form`).reset();
    $('input[name="_action_mode"]').val('add');
    $('._show_uploaded').html('');
    _rtiFileMainPond.removeFile()
    _rtiFileThumbPond.removeFile()
}

var _getrtiById = function (id, modalId) {
    $('._show_uploaded').html('');
    _rtiFileMainPond.removeFile()
    _rtiFileThumbPond.removeFile()
    axios.get(`/docs/rti/${id}`).then(response => response.data).catch(error => console.log(error)).then(resp => {
        if (resp.response == "success") {
            let data = resp.data
            let files = resp.files
            $(`#${modalId}`).addClass('is-active');
            $('input[name="_action_mode"]').val(data._id)
            $('input[name="_title"]').val(data.title)
            $('input[name="_url"]').val(data.url)
            $('input[name="_ordering"]').val(data.ordering)
            $('input[name="_title_hi"]').val(data.title_hi)
            $('input[name="_issue_date"]').val(data.issue_date)
            if (files.length > 0) {
                for (let file of files) {
                    if (file.related[0].field == "file") {
                        // Set value in hidden field
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_rtiFileMainPond,'_file')">Remove</a>`
                        $('input[name="_file"]').val(file.url.split('/uploads/')[1])
                        _rtiFileMainPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    } else {
                        $('input[name="_thumbnail"]').val(file.url.split('/uploads/')[1])
                        let _fileDom = `<a href="/img/documents${file.url}" target="_blank"><span>Open in a new tab</span></a>`
                        _fileDom += `<a href="javascript:;" onclick="_removeUpload('${file._id}',_rtiFileThumbPond,'_thumbnail')">Remove</a>`
                        _rtiFileThumbPond.addFile(`/img/documents${file.url}`)
                        $(`._${file.related[0].field}`).find('._show_uploaded').html(_fileDom)

                        /* Review */
                        let _reviewed = ''
                        let _reviewed_class = "_false"
                        if (file.reviewed) {
                            _reviewed = "checked"
                            _reviewed_class = "_true"
                        }
                        let _reviewDom = `<div class="_reviewed_box_inner ${_reviewed_class}"><label>Is Reviewed : </label><input type="checkbox" class="_reviewAction" data-id="${file._id}" value="${file.reviewed}" ${_reviewed}/></div>`
                        $(`._${file.related[0].field}`).find('._reviewed_box').html(_reviewDom)
                    }
                }
            }
        }
    });
}

$('#_rti_form button._saveData').click(function (e) {
    e.preventDefault();
    var action_mode = $('input[name="_action_mode"]').val()
    var _title = $('input[name="_title"]').val()
    var _url = $('input[name="_url"]').val()
    var _ordering = $('input[name="_ordering"]').val()
    var _title_hi = $('input[name="_title_hi"]').val()
    var _issue_date = $('input[name="_issue_date"]').val()
    var fd = new FormData()
    var postUrl = ''
    if (action_mode == 'add') {
        postUrl = '/docs/rti';
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('issue_date', _issue_date)
        if (_rtiFileMain.file != undefined) {
            fd.append('file_f', _rtiFileMain.file)
        }
        if (_rtiFileThumb.file != undefined) {
            fd.append('file_s', _rtiFileThumb.file)
        }
    } else {
        postUrl = '/docs/rtiu';
        let _file = $('input[name="_file"]').val()
        let _thumbnail = $('input[name="_thumbnail"]').val()
        // Check if image is changed or not
        if (_rtiFileMain.file != undefined) {
            if (_rtiFileMain.file.name != _file) {
                fd.append('file_f', _rtiFileMain.file)
            }
        }

        if (_rtiFileThumb.file != undefined) {
            if (_rtiFileThumb.file.name != _thumbnail) {
                fd.append('file_s', _rtiFileThumb.file)
            }
        }
        fd.append('id', action_mode)
        fd.append('title', _title)
        fd.append('url', _url)
        fd.append('ordering', _ordering)
        fd.append('title_hi', _title_hi)
        fd.append('issue_date', _issue_date)
    }
    axios.post(postUrl, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => response.data).catch(error => {
        console.log(error);
    }).then(data => {
        if (data.response == "success") {
            location.reload();
        } else {
            alert('Error');
        }
    })
})


var _removertiById = function (id) {
    var confirmDelete = confirm('Sure to delete this!');
    if (confirmDelete) {
        if (id) {
            axios.post(`/docs/remove-rti`, { id: id }).then(response => response.data).catch(error => console.log(error)).then(data => {
                if (data.response == 'success') {
                    location.reload();
                }
            });
        }
    }
}
