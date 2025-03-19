// Text Wrap Fix
const isSafari=navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome"),elements=document.querySelectorAll("h1, h2, h3, h4, h5, h6, p");elements.forEach((e=>{e.style.textWrap=isSafari?"normal":"balance"}));

// GSAP SplitText Safari Fix
navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&document.querySelectorAll(".word-line").forEach((e=>{const n=document.createElement("div");n.style.textWrap="normal",n.style.display="inline-block",e.parentNode.insertBefore(n,e),n.appendChild(e)}));

// GSAP SplitText Animations
gsap.registerPlugin(SplitText);

let addAnimation = function() {
    $(".no-split-text, .rich-text-accordion").css("opacity", 1);
    $(".rich-text-regular h5, .rich-text-regular h6, .rich-text-large h5, .rich-text-large h6, .rich-text-legals h5, .rich-text-legals h6").css("opacity", 1);

    // H1 - H4 animations
    $("h1:not(.no-split-text, .heading-hero, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *), \
      h2:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *), \
      h3:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *), \
      h4:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *)").each(function() {
        let t = $(this),
            e = new SplitText(t[0], { type: "lines", linesClass: "word-line" }),
            i = e.lines; 

        if (i.length) {
            gsap.timeline({
                scrollTrigger: { trigger: t, start: "top 85%", end: "top 85%" }
            })
            .set(t, { opacity: 1 })
            .from(i, { y: "1em", opacity: 0, duration: 1, stagger: 0.15, ease: "power2.out" });
        }
    });

    // Paragraph animations
    $(".paragraph-s:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *), \
      .paragraph-m:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *)").each(function() {
        let t = $(this),
            e = new SplitText(t[0], { type: "lines", linesClass: "word-line" }),
            i = e.lines; 

        if (i.length) {
            gsap.timeline({
                scrollTrigger: { trigger: t, start: "top 85%", end: "top 85%" }
            })
            .from(i, { y: "1em", opacity: 0, duration: 1, stagger: 0.1, ease: "power2.out" });
        }
    });

    // H5 & H6 animations
    $(".rich-text-regular h5:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *), \
      .rich-text-regular h6:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *), \
      .rich-text-large h5:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *), \
      .rich-text-large h6:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *)").each(function() {
        let t = $(this);
        gsap.timeline({
            scrollTrigger: { trigger: t, start: "top 85%", end: "top 85%" }
        })
        .from(t, { y: "1em", opacity: 0, duration: 1, ease: "power2.out" });
    });

    // P-element animations
    $("p:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *):not([class^='text-size-']):not(.text-size-18px), \
      .text-size-18px:not(.no-split-text, .rich-text-accordion *, .rich-text-regular.no-split-text *, .rich-text-legals.no-split-text *)").each(function() {
        let t = $(this);
        gsap.timeline({
            scrollTrigger: { trigger: t, start: "top 85%", end: "top 85%" }
        })
        .from(t, { y: "1em", opacity: 0, duration: 1, ease: "power2.out" });
    });
};

// Run function immediately
addAnimation();

// Resize event with debounce for performance
let resizeTimeout;
window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if ($(window).width() >= 992) {
            addAnimation();
        }
    }, 250); // 250ms debounce
});
