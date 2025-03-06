// Vimeo SRC 
document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".video-cover").forEach((e=>{const t=e.getAttribute("data-video");if(t){const o=e.querySelector("video");e.querySelector("source").setAttribute("src",t),o.load()}}))}));

// Image Mask
document.addEventListener("DOMContentLoaded",(function(){gsap.registerPlugin(ScrollTrigger),gsap.utils.toArray(".image-mask").forEach((function(r){gsap.fromTo(r,{y:"0%"},{y:"-100%",ease:"power3.out",duration:1.5,scrollTrigger:{trigger:r,start:"top 100%",end:"top 0%",scrub:!1}})}))}));

// Button Stagger
function initButtonCharacterStagger(){document.querySelectorAll("[data-button-animate-chars]").forEach((t=>{const e=t.textContent;t.innerHTML="",[...e].forEach(((e,n)=>{const a=document.createElement("span");a.textContent=e,a.style.transitionDelay=.003*n+"s"," "===e&&(a.style.whiteSpace="pre"),t.appendChild(a)}))}))}document.addEventListener("DOMContentLoaded",(()=>{initButtonCharacterStagger()}));

// Accordion
document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("[data-accordion-css-init]").forEach((t=>{const a="true"===t.getAttribute("data-accordion-close-siblings");t.addEventListener("click",(c=>{const e=c.target.closest("[data-accordion-toggle]");if(!e)return;const o=e.closest("[data-accordion-status]");if(!o)return;const s="active"===o.getAttribute("data-accordion-status");o.setAttribute("data-accordion-status",s?"not-active":"active"),a&&!s&&t.querySelectorAll('[data-accordion-status="active"]').forEach((t=>{t!==o&&t.setAttribute("data-accordion-status","not-active")}))}))}))}));

// Scroll Top
$(".scroll-top").on("click touchstart",(function(o){o.preventDefault(),lenis.scrollTo(0,{duration:1.5,easing:o=>o<.5?8*o*o*o*o:1-Math.pow(-2*o+2,4)/2})}));
});
