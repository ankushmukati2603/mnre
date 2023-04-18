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
