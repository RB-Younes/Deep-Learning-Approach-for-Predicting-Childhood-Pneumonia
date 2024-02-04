
function reply_click(clicked_id)
  {
    if(clicked_id == 2){
      document.getElementById(clicked_id).className = "scrollers-selected";
     
      document.getElementById(1).className = "scrollers-non-selected";
      document.getElementById(3).className = "scrollers-non-selected";
      document.getElementById(4).className = "scrollers-non-selected";
      //changer le visuelle
      //lancer l'animation inverse
      document.getElementById("h1").className = "animatewindow-inv";
      document.getElementById("p").className = "animatewindow-inv";
      document.getElementById("vid-name").className = "animatewindow-inv";
      document.getElementById("side-vid").className = "animatewindow-inv";

    //attendre la fin pour lancer l'animation principale
      setTimeout(function() {
        document.getElementById("side-vid").src = "Video-exp/tuto2.mp4";
        document.getElementById("h1").innerHTML = "Binary Classification <br> (x-ray)";
        document.getElementById("p").innerHTML = "Classify pediatric pneumonia radiographs in <br> 2 classes in one click!";
        document.getElementById("vid-name").innerHTML = "Binary Classification Video (x-ray)"
        document.getElementById("h1").className = "animatewindow";
        document.getElementById("p").className = "animatewindow";
        document.getElementById("side-vid").className = "animatewindow";
        document.getElementById("vid-name").className = "animatewindow";
      }, 600);
      
    }

    if(clicked_id == 1){
     
      document.getElementById(clicked_id).className = "scrollers-selected";
      
      document.getElementById(2).className = "scrollers-non-selected";
      document.getElementById(3).className = "scrollers-non-selected";
      document.getElementById(4).className = "scrollers-non-selected";
      
      //changer le visuelle
      //lancer l'animation inverse
      document.getElementById("h1").className = "animatewindow-inv";
      document.getElementById("p").className = "animatewindow-inv";
      document.getElementById("vid-name").className = "animatewindow-inv";
      document.getElementById("side-vid").className = "animatewindow-inv";

    //attendre la fin pour lancer l'animation principale
      setTimeout(function() {
        document.getElementById("side-vid").src = "Video-exp/tuto1.mp4";
        document.getElementById("h1").innerHTML = "Main <br> Menu";
        document.getElementById("p").innerHTML = "A dynamic and responsive main menu to ensure<br> you a smooth and interesting experience by <br>  highlighting a few points and gadgets:<br>3d models, definitions, statistics...etc.";
        document.getElementById("vid-name").innerHTML = "Main menu Video"
        document.getElementById("h1").className = "animatewindow";
        document.getElementById("p").className = "animatewindow";
        document.getElementById("side-vid").className = "animatewindow";
        document.getElementById("vid-name").className = "animatewindow";
      }, 600);
    }
    if(clicked_id == 3){
      document.getElementById(clicked_id).className = "scrollers-selected";
      
      document.getElementById(1).className = "scrollers-non-selected";
      document.getElementById(2).className = "scrollers-non-selected";
      document.getElementById(4).className = "scrollers-non-selected";
      //changer le visuelle
      //lancer l'animation inverse
      document.getElementById("h1").className = "animatewindow-inv";
      document.getElementById("p").className = "animatewindow-inv";
      document.getElementById("vid-name").className = "animatewindow-inv";
      document.getElementById("side-vid").className = "animatewindow-inv";

    //attendre la fin pour lancer l'animation principale
      setTimeout(function() {
        document.getElementById("side-vid").src = "Video-exp/tuto3.mp4";
        document.getElementById("h1").innerHTML = "Three-class <br> classification (x-ray)";
        document.getElementById("p").innerHTML = "Classify pediatric pneumonia radiographs in <br> 3 classes in one click!";
        document.getElementById("vid-name").innerHTML = "Three-class classification Video(x-ray)"
        document.getElementById("h1").className = "animatewindow";
        document.getElementById("p").className = "animatewindow";
        document.getElementById("side-vid").className = "animatewindow";
        document.getElementById("vid-name").className = "animatewindow";
      }, 600);
      
    }

    if(clicked_id == 4){
      document.getElementById(clicked_id).className = "scrollers-selected";
      
      document.getElementById(1).className = "scrollers-non-selected";
      document.getElementById(2).className = "scrollers-non-selected";
      document.getElementById(3).className = "scrollers-non-selected";
      //changer le visuelle
      //lancer l'animation inverse
      document.getElementById("h1").className = "animatewindow-inv";
      document.getElementById("p").className = "animatewindow-inv";
      document.getElementById("vid-name").className = "animatewindow-inv";
      document.getElementById("side-vid").className = "animatewindow-inv";

    //attendre la fin pour lancer l'animation principale
      setTimeout(function() {
        document.getElementById("side-vid").src = "Video-exp/tuto4.mp4";
        document.getElementById("h1").innerHTML = "Audio classification";
        document.getElementById("p").innerHTML = "Classify resperatory audios into 3 classes<br> in one click!";
        document.getElementById("vid-name").innerHTML = "Audio classification Video "
        document.getElementById("h1").className = "animatewindow";
        document.getElementById("p").className = "animatewindow";
        document.getElementById("side-vid").className = "animatewindow";
        document.getElementById("vid-name").className = "animatewindow";
      }, 600);
      
    }


  }