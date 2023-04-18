(function () {
    var morphSearch = document.getElementById('morphsearch'),
        input = morphSearch.querySelector('input.morphsearch-input'),
        morphSearchParent = document.getElementById('morphsearch-parent'),
        wrapper = document.getElementById('global-search-results-wrapper'),
        ctrlClose = document.querySelector('.morphsearch-close'),
        isOpen = false, isAnimating = false,
        mainNavBar = document.getElementById("main-navbar");

    // show/hide search area
    toggleSearch = function (evt) {
        // return if open and the input gets focused
        if (evt.type.toLowerCase() === 'focus' && isOpen) return false;

        var offsets = morphsearch.getBoundingClientRect();
        if (isOpen) {
            classie.remove(morphSearch, 'open');
            classie.remove(mainNavBar, "search-active");
            // trick to hide input text once the search overlay closes 
            // todo: hardcoded times, should be done after transition ends
            if (input.value !== '') {
                setTimeout(function () {
                    classie.add(morphSearch, 'hideInput');
                    setTimeout(function () {
                        classie.remove(morphSearch, 'hideInput');
                        input.value = '';
                    }, 300);
                }, 500);
            }
            input.blur();
        }
        else {
            classie.add(mainNavBar, "search-active");
            classie.add(morphSearch, 'open');
            input.focus();
        }
        isOpen = !isOpen;

        if (isOpen) {
            classie.remove(morphSearchParent, "d-none");
            classie.remove(morphSearchParent, "active");

            classie.add(wrapper, "d-block");
            classie.add(mainNavBar, "search-active");
        }
        else {
            classie.add(morphSearchParent, "d-none");
            classie.add(morphSearchParent, "active");
            classie.remove(wrapper, "d-block");
            classie.remove(mainNavBar, "search-active");
        }

        if (isOpen) disableScroll();
        else enableScroll();
    };

    // events
    input.addEventListener('focus', toggleSearch);
    ctrlClose.addEventListener('click', toggleSearch);

    // esc key closes search overlay
    // keyboard navigation events
    document.addEventListener('keydown', function (ev) {
        var keyCode = ev.keyCode || ev.which;
        if (keyCode === 27 && isOpen) {
            toggleSearch(ev);
        }
    });


    /***** for demo purposes only: don't allow to submit the form *****/
    //morphSearch.querySelector( 'button[type="submit"]' ).addEventListener( 'click', function(ev) { ev.preventDefault(); } );
})();

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
});

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys !== undefined && keys !== null && keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, { passive: true }); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
    $("body").css("overflow", 'hidden');
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, { passive: true }); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
    $("body").css("overflow", 'scroll');
}

$('.external_link').on('click', function (e) {
    e.preventDefault()
    var choice = confirm("You are Redirecting to an External Site. Do you want to continue ?")
    if (choice == true) {
        var link = $(e.currentTarget).attr('href')
        window.open(link, "_blank")
    } else {
        console.log('Redirect Cancelled')
    }
})

function external(link) {
    if (link[0] != '/') {
        var choice = confirm("You are Redirecting to an External Site. Do you want to continue ?")
        if (choice == true) {
            window.open(link, "_blank")
        } else {
            console.log('Redirect Cancelled')
        }
    } else {
        location.pathname = link
    }
}
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
$('.margin_boo').readmore({
    collapsedHeight: 104,
    moreLink: '<a id="more_readmore" href="#">Read more <img width="25px" height="25px" src="/img/caret_down.svg"><img></a>',
    lessLink: '<a id="less_readmore" href="#" onclick="do_it()">Read Less <img width="25px" height="25px" src="/img/caret_up.svg"><img></a>',
});

var LH = location.pathname;
var fd = document.getElementById('f184318d184322');
if (fd !== undefined && fd !== null) fd.value = LH;


$('.download_file').click(function () {
    console.log('Download File Started')
    var url = this.dataset.href
    

let ext = url.substring(url.lastIndexOf(".")+1)
console.log(ext);
    function showFile(blob) {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
let mimetype = "pdf"
if(ext == "xlsx"){
	mimetype = "xlsx"
}
        var newBlob = new Blob([blob], { type: `application/${mimetype}` })

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = `file-${new Date()}.${mimetype}`;
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
            document.body.removeChild(link);
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
        }, 100)
    }

    fetch([url])
        .then(r => r.blob())
        .then(blob => showFile(blob))
})


var _switchLanguage = function (lang) {
    axios.post('/lang', {
        lang: lang
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
    }).then((data) => {
        if (data.status == "Success") {
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    })
}