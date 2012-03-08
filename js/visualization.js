var x = 0;
var y = 0;
var dx = 2;
var dy = 4;
var ctx;

function init() {
  var c = document.getElementById("myCanvas");
  var ctx = new CanvasXpress("myCanvas", {
                  "venn": {
                    "data": {
                      "A": 114,
                      "B": 294,
                      "AB": 41
                    },
                    "legend": {
                      "A": "Victoria",
                      "B": "Seth"                      
                    }
                  }
                }, {
                  "graphType": "Venn",
                  "background": "rgb(245,245,245)",
                  "vennGroups": 2,
				  "vennColors": ["rgb(230,158,211)", "rgb(140,219,248)"]
                });
  //ctx = c.getContext("2d");
  
  //return setInterval(draw, 30);
}

function draw() {
  ctx.clearRect(0,0,1000,800);
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fill();
  x += dx;
  y += dy;
}

init();