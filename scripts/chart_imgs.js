chart = 0
console.log("IN")
function deffiler_map(clicked_id) {
  if(clicked_id == "left"){
    chart = chart - 1
    if (chart == -3) {
      chart = 0
    }
  }
  else{
    chart = chart + 1
    if (chart == 3) {
      chart = 0
    }
  }
  if (chart == 1 || chart == -1) {
    document.getElementById("charts").src = "https://ourworldindata.org/grapher/pneumonia-and-lower-respiratory-diseases-deaths";
  }
  if (chart == 2 || chart == -2) {
    document.getElementById("charts").src = "https://ourworldindata.org/grapher/causes-of-death-in-children-under-5";
  }
  if (chart == 0) {
    document.getElementById("charts").src = "https://ourworldindata.org/grapher/pneumonia-death-rates-in-children-under-5?time=1990";
  }
 
}

function symptoms(number) {
  document.getElementById("symptom").style.opacity = 0;
  setTimeout(function() {
    if (number == 0) {
      document.getElementById("symptom").src = "icons/2slide/suspect.png";
    }
    if (number == 1) {
      document.getElementById("symptom").src = "icons/2slide/f1.png";
    }
    if (number == 2) {
      document.getElementById("symptom").src = "icons/2slide/f2.png";
    }
    if (number == 3) {
      document.getElementById("symptom").src = "icons/2slide/f3.png";
    }
    if (number == 4) {
      document.getElementById("symptom").src = "icons/2slide/f4.png";
    }
    if (number == 5) {
      document.getElementById("symptom").src = "icons/2slide/f5.png";
    }
    if (number == 6) {
      document.getElementById("symptom").src = "icons/2slide/f6.png";
    }
    if (number == 7) {
      document.getElementById("symptom").src = "icons/2slide/f7.png";
    }
    document.getElementById("symptom").style.opacity = 1;
  }, 800);
 
  
}



