
function i_frame_ent() {
  document.getElementById("i-frame").className = "iframe animatewindow-inv";
  setTimeout(function() {
    document.getElementById("i-frame").style.visibility = "hidden" ;
    console.log(document.getElementById("i-frame").style.visibility)
    if (document.getElementById("i-frame").style.visibility == "" || document.getElementById("i-frame").style.visibility == "hidden") {
        document.getElementById("i-frame").style.visibility = "visible" ;
        document.getElementById("i-frame").className = "iframe animatewindow";
        setTimeout(() => {
          document.getElementById("i-frame").src = "http://127.0.0.1:7860/";
        }, 500);
    }
  }, 300);
        
}

function i_frame_ent1() {
  document.getElementById("i-frame").className = "iframe animatewindow-inv";
  setTimeout(function() {
        document.getElementById("i-frame").style.visibility = "hidden" ;
        console.log(document.getElementById("i-frame").style.visibility)
        if (document.getElementById("i-frame").style.visibility == "" || document.getElementById("i-frame").style.visibility == "hidden") {
            document.getElementById("i-frame").style.visibility = "visible" ;
            document.getElementById("i-frame").className = "iframe animatewindow";
            setTimeout(() => {
              document.getElementById("i-frame").src = "http://127.0.0.1:7861/";
            }, 500);
        }
  }, 300);
}

function i_frame_ent2() {
  document.getElementById("i-frame").className = "iframe animatewindow-inv";
  setTimeout(function() {
    document.getElementById("i-frame").style.visibility = "hidden" ;
    console.log(document.getElementById("i-frame").style.visibility)
    if (document.getElementById("i-frame").style.visibility == "" || document.getElementById("i-frame").style.visibility == "hidden") {
        document.getElementById("i-frame").style.visibility = "visible" ;
        document.getElementById("i-frame").className = "iframe animatewindow";
        setTimeout(() => {
          document.getElementById("i-frame").src = "http://127.0.0.1:7862/";
        }, 500);
    }
  }, 300);
}

function set_txt_3c() {
  document.getElementById("title").innerText = "X-ray three classes"
  document.getElementById("desc").innerText = "Classify Chest x-rays into : Normal Lungs,Bacterial & Viral Pneumonia."
}

function set_txt_2c() {
  document.getElementById("title").innerText  = "X-ray two classes"
  document.getElementById("desc").innerText = "Classify Chest x-rays into : Normal Lungs & Pneumonia."
}

function set_txt_3c_a() {
  document.getElementById("title").innerText  = "Audio"
  document.getElementById("desc").innerText = "Classify respiratory audio records into: Anomaly,Normal & Poor Quality."
}