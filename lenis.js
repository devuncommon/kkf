<!-- Lenis smooth scroll: Library -->
<script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script> 

<!-- Lenis smooth scroll: Script -->
<script>
const lenis=new Lenis({lerp:.15,wheelMultiplier:1,touchMultiplier:2,smoothWheel:!0,smoothTouch:!1,autoRaf:!1,infinite:document.body.hasAttribute("data-lenis-infinite")});function initScrollToAnchorLenis(){document.querySelectorAll("[data-anchor-target]").forEach((t=>{t.addEventListener("click",(function(){const t=this.getAttribute("data-anchor-target");lenis.scrollTo(t,{easing:t=>t<.5?8*t*t*t*t:1-Math.pow(-2*t+2,4)/2,duration:1.2,offset:0})}))}))}lenis.on("scroll",ScrollTrigger.update),gsap.ticker.add((t=>{lenis.raf(1e3*t)})),gsap.ticker.lagSmoothing(0),$("[data-lenis-start]").on("click",(function(){lenis.start()})),$("[data-lenis-stop]").on("click",(function(){lenis.stop()})),$("[data-lenis-toggle]").on("click",(function(){$(this).toggleClass("stop-scroll"),$(this).hasClass("stop-scroll")?lenis.stop():lenis.start()})),document.addEventListener("DOMContentLoaded",(()=>{initScrollToAnchorLenis()}));
</script>
