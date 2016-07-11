/*
 *	Site:;
 *	Author: ;
 *	Date: ;
 *	Comments: ;
 */


   /* * * * * * * * * * * * * * *
  * slider
  * * * * * * * * * * * * * * */

  $(function () {
    $('#slider').slider();
  });

   /* * * * * * * * * * * * * * *
  * 
  * * * * * * * * * * * * * * */
  function calculateBPM () {
    var bpm = document.getElementById('bpmInput').value;
    var ms = milliseconds(bpm);
    var htz = frequency(ms);
    console.log("ms: "+ms);
    console.log("htz: "+htz);
  }

  function milliseconds (bpm) {
    var int = [1, 2, 3, 4, 5, 6, 7, 8, 12, 16, 24, 32, 64];
    var ms = [];

    for (var i=0; i<int.length; i++) {
      m = bpm * (24 / int[i]);
      ms.push(m.toFixed(2));
    }
    return ms;
  }

  function frequency (ms) {
    var htz = [];

    for (var i=0; i<ms.length; i++) {
      h = 1000/ms[i];
      htz.push(h.toFixed(2));
    }
    return htz;
  }


   /* * * * * * * * * * * * * * *
  * CANVAS DRAWING
  * * * * * * * * * * * * * * */
  function init () {
    var ctx = document.getElementById("bpmGraphic").getContext("2d");
    var cw = ctx.canvas.width, ch = ctx.canvas.height;

    var flakes = [];

    function addFlake () {
      var x = Math.floor(Math.random() * cw) + 1;
      var y = 0; // start a little bit above the canvas top
      var s = Math.floor(Math.random() * 3) + 1; // 3 layers of snow depth
      flakes.push({"x":x, "y":y, "s":s});
    }

    function snow () {
      addFlake();
      for(var i=0; i<flakes.length; i++){
        ctx.fillStyle = "rgba(45,45,45,0.75)";
        ctx.beginPath();
        ctx.arc(flakes[i].x, flakes[i].y+=flakes[i].s*0.5, flakes[i].s*0.5, 0, Math.PI*2, false);
        ctx.fill();
        if(flakes[i].y > ch){
          flakes.splice(i,1);
          // remove flake from the array if it goes past the bottom of the screen
        }
        document.getElementById('status').innerHTML = "snow flake count = " + flakes.length;
      }
    }

    function animate () {
      ctx.clearRect(0, 0 , cw, ch);
      snow();
    }

    var animateInterval = setInterval(animate, 30);

  }

  window.addEventListener('load', function() {
    init();
  })
    