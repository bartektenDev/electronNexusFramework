//Copyright and all rights all reserved to Bart Tarasewicz

function setup()
{
  runDisplay();
}

function runDisplay()
{
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("display");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            document.getElementById("contents").innerHTML = this.responseText;
            elmnt.setAttribute("display", "page2.html");
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

function navigate(btnID)
{
  //clean content view for the new data
  var myNode = document.getElementById("contents");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }

  if(btnID == "page1")
  {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = 'page1.html';
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              document.getElementById("contents").innerHTML = this.responseText;
              elmnt.setAttribute("display", "page2.html");
              document.getElementById("menuTitle").innerHTML = "Tab 1";
              document.getElementById("page1").disabled = true;
              document.getElementById("page2").disabled = false;
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  }else if(btnID == "page2"){
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = 'page2.html';
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              document.getElementById("contents").innerHTML = this.responseText;
              elmnt.setAttribute("display", "page2.html");
              document.getElementById("menuTitle").innerHTML = "Tab 2";
              document.getElementById("page1").disabled = false;
              document.getElementById("page2").disabled = true;
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  }else{
    alert('Ya YEET! An error exception has been thrown lol. fuck. time to fix it.');
  }
}