// // STARSSSSSSSSSSSSSSSSSSSS
// // canvas setup
// const canvas = document.querySelector('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const ctx = canvas.getContext('2d');

// // watch for browser resizing, reinitialize stars
// window.addEventListener('resize', function() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   init();
// });


// function Star(x, y, width, speed) {
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.speed = speed;
//   this.color = "#747474";
  
//   this.draw = function() {
//      ctx.fillStyle = this.color;
//      ctx.fillRect(this.x, this.y, width, width);
//   }
 
//   this.update = () => {
//     // check bounds
//    if (this.y - this.width <= 0) {
//      this.y = innerHeight;
//     }
//     this.y -= this.speed;
//     this.draw();
//   }
// }

//  // Star dimensions and speed
//  const stars = {
//    nearStar : {
//      width : 3,
//      speed : .3
//   },
//   midStar : {
//     width : 2,
//     speed : 0.1
//   },
//   farStar : {
//     width : 1,
//     speed : 0.025
//   }
// };

// // clear starArray and generate 3 layers of stars randomly
// let starArray = [];
// function init() {
//   starArray = [];
//   // nearest stars
//   for (let i=0; i < 50; ++i) {
//     const x = Math.random() * (innerWidth - stars.nearStar.width);
//     const y = Math.random() * (innerHeight - stars.nearStar.width);
//     starArray.push(new Star(x, y, stars.nearStar.width, stars.nearStar.speed));
//   }
  
//   // mid-distance stars
//   for (let i=0; i < 100; ++i) {
//     const x = Math.random() * (innerWidth - stars.midStar.width);
//     const y = Math.random() * (innerHeight - stars.midStar.width);
//     starArray.push(new Star(x, y, stars.midStar.width, stars.midStar.speed));
//   }
  
//   // farthest stars
//   for (let i=0; i < 350; ++i) {
//     const x = Math.random() * (innerWidth - stars.farStar.width);
//     const y = Math.random() * (innerHeight - stars.farStar.width);
//     starArray.push(new Star(x, y, stars.farStar.width, stars.farStar.speed));
//   }
// }

// // loop to call update function on each star
// function animate() {
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, innerWidth, innerHeight);
  
//   for (var star of starArray) {
//     star.update();
//   }
// }

// init();
// animate();

const c = document.querySelector('canvas')
const ctx = c.getContext('2d')
const cw = c.width = innerWidth
const ch = c.height = innerHeight//*0.9
const dots = Array(750)
const dur = 25
const hue = 2
const mPos = {x:cw/2, y:ch}

c.onpointermove = (e)=> gsap.to(mPos, {x:e.offsetX, y:e.offsetY})

for (let i=0; i<dots.length; i++){
  dots[i] = {
    x: cw*Math.random(),
    y: -10,
    r: gsap.utils.random(1.5,4.5,0.1)
  }
}

function drawDot(x, y, r){
  const dist = Math.abs(x-mPos.x) + Math.abs(y-mPos.y) //distance from pointer alters lightness of color
  ctx.fillStyle = 'hsl('+hue+',40%,'+Math.max(1-dist/(dots.length-1), 0.5)*80+'%)'
  ctx.beginPath()
  ctx.arc(x, y, r*r*Math.max(1-dist/(dots.length-1), 0.1), 0, 2*Math.PI)
  ctx.fill()
}

function redraw(){
  ctx.clearRect(0,0,cw,ch)
  dots.forEach(dot => drawDot(dot.x, dot.y, dot.r))
}

gsap.timeline({ onUpdate:redraw })
.from(dots, {
  duration:dur,
  ease:'none',
  x:(i)=>'+=random(-99,99)',
  y:(i,t)=>t.r*ch, //larger dots move further/faster to imply depth
  r:()=>'+=random(-1,2)',
  repeatRefresh:true,
  stagger:{from:'random', amount:dur, repeat:-1},
})
.seek(dur) //fast-forward past the initial run