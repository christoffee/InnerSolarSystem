jQuery(document).ready ( function () {
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var canvas, context, toggle,starSize,ssPositionX,ssPositionY;
var planetsArr = [['mercury',4,'grey',100,0.002],['venus',6,'blue',220,0.001],['earth',8,'green',450,0.002],['mars',8.5,'red',6060,0.0009]];
var starsArr = [];
var ssFired = false;
var pulsate = 40;
var canvasXCenter;
var canvasyCenter;
var gameText;
var expAlpha = 0.5;
var expSize = 0;
var canvasHeight;
var canvasWidth;
// usage:
// instead of setInterval(render, 16) ....
init();

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();
  
  function init() {
    canvasWidth = 1000; 
    canvasHeight = 600;
    createBackgound();
    canvas = document.createElement( 'canvas' );
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    canvasXCenter = canvasWidth/ 2;
    canvasyCenter = canvasHeight / 2;

    context = canvas.getContext( '2d' );
    context.fillStyle = "black";
    context.rect(0, 0, canvasWidth, canvasHeight);
    context.fill();

    document.body.appendChild( canvas );
  }

      
  function createBackgound () {
    for (i = 0; i <= 500; i++) {
      var star = [];
      // Get random positions for stars.
      var x = Math.floor(Math.random() * (canvasWidth - 1))
      var y = Math.floor(Math.random() * (canvasHeight - 1))
      toggle = !toggle;

      starSize = toggle ? 1 :  0.2;
      starColour = toggle ? 'white' :  'aqua';

      star.push(x,y,starSize,starColour);

      starsArr.push(star);
    }
  }

  function drawBackground() {
    for (var arr in starsArr) {
      for (var i = 0; i < starsArr[arr].length; i++) {
        // Draw an individual star.
        context.fillStyle = starsArr[arr][3];
        context.beginPath();
        context.rect(starsArr[arr][0], starsArr[arr][1], starsArr[arr][2], starsArr[arr][2]);
        context.closePath();
        context.fill();
      }
    }
  }

  function drawPlanets() {
    for(var arr in planetsArr){
      for (var i = 0; i < planetsArr[arr].length; i++) {
        var planetNames = planetsArr[arr][0],
            planetSize = planetsArr[arr][1],
            planetColour = planetsArr[arr][2],
            planetDistance = planetsArr[arr][3],
            planetSpeed = planetsArr[arr][4];

        var time = new Date().getTime() * planetSpeed;

        var planetx = Math.sin( time ) * planetDistance + canvasWidth /8;
        var planety = Math.cos( time ) * planetDistance + canvasHeight /2;
        

          context.fillStyle = planetColour;
          context.beginPath();
          context.arc( planetx, planety, planetSize, 0, Math.PI * 5, true );
          
          context.closePath();

          context.fill();
        

      }
    }
  }

  function drawSun() {

    pulsate += 0.2;
    
        
        context.beginPath();    
        context.fillStyle = "rgba(255, 255, 0, 0.3)";
        context.arc( canvasWidth / 8, canvasHeight /2, pulsate, 0, Math.PI * 5, true );
        context.closePath();
        context.fill(); 

        context.beginPath();    
        context.fillStyle = "rgba(255, 255, 0, 0.2)";
        context.arc( canvasWidth / 8, canvasHeight /2, pulsate /0.8, 0, Math.PI * 5, true );
        context.closePath();
        context.fill(); 
      
      if (pulsate >= 60) {
        pulsate = 40;
      }
      context.fillStyle = 'gold';
      context.beginPath();
      context.arc( canvasWidth / 8, canvasHeight /2, 40, 0, Math.PI * 5, true );
      context.closePath();
      context.fill(); 
    
    
  }

  function drawText () {
    
    context.font        = "normal 36px Arial";
    context.strokeStyle = "#00ff00";
      context.textAlign = 'center';
    context.strokeText("The Inner Solar System", canvasXCenter, 50);
  }

  function render() {
    if(context){
      context.clearRect(0,0,canvasWidth,canvasHeight);
      drawBackground();
      drawPlanets();
      drawSun();
      drawText();
    }
   
}

});


