var utils = {}

$('.ideate_js').click(function(){
  window.open('https://irixchange.com')
})

utils.openInNewTab = function (url){
    var win = window.open(url, '_blank');
    win.focus();
}

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "inline-table";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
if(document.getElementById("defaultOpen") !== undefined && document.getElementById("defaultOpen") !== null)
document.getElementById("defaultOpen").click();

