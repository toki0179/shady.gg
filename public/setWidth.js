// javascript to set the width of buttons
function setWidth() {
    var one = document.getElementById("profile");
    var two = document.getElementById("buttons");
    style = window.getComputedStyle(one);
    wdt = style.getPropertyValue('width');
    two.style.width = wdt;
  }
  
  // on page load, set the width of buttons
window.onload = setWidth;