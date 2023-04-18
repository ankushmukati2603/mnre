var delay = 2000; //in milleseconds


jQuery(document).ready(function ($) {
    setTimeout(function () { showNewsletterPopup(); }, delay);

    $('.popup-close').click(function () {
        $('.newsletter-overlay').hide();

        //when closed create a cookie to prevent popup to show again on refresh

    });
});

function showNewsletterPopup() {
    $('.newsletter-overlay').show();
}




// NISE MODAL
var modal1 = document.getElementById('NISEModal');
var btn1 = document.getElementById("NISE");
var span1 = document.getElementById("close_nise");
btn1.onclick = function () {
    $('.nise').css('z-index', '1')
    modal1.style.display = "block";
}

span1.onclick = function () {
    modal1.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

// NIRE MODAL
var modal2 = document.getElementById('NIREModal');

var btn2 = document.getElementById("NIRE");

var span2 = document.getElementById("close_nire");

btn2.onclick = function () {
    $('.nire').css('z-index', '1')
    modal2.style.display = "block";
}

span2.onclick = function () {
    modal2.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

// TIREDA MODAL

var modal3 = document.getElementById('TIREDAModal');

var btn3 = document.getElementById("TIREDA");

var span3 = document.getElementById("close_tireda");

btn3.onclick = function () {
    $('.tireda').css('z-index', '1')
    modal3.style.display = "block";
}

span3.onclick = function () {
    modal3.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}

// SECI MODAL

var modal4 = document.getElementById('SECIModal');

var btn4 = document.getElementById("SECI");

var span4 = document.getElementById("close_seci");

btn4.onclick = function () {
    $('.seci').css('z-index', '1')
    modal4.style.display = "block";
}

span4.onclick = function () {
    modal4.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}

// NIWE MODAL
var modal5 = document.getElementById('NIWEModal');

var btn5 = document.getElementById("NIWE");

var span5 = document.getElementById("close_niwe");

btn5.onclick = function () {
    $('.niwe').css('z-index', '1')
    modal5.style.display = "block";
}

span5.onclick = function () {
    modal5.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
}

// NISE Mobile MODAL

var modal6 = document.getElementById('NISEModal1');

var btn6 = document.getElementById("NISE1");

var span6 = document.getElementById("close_nise1");

btn6.onclick = function () {
    $('.nise').css('z-index', '1')
    modal1.style.display = "block";
}

span6.onclick = function () {
    modal6.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
}

// NIRE MODAL

// Get the modal
var modal7 = document.getElementById('NIREModal1');

// Get the button that opens the modal
var btn7 = document.getElementById("NIRE1");

// Get the <span> element that closes the modal
var span7 = document.getElementById("close_nire1");

// When the user clicks on the button, open the modal
btn7.onclick = function () {
    $('.nire').css('z-index', '1')
    modal7.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span7.onclick = function () {
    modal7.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal7) {
        modal7.style.display = "none";
    }
}

// TIREDA MODAL

// Get the modal
var modal8 = document.getElementById('TIREDAModal1');

// Get the button that opens the modal
var btn8 = document.getElementById("TIREDA1");

// Get the <span> element that closes the modal
var span8 = document.getElementById("close_tireda1");

// When the user clicks on the button, open the modal
btn8.onclick = function () {
    $('.tireda').css('z-index', '1')
    modal8.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span8.onclick = function () {
    modal8.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal8) {
        modal8.style.display = "none";
    }
}

// SECI MODAL MOBILE

// Get the modal
var modal10 = document.getElementById('SECIModal1');

// Get the button that opens the modal
var btn10 = document.getElementById("SECI1");

// Get the <span> element that closes the modal
var span10 = document.getElementById("close_seci1");

// When the user clicks on the button, open the modal
btn10.onclick = function () {
    $('.seci').css('z-index', '1')
    modal10.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span10.onclick = function () {
    modal10.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal10) {
        modal10.style.display = "none";
    }
}

$(".card-body").mouseenter(function (e) {
    $(e.currentTarget).toggleClass('effect8')
})
$('.card-body').mouseleave(function (e) {
    $(e.currentTarget).toggleClass('effect8')
})

$('#des_home .carousel-item:first-child').addClass('active')
$('#mob_home .carousel-item:first-child').addClass('active')


$('.carousel-item').first().addClass('active')