const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1500)
})
gsap.ticker.lagSmoothing(0)
const scrollers = document.querySelectorAll(".section--runline");

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

const loaderContent = document.querySelector('.load')
const pageContent = document.querySelector('.page')

window.addEventListener('load', () => {
  loaderContent.classList.add('hidden')
  pageContent.classList.add('visible')
})


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
