const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1500)
})
gsap.ticker.lagSmoothing(0)
const scrollers = document.querySelectorAll(".section--runline");




// STARSSSSSSSSSSSSSSSSSSSS
// canvas setup
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// watch for browser resizing, reinitialize stars
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});


function Star(x, y, width, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.speed = speed;
  this.color = "#747474";
  
  this.draw = function() {
     ctx.fillStyle = this.color;
     ctx.fillRect(this.x, this.y, width, width);
    }
 
    this.update = () => {
      // check bounds
     if (this.y - this.width <= 0) {
       this.y = innerHeight;
      }
      this.y -= this.speed;
 
      this.draw();
    }
 }

 // Star dimensions and speed
 const stars = {
   nearStar : {
     width : 3,
     speed : .3
  },
  midStar : {
    width : 2,
    speed : 0.1
  },
  farStar : {
    width : 1,
    speed : 0.025
  }
};

// clear starArray and generate 3 layers of stars randomly
let starArray = [];
function init() {
  starArray = [];
  // nearest stars
  for (let i=0; i < 50; ++i) {
    const x = Math.random() * (innerWidth - stars.nearStar.width);
    const y = Math.random() * (innerHeight - stars.nearStar.width);
    starArray.push(new Star(x, y, stars.nearStar.width, stars.nearStar.speed));
  }
  
  // mid-distance stars
  for (let i=0; i < 100; ++i) {
    const x = Math.random() * (innerWidth - stars.midStar.width);
    const y = Math.random() * (innerHeight - stars.midStar.width);
    starArray.push(new Star(x, y, stars.midStar.width, stars.midStar.speed));
  }
  
  // farthest stars
  for (let i=0; i < 350; ++i) {
    const x = Math.random() * (innerWidth - stars.farStar.width);
    const y = Math.random() * (innerHeight - stars.farStar.width);
    starArray.push(new Star(x, y, stars.farStar.width, stars.farStar.speed));
  }
}

// loop to call update function on each star
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
  for (var star of starArray) {
    star.update();
  }
}

init();
animate();

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".runtext__block");
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
}

const words = ["Gustavo", "Gustavo Martins", ]

gsap.to("#cursor", {
  opacity:0,
  repeat:-1,
  yoyo:true,
  duration: 0.5,
  ease: "power2.inOut"
});

let tl = gsap.timeline({repeat:-1})
words.forEach((word) =>{
  let tlText = gsap.timeline({repeat:1, yoyo:true})
  tlText.to("#animated-text", {duration:3, text: word})
  tl.add(tlText)
})
