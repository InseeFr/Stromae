function showMenu() {
  if (document.getElementById("menuButton").innerHTML == "Menu ≡") {
    document.getElementById("menuButton").innerHTML = "Menu x";
    document.getElementById("nav").style.display = "block";
  } else {
    document.getElementById("menuButton").innerHTML = "Menu ≡";
    document.getElementById("nav").style.display = "none";
  }
}

var mq = window.matchMedia("(max-width: 750px)");
mq.addListener(WidthChange);
/* detect the change in resolution */
function WidthChange(mq) {
  var navStyle = document.getElementById("nav").style.display;
  /* small screen -> close the menu */
  if (mq.matches) {
    document.getElementById("nav").style.display =
      navStyle == "block" ? "none" : "none";
    document.getElementById("menuButton").innerHTML = "Menu ≡";
  } else {
    /* large screen -> the menu is forced to be displayed */
    document.getElementById("nav").style.display =
      navStyle == "none" ? "block" : "block";
  }
}
