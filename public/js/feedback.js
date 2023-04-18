/*$('.feedback_submit').on('click', function (e) {
    e.preventDefault()
    console.log('WOW')
    var firstName = $('#first-name').val()
    var lastName = $('#last-name').val()
    var email = $('#email').val()
    var message = $('#feedback_message').val()

    if (email != "") {
        axios.post('/mail/feedback', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        }).then(response => response.data).catch(error => {
            console.log(error)
        }).then(data => {
            if (data.status == "Success") {
                document.getElementById('feedback_form').reset()
                alert('Message Sent')
            } else {
                alert('Message Not Sent')
            }
        })
    } else {
        alert('Fields Cannot Be Empty')
    }
})
*/