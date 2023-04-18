$('.dot:nth-child(1)').click(function () {
  $('.inside').animate({
    'width': '20%'
  }, 500);
});
$('.dot:nth-child(2)').click(function () {
  $('.inside').animate({
    'width': '40%'
  }, 500);
});
$('.dot:nth-child(3)').click(function () {
  $('.inside').animate({
    'width': '60%'
  }, 500);
});
$('.dot:nth-child(4)').click(function () {
  $('.inside').animate({
    'width': '80%'
  }, 500);
});





$(document).ready(function () {
  $('.carousel-control-next').click(function(){
    var videos = document.getElementsByClassName('homeVideo');    
    for (let i = 0; i <= videos.length - 1; i++){
      videos[i].pause()
    }
  })
});



var showSubMenu = false

$('.list_content').hide()

function HIDE_MENU_1() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.35 .service-icon').hide()
    $('.35 .service-content').hide()
    $('.list_content').show()
    $('.35').css({
      'position': 'absolute',
      'z-index': '100',
      left: '0px'
    })
    $('.35').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.35').css({
      'position': 'absolute',
      'z-index': '',
      left: '5px'
    })
    $('.35').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.35 .service-icon').show()
      $('.35 .service-content').show()
    })
  }
}


function HIDE_MENU_2() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.36 .service-icon').hide()
    $('.36 .service-content').hide()
    $('.list_content').show()
    $('.36').css({
      'position': 'absolute',
      'z-index': '100',
      left: '-279px'
    })
    $('.36').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.36').css({
      'position': 'absolute',
      'z-index': '',
      left: '5px'
    })
    $('.36').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.36 .service-icon').show()
      $('.36 .service-content').show()
    })
  }
}

function HIDE_MENU_3() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.37 .service-icon').hide()
    $('.37 .service-content').hide()
    $('.list_content').show()
    $('.37').css({
      position: 'absolute',
      'z-index': 100,
      left: '2px',
      top: '-144px',
    })
    $('.37').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.37').css({
      'position': 'absolute',
      'z-index': '100',
      left: '5px',
      top: '0px'
    })
    $('.37').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.37 .service-icon').show()
      $('.37 .service-content').show()
    })
  }
}

function HIDE_MENU_4() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.38 .service-icon').hide()
    $('.38 .service-content').hide()
    $('.list_content').show()
    $('.38').css({
      position: 'absolute',
      'z-index': 100,
      left: '-139px',
      top: '-144px',
    })
    $('.38').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.38').css({
      'position': 'absolute',
      'z-index': '100',
      left: '5px',
      top: '0px'
    })
    $('.38').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.38 .service-icon').show()
      $('.38 .service-content').show()
    })
  }
}

function HIDE_MENU_5() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.39 .service-icon').hide()
    $('.39 .service-content').hide()
    $('.list_content').show()
    $('.39').css({
      position: 'absolute',
      'z-index': 100,
      left: '-278px',
      top: '-144px',
    })
    $('.39').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.39').css({
      'position': 'absolute',
      'z-index': '100',
      left: '5px',
      top: '0px'
    })
    $('.39').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.39 .service-icon').show()
      $('.39 .service-content').show()
    })
  }
}

function HIDE_MENU_6() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.40 .service-icon').hide()
    $('.40 .service-content').hide()
    $('.list_content').show()
    $('.40').css({
      position: 'absolute',
      'z-index': 100,
      left: '0px',
      top: '-285px',
    })
    $('.40').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.40').css({
      'position': 'absolute',
      'z-index': '100',
      left: '5px',
      top: '0px'
    })
    $('.40').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.40 .service-icon').show()
      $('.40 .service-content').show()
    })
  }
}

function HIDE_MENU_7() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.41 .service-icon').hide()
    $('.41 .service-content').hide()
    $('.list_content').show()
    $('.41').css({
      position: 'absolute',
      'z-index': 100,
      left: '-139px',
      top: '-285px',
    })
    $('.41').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.41').css({
      'position': 'absolute',
      'z-index': '100',
      left: '5px',
      top: '0px'
    })
    $('.41').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.41 .service-icon').show()
      $('.41 .service-content').show()
    })
  }
}

function HIDE_MENU_8() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.42 .service-icon').hide()
    $('.42 .service-content').hide()
    $('.list_content').show()
    $('.42').css({
      position: 'absolute',
      'z-index': 100,
      left: '-278px',
      top: '-285px',
    })
    $('.42').animate({
      width: '297%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {


    $('.42').css({
      'position': 'absolute',
      'z-index': '10000',
      left: '5px',
      top: '0px'
    })
    $('.42').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.42 .service-icon').show()
      $('.42 .service-content').show()
    })
  }
}

function HIDE_MENU() {
  $('.sub-menu').hide()
  showSubMenu = !showSubMenu
  if (showSubMenu) {
    $('.34 .service-icon').hide()
    $('.34 .service-content').hide()
    $('.list_content').show()
    $('.34').css({
      'position': 'absolute',
      'z-index': '100',
      left: '-135px'
    })
    $('.34').animate({
      width: '293%',
      height: '320%',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600)
  } else {
    $('.34').css({
      'position': 'absolute',
      'z-index': '',
      left: '5px'
    })
    $('.34').animate({
      width: '130px',
      height: '130px',
      specialEasing: {
        width: "linear",
        height: "linear"
      },
    }, 600, function () {
      $('.list_content').hide()
      $('.34 .service-icon').show()
      $('.34 .service-content').show()
    })

  }

}

$('.sub-menu').hide()

$('ul.solar-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.solar-menu').show()
})
$('ul.wind-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.wind-menu').show()
})
$('ul.biomass-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.biomass-menu').show()
})
$('ul.biomass-gassi-head').hover(function () {
  $('.sub-menu').hide()
  $('.biomassg-menu').show()
})
$('ul.biogas-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.biogas-menu').show()
})
$('ul.hydro-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.smallhydro-menu').show()
})
$('ul.waste-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.waste-menu').show()
})
$('ul.new-tech-head').hover(function () {
  $('.sub-menu').hide()
  $('.tech-menu').show()
})

$("ul.about-menu-head").hover(function () {
  $('.sub-menu').hide()
  $('.about-menu').show()
})
$('ul.leadership-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.leadership-menu').show()
})
$('ul.publication-menu-head').hover(function () {
  $('.sub-menu').hide()
  $('.publication-menu').show()
})














/**
 * 
 * Click Handler for Institutes & Agencies
 * */
// $('.nise').on('click', function () {
//   utils.openInNewTab('https://nise.res.in/')
// })
// $('.niwe').on('click', function () {
//   utils.openInNewTab('https://niwe.res.in/')
// })
// $('.nire').on('click', function () {
//   utils.openInNewTab('https://niwe.res.in/')
// })
// $('.tireda').on('click', function () {
//   utils.openInNewTab('https://nibe.res.in/')
// })
// $('.seci').on('click', function () {
//   utils.openInNewTab('https://seci.co.in')
// })


$('.initbg, .initbgs').hover(function () {
  $(this).children().css('color', 'black')
}, function () {
  $(this).children().css('color', 'white')
})
$('.media_section').hide()
$('.news_block').show()
var selectEvents = function (hashValue) {
  $('#wow_tabs').attr('class', 'active_tab_events')
  $('.media_section').hide()
  $('.events_block').show()
  location.hash = hashValue
}
var selectNews = function (hashValue) {
  $('#wow_tabs').attr('class', 'active_tab_news')
  $('.media_section').hide()
  $('.news_block').show()
  location.hash = hashValue
}
var selectPress = function (hashValue) {
  location.hash = hashValue
  $('#wow_tabs').attr('class', 'active_tab_press')
  $('.media_section').hide()
  $('.press_block').show()
}
var selectPresentations = function (hashValue) {
  location.hash = hashValue
  $('#wow_tabs').attr('class', 'active_tab_presentations')
  $('.media_section').hide()
  $('.presentation_block').show()
}
var selectAds = function (hashValue) {
  location.hash = hashValue
  $('#wow_tabs').attr('class', 'active_tab_ads')
  $('.media_section').hide()
  $('.advertisement_block').show()
}

var selectGallery = function (hashValue) {
  location.hash = hashValue
  $('#wow_tabs').attr('class', 'active_tab_gallery')
  $('.media_section').hide()
  $('.gallery_block').show()
}
var selectPublications = function (hashValue) {
  location.hash = hashValue
  $('#wow_tabs').attr('class', 'active_tab_publication')
  $('.media_section').hide()
  $('.publication_block').show()
}
var selectNotifications = function (hashValue) {
  location.hash = hashValue
  $('#wow_tabs').attr('class', 'active_tab_notification')
  $('.media_section').hide()
  $('.notification_block').show()
}
var selectPolicies = function (hashValue) {
  location.hash = hashValue
  $('#wow_tabs').attr('class', 'active_tab_policies')
  $('.media_section').hide()
  $('.policies_block').show()
}


var hash = location.hash
var hashArray = hash.split('#')
if (hashArray[1] == "training-center") {
  selectNews(hashArray[1])
} else if (hashArray[1] == "infographics") {
  selectEvents(hashArray[1])
} else if (hashArray[1] == 'videos') {
  selectPress(hashArray[1])
} else if (hashArray[1] == "solar") {
  selectNews(hashArray[1])
} else if (hashArray[1] == "wind") {
  selectEvents(hashArray[1])
} else if (hashArray[1] == "bio") {
  selectAds(hashArray[1])
} else if (hashArray[1] == "waste_to_energy") {
  selectPresentations(hashArray[1])
} else if (hashArray[1] == "other_renewables") {
  selectGallery(hashArray[1])
} else if (hashArray[1] == "small_hydro") {
  selectPress(hashArray[1])
} else if (hashArray[1] == "rfd") {
  selectNews(hashArray[1])
} else if (hashArray[1] == "policy") {
  selectPolicy(hashArray[1])
} else if (hashArray[1] == "presentation") {
  selectPress(hashArray[1])
} else if (hashArray[1] == "advertisement") {
  selectPresentations(hashArray[1])
} else if (hashArray[1] == "events") {
  selectAds(hashArray[1])
} else if (hashArray[1] == "reports") {
  selectGallery(hashArray[1])
} else if (hashArray[1] == "circulars") {
  selectPublications(hashArray[1])
} else if (hashArray[1] == "notifications") {
  selectEvents(hashArray[1])
} else if (hashArray[1] == "case-studies") {
  selectAds(hashArray[1])
}

var grid_items = $('.grid-item')
var itemClicked, subItemClicked, itemClickedBoolean = false,
  subItemClickedBoolean = false;

// console.log(grid_items)

//$('.back_button').hide();
var redirectFlag = false;
var animate_item = function (item_no, hasRelativeUrl = '') {
  if (!itemClickedBoolean) {
    $('._back_btn').show();
    itemClickedBoolean = true
    itemClicked = $(`.grid-item-${item_no}`)
    console.log(`Item Number ${item_no} Clicked.`)
    if (menu[item_no].subheaders.length > 0) {
      $('.grid-item').not(`.grid-item-${item_no}`).hide()
      $(`.grid-item-${item_no}`).addClass('span-3')
      if (hasRelativeUrl != '' && item_no != 0) {
        $(`.grid-item-${item_no}.span-3`).find('.service-icon2').attr('data-url', `${hasRelativeUrl}`);
        $(`.grid-item-${item_no}.span-3`).find('.service-content2').attr('data-url', `${hasRelativeUrl}`);
        setTimeout(() => {
          $(`.grid-item-${item_no}.span-3`).find('.service-icon2').addClass('_redirect');
          $(`.grid-item-${item_no}.span-3`).find('.service-content2').addClass('_redirect');
          $(`.grid-item-${item_no}.span-3`).find('._custom_menu_title').html('Overview');
        }, 500)
        redirectFlag = true
      } else if (item_no == 0 && hasRelativeUrl != '') {
        $(`.grid-item-${item_no}.span-3`).find('.service-icon2').attr('data-url', `${hasRelativeUrl}`);
        $(`.grid-item-${item_no}.span-3`).find('.service-content2').attr('data-url', `${hasRelativeUrl}`);
        setTimeout(() => {
          $(`.grid-item-${item_no}.span-3`).find('.service-icon2').addClass('_redirect');
          $(`.grid-item-${item_no}.span-3`).find('.service-content2').addClass('_redirect');
          $(`.grid-item-${item_no}.span-3`).find('._custom_menu_title').html('');
        }, 500)
        redirectFlag = true
      }
      for (var i = 0; i <= menu[item_no].subheaders.length; i++) {
        var m = menu[item_no].subheaders[i]
        $('.grid-layout').append(`
          <div class="grid-item sub-grid sub-grid-item-${i} ${m.class} ${m.short}" onclick="animate_sub_item(${i},${item_no})"><a class="${m.link_class}"  onClick="external('${m.href}')" target="${m.target ? m.target : '_self'}">${m.title}</a></div>
        `)
      }
    }
  }
}


$(document).on('click', '._redirect', function (event) {
  event.stopPropagation();
  var getUrl = $(this).attr('data-url');
  window.location.href = getUrl
});


var backtick = function () {
  $(itemClicked).removeClass('span-3')
  $('.grid-item').show()
  $('.sub-grid').hide()
  $('.sub-sub-grid').hide()
  itemClickedBoolean = false
  subItemClickedBoolean = false
  $('._back_btn').hide();
  removeRedirectClassFromMenu();
  $(`._custom_menu_title`).html('');
}

var removeRedirectClassFromMenu = function () {
  $('.modal-body').find('._redirect').removeClass('_redirect');
}



var wewer = function () {
  // $(`._custom_menu_title`).html('');
  // removeRedirectClassFromMenu();
  // $(itemClicked).removeClass('span-3')
  // $('.grid-item').show()
  // $('.sub-grid').hide()
  // $('.sub-sub-grid').hide()
  // itemClickedBoolean = false
  // subItemClickedBoolean = false
  $('._back_btn').hide()
}

var animate_sub_item = function (item_no, header_no) {
  if (!subItemClickedBoolean) {
    subItemClickedBoolean = true
    subItemClicked = $(`.sub-grid-item-${item_no}`)
    // console.log(`Item Number ${item_no} Clicked.`)
    // console.log('Parent')
    // console.log(menu[header_no].subheaders[item_no])

    if (menu[header_no].subheaders[item_no].subheaders.length > 0) {

      $(`.grid-item-${header_no}`).hide()
      $('.sub-grid').not(`.sub-grid-item-${item_no}`).hide()
      $(`.sub-grid-item-${item_no}`).addClass('span-3')

      for (var i = 0; i <= menu[header_no].subheaders[item_no].subheaders.length; i++) {
        var m = menu[header_no].subheaders[item_no].subheaders[i]

        $('.grid-layout').append(`
          <div class="grid-item sub-sub-grid sub-sub-grid-item-${i} ${m.class} ${m.short}"><a href="${m.href}">${m.title}</a></div>
        `)

      }
    }

  }
}



