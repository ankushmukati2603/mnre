$('.notification').hide()

var form = document.forms[0]

form.addEventListener("submit", function (e) {
    e.preventDefault()

    var csrf_token = form[0].value
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;
    var username = form[1].value
    var password = form[2].value

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        })
    }
    var token = uuidv4();

    var encryptedUsername = CryptoJS.RC4.encrypt(username, token);
    var encryptedPassword = CryptoJS.RC4.encrypt(password, token);


    axios.post('/admin/authority', {
        username: encryptedUsername,
        password: encryptedPassword,
        token: token
    }).then(response => response.data).catch(err => {
        //console.log('hiii');
        //alert('err');
        //console.log(err)
    }).then(data => {
        //console.log(data);
        //alert(data.status);
        if (data.status == "Success") {
            location.href = '/admin'
        } else {
            console.log(data.msg)
            $('.error_msg').text(data.msg)
            $('.notification').show()
            setTimeout(function () {
                $('.notification').hide()
            },4000)
		}
    })

})