<!-- Text Wrap Fix -->
<script>	
const isSafari=navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome"),elements=document.querySelectorAll("h1, h2, h3, h4, h5, h6, p");elements.forEach((e=>{e.style.textWrap=isSafari?"normal":"balance"}));
</script>

<!-- GSAP SplitText Safari Fix -->
<script>
navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&document.querySelectorAll(".word-line").forEach((e=>{const n=document.createElement("div");n.style.textWrap="normal",n.style.display="inline-block",e.parentNode.insertBefore(n,e),n.appendChild(e)}));
</script>

<!-- GSAP SplitText Animations -->
<script>
let addAnimation=function(){$(".no-split-text").css("opacity",1),$(".rich-text-regular h5, .rich-text-regular h6, .rich-text-large h5, .rich-text-large h6").css("opacity",1),$("h1:not(.no-split-text, .heading-hero), h2:not(.no-split-text), h3:not(.no-split-text), h4:not(.no-split-text)").each((function(){let t=$(this),e=new SplitText(t[0],{type:"lines, words",linesClass:"word-line"}),i=$(e.words);gsap.timeline({scrollTrigger:{trigger:t,start:"top 85%",end:"top 85%"}}).set(t,{opacity:1}).from(i,{y:"100%",duration:1.5,stagger:.03,ease:"quart.out"})})),$(".paragraph-s:not(.no-split-text), .paragraph-m:not(.no-split-text)").each((function(){let t=$(this),e=new SplitText(t[0],{type:"lines, words",linesClass:"word-line"}),i=$(e.words);gsap.timeline({scrollTrigger:{trigger:t,start:"top 85%",end:"top 85%"}}).from(i,{y:"100%",duration:1.2,stagger:.01,ease:"quart.out"})})),$(".rich-text-regular h5:not(.no-split-text), .rich-text-regular h6:not(.no-split-text), .rich-text-large h5:not(.no-split-text), .rich-text-large h6:not(.no-split-text)").each((function(){let t=$(this);gsap.timeline({scrollTrigger:{trigger:t,start:"top 85%",end:"top 85%"}}).from(t,{y:"2em",opacity:0,duration:1,ease:"power2.out"})})),$("p:not(.no-split-text):not([class^='text-size-']):not(.text-size-18px), .text-size-18px:not(.no-split-text)").each((function(){let t=$(this);gsap.timeline({scrollTrigger:{trigger:t,start:"top 85%",end:"top 85%"}}).from(t,{y:"2em",opacity:0,duration:1,ease:"power2.out"})}))};addAnimation(),window.addEventListener("resize",(function(){$(window).width()>=992&&addAnimation()}));
</script>
