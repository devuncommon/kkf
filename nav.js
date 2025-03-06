document.addEventListener("DOMContentLoaded", function () {
    const mediaQuery = window.matchMedia("(min-width: 992px)");

    function initNavColorMode() {
        const nav = document.querySelector(".nav"),
            firstThemeSection = document.querySelector("header[class*='theme']"),
            dropdownLinks = document.querySelectorAll(".nav-link[data-dropdown-link]"),
            navNote = document.querySelector(".nav-note"),
            dropdownCollections = document.querySelectorAll(".nav-dropdown_collection");

        let isScrolled = false,
            isDropdownOpen = false,
            isNavNoteHovered = false,
            timeoutId;

        function applyTheme() {
            if (!firstThemeSection || isScrolled || isDropdownOpen || isNavNoteHovered || isDropdownActive()) return;
            nav.classList.forEach((cls) => {
                if (cls.startsWith("theme")) nav.classList.remove(cls);
            });
            firstThemeSection.classList.forEach((cls) => {
                if (cls.startsWith("theme")) nav.classList.add(cls);
            });
        }

        function removeTheme(delayed = false) {
            clearTimeout(timeoutId);
            const reset = () => {
                nav.classList.forEach((cls) => {
                    if (cls.startsWith("theme")) nav.classList.remove(cls);
                });
            };
            if (delayed) {
                timeoutId = setTimeout(reset, 200);
            } else {
                reset();
            }
        }

        function isDropdownActive() {
            return document.querySelector(".nav-dropdown_collection.active") !== null;
        }

        function onDropdownEnter() {
            isDropdownOpen = true;
            removeTheme();
        }

        function onDropdownLeave() {
            isDropdownOpen = false;
            if (!isScrolled && !isDropdownOpen && !isNavNoteHovered && window.scrollY <= 0.9 * window.innerHeight) {
                applyTheme();
            }
        }

        function onNavNoteEnter() {
            isNavNoteHovered = true;
            removeTheme();
        }

        function onNavNoteLeave() {
            isNavNoteHovered = false;
            if (!isScrolled && !isDropdownOpen && !isNavNoteHovered && window.scrollY <= 0.9 * window.innerHeight) {
                applyTheme();
            }
        }

        function onScrollTrigger() {
            ScrollTrigger.matchMedia({
                "(min-width: 992px)": function () {
                    gsap.to(".nav_wrapper", {
                        scrollTrigger: {
                            trigger: ".main-wrapper",
                            start: "90vh top",
                            toggleClass: {
                                targets: [
                                    ".nav_wrapper",
                                    ".nav-note",
                                    ".nav-bg",
                                    ".nav-link",
                                    ".nav-menu_logo",
                                    ".nav-menu_cart-icon",
                                    ".nav-scroll-bg-bar",
                                    ".nav-dropdown_collection",
                                    ".nav-link_dropdown",
                                ],
                                className: "nav-scroll",
                            },
                            toggleActions: "play reverse play reverse",
                            markers: false,
                            onEnter: () => {
                                isScrolled = true;
                                removeTheme(true);
                            },
                            onLeaveBack: () => {
                                isScrolled = false;
                                if (!isDropdownOpen && !isNavNoteHovered && window.scrollY <= 0.9 * window.innerHeight) {
                                    applyTheme();
                                }
                            },
                        },
                    });
                },
            });
        }

        dropdownLinks.forEach((link) => {
            link.addEventListener("mouseenter", onDropdownEnter);
            link.addEventListener("mouseleave", onDropdownLeave);
        });

        if (navNote) {
            navNote.addEventListener("mouseenter", onNavNoteEnter);
            navNote.addEventListener("mouseleave", onNavNoteLeave);
        }

        dropdownCollections.forEach((collection) => {
            collection.addEventListener("mouseleave", () => {
                setTimeout(() => {
                    if (!isScrolled && !isDropdownOpen && !isNavNoteHovered) {
                        applyTheme();
                    }
                }, 50);
            });
        });

        if (window.scrollY <= 0.9 * window.innerHeight && !isDropdownActive()) {
            applyTheme();
        }

        onScrollTrigger();
    }

    if (mediaQuery.matches) {
        initNavColorMode();
    }

    mediaQuery.addEventListener("change", (event) => {
        if (event.matches) {
            initNavColorMode();
        } else {
            location.reload();
        }
    });
});

// Nav Dynamic Links
document.addEventListener("DOMContentLoaded",(function(){const t=window.location.hostname.includes("webflow.io")?"https://kkf-demo.webflow.io":"https://keukenkastenfabriek.nl";document.querySelectorAll("[data-dynamic-link]").forEach((e=>{const n=e.getAttribute("href");n&&!n.startsWith("http")&&e.setAttribute("href",t+n)})),document.querySelectorAll("[data-configurator-link]").forEach((t=>{const e=t.getAttribute("href");e&&!e.startsWith("http")&&t.setAttribute("href","https://configurator.keukenkastenfabriek.nl"+e)}))}));

// Nav Logo Color Mode Tablet to Mobile -->
$(document).ready((function(){var o=$(".nav-menu_logo"),e="var(--_colors---swatch--soft-black)",t=!1;function n(){if(!(window.innerWidth>991)){var t=$(window).scrollTop(),n=$(".nav").offset().top,l=n+$(".nav").outerHeight(),c=e,i=!1;console.log("=== DETECTING COLOR ==="),console.log("Scroll position:",t),console.log("Nav Offset:",n,"Nav Bottom Offset:",l),$("header, section").each((function(){var o=$(this)[0],e=$(this).offset().top,t=e+$(this).outerHeight(),s=getComputedStyle(o).getPropertyValue("--_theme---body-text").trim();console.log("Checking SECTION:",o,"Offset:",e,"to",t),console.log("SECTION's theme color:",s),l>=e&&l<=t&&(c=s,i=!0,console.log("SCROLLING: Applying detected section theme color:",c)),n<=t&&n>=e&&(c=s,i=!0,console.log("NAV IN SECTION: Applying detected section theme color:",c))})),i||(c=e,console.log("NO THEME FOUND WHILE SCROLLING: Reverting to default black")),console.log("FINAL COLOR APPLIED:",c),o.css("color",c)}}function l(){window.innerWidth<=991?$(window).on("scroll resize",n):($(window).off("scroll resize",n),o.css("color",e))}!function(){var t=$("header, section").first();if(t.length>0&&t.is('[class*="theme-"]')){var n=getComputedStyle(t[0]).getPropertyValue("--_theme---body-text").trim();return console.log("FIRST HERO SECTION HAS THEME:",n),void o.css("color",n)}console.log("NO HERO SECTION THEME FOUND, DEFAULTING TO BLACK"),o.css("color",e)}(),console.log("FORCING HERO COLOR ON LOAD"),setTimeout((function(){console.log("Running theme detection after delay..."),n()}),200),$(".nav-menu_trigger").on("click",(function(){window.innerWidth<=991&&((t=!t)?(o.css("color",e),console.log("MENU OPENED: Setting logo to BLACK")):(console.log("MENU CLOSED: Reapplying theme detection..."),setTimeout(n,400)))})),l(),$(window).on("resize",l)}));

// Nav Menu -->
jQuery(document).ready((function(n){const o=window.matchMedia("(min-width: 992px)"),i=new Lenis;function t(o){o.matches?function(){let o=null,i=null,t=null,r=null;const s=136;function d(){if(o&&i){let t=i.find(".nav-link_arrow"),a=n(".nav-bg");u(o),g(t,!1),c(a),o=null,i=null}}function l(n,o){let i=o.outerHeight(),t=s+i;r&&r.isActive()&&r.kill(),r=gsap.to(n,{y:"0%",height:t+"px",duration:.5,ease:"cubic-bezier(0.625, 0.05, 0, 1)"})}function c(n){r&&r.isActive()&&r.kill(),r=gsap.to(n,{y:"-100%",height:s+"px",duration:.5,ease:"power2.inOut"})}function p(n,o){gsap.to(".nav-menu_logo-bg",{opacity:0,duration:.3,ease:"power4.out"}),t&&t.isActive()&&t.kill(),gsap.killTweensOf(o),n.css("z-index",10),gsap.set(n,{clearProps:"all"}),gsap.set(n,{y:"-101%",opacity:0,display:"block"}),gsap.set(o,{x:"4rem",opacity:0}),!n.hasClass("active")||n.data("isAnimating")?(n.data("isAnimating",!0),n.addClass("active"),t=gsap.timeline({onComplete:function(){gsap.set(o,{x:"0rem",opacity:1}),n.data("isAnimating",!1)}}),t.to(n,{y:"0%",opacity:1,duration:.5,ease:"cubic-bezier(0.625, 0.05, 0, 1)"}),t.to(o,{x:"0rem",opacity:1,duration:.6,ease:"cubic-bezier(0.625, 0, 0, 1)",stagger:.05},"-=0.2")):gsap.set(o,{x:"0rem",opacity:1})}function d(){if(o&&i){let t=i.find(".nav-link_arrow"),a=n(".nav-bg");u(o),g(t,!1),c(a),o=null,i=null,gsap.to(".nav-menu_logo-bg",{opacity:1,duration:.3,ease:"power4.out"})}}function u(n){let o=n.find(".nav-dropdown_item");t&&t.isActive()&&t.kill(),gsap.killTweensOf(o),n.removeClass("active"),n.data("isAnimating",!1),gsap.timeline().to(o,{x:"4rem",opacity:0,duration:.4,ease:"power2.inOut",stagger:{each:.05,from:"end"}},0).to(n,{y:"-101%",opacity:0,duration:.4,ease:"power2.inOut",onComplete:function(){n.css({display:"none","z-index":""}),gsap.set(n,{clearProps:"all"})}},0)}function g(n,o){gsap.killTweensOf(n);const i=!0===n.data("rotating");o&&i||(o||i)&&(n.data("rotating",o),gsap.to(n,{rotation:o?-180:0,y:o?2:0,duration:.5,ease:o?"back.out(1.7)":"power2.inOut",onComplete:function(){gsap.set(n,{rotation:o?-180:0,y:o?2:0})}}))}n(".nav-link[data-dropdown-link]").on("mouseenter",(function(){a();let e=n(this),r=e.find(".nav-link_arrow"),s=e.attr("data-dropdown-link"),d=n('.nav-dropdown_collection[data-dropdown="'+s+'"]'),c=d.find(".nav-dropdown_item"),f=n(".nav-bg");if(d.length){if(!i||i[0]!==e[0]||!d.is(":visible")){if(i&&i[0]!==e[0]){g(i.find(".nav-link_arrow"),!1),u(o)}t&&t.isActive()&&t.kill(),l(f,d),p(d,c),g(r,!0),o=d,i=e}}else console.warn("No matching dropdown found for:",s)})),n(".nav-link_wrap, .nav-bg, .nav-dropdown_collection").on("mouseleave",(function(){setTimeout((()=>{n(".nav-link_wrap:hover").length||n(".nav-dropdown_collection:hover").length||(d(),e())}),50)}))}():(n(".nav-link[data-dropdown-link]").off("mouseenter mouseleave"),n(".nav-link[data-dropdown-link]").on("click",(function(o){o.preventDefault(),a();let i=n(this),t=i.find(".nav-link_arrow"),l=i.attr("data-dropdown-link"),c=i.siblings(".nav-link_dropdown"),p=c.find('.nav-dropdown_collection[data-dropdown="'+l+'"]'),u=p.find(".nav-dropdown_item");n(".nav-link_dropdown.active").not(c).each((function(){s(n(this),n(this).find(".nav-dropdown_collection"),n(this).find(".nav-dropdown_item")),d(n(this).siblings(".nav-link").find(".nav-link_arrow"),!1)})),c.hasClass("active")?(s(c,p,u),d(t,!1),e()):(r(c,p,u),d(t,!0))})),function(o){let i=n('.nav-link[data-dropdown-link="'+o+'"]'),t=i.siblings(".nav-link_dropdown"),a=t.find('.nav-dropdown_collection[data-dropdown="'+o+'"]'),e=a.find(".nav-dropdown_item");r(t,a,e),d(i.find(".nav-link_arrow"),!0)}("populair"),n(".nav-dropdown_row").each((function(){!function(n){let o=n.parent().width(),i=n.width(),t=n.find(".nav-dropdown_item").outerWidth(!0);i>o&&Draggable.create(n,{type:"x",bounds:{minX:-(i-o),maxX:0},edgeResistance:.85,throwProps:!0,inertia:!0,snap:function(n){return Math.round(n/t)*t},cursor:"grab",allowContextMenu:!0,allowNativeTouchScrolling:!1,onPress:function(){n.css("cursor","grabbing")},onRelease:function(){n.css("cursor","grab")}})}(n(this))})))}function a(){i&&i.stop()}function e(){i&&i.start()}function r(n,o,i){n.addClass("active");let t=o.outerHeight(!0)+20-16;gsap.to(n,{height:t+"px",duration:.5,ease:"cubic-bezier(0.625, 0.05, 0, 1)"}),gsap.set(o,{y:"-101%",opacity:0,display:"block"}),gsap.to(o,{y:"0%",opacity:1,duration:.5,ease:"cubic-bezier(0.625, 0.05, 0, 1)"}),gsap.set(i,{x:"4rem",opacity:0}),gsap.to(i,{x:"0rem",opacity:1,duration:.6,ease:"cubic-bezier(0.625, 0.05, 0, 1)",stagger:.05})}function s(n,o,i){n.removeClass("active"),gsap.to(n,{height:"0px",duration:.5,ease:"power2.inOut"}),gsap.to(o,{y:"-101%",opacity:0,duration:.4,ease:"power2.inOut"}),gsap.to(i,{x:"4rem",opacity:0,duration:.4,ease:"power2.inOut",stagger:{each:.05,from:"end"}})}function d(n,o){gsap.to(n,{rotation:o?-180:0,y:o?2:0,duration:.5,ease:o?"back.out(1.7)":"power2.inOut"})}t(o),o.addListener(t)}));

// Nav Responsive 
$(".nav-menu_trigger").on("click",(function(){if($(this).hasClass("animating"))return;$(this).addClass("animating");let n=gsap.timeline({onComplete:()=>$(".nav-menu_trigger").removeClass("animating")}),a=$(this).hasClass("is-open"),o=[".nav_wrapper",".nav-bg",".nav-menu_logo",".nav-menu_cart-icon",".nav-menu_trigger",".nav-scroll-bg-bar"];a?n.to(".nav_links",{y:"-4rem",duration:.8,ease:"cubic.inOut"},0).to([".nav-menu_trigger",".nav-menu_line"],{backgroundColor:"var(--_theme---menu-background)",duration:0,ease:"quart.out"},0).to(".nav-menu_line",{backgroundColor:"var(--_colors---swatch--off-white)",duration:0,ease:"quart.out"},"<").to(".nav-menu_line.is-top",{rotation:0,y:0,duration:.5,ease:"back.out"},0).to(".nav-menu_line.is-bottom",{rotation:0,y:0,duration:.5,ease:"back.out"},0).to(".nav-note",{y:"200%",duration:.6,ease:"cubic.inOut"},0).to(".nav_links",{opacity:0,duration:.8,ease:"cubic.inOut"},0).to(".nav_main",{y:"-120%",duration:1,ease:"cubic.inOut"},.08).to(".nav-menu_logo-bg",{opacity:1,duration:.3,ease:"quart.out"},.2).add((()=>$(".nav-menu_trigger").removeClass("is-open"))).add((function(){window.scrollY>.9*window.innerHeight&&o.forEach((n=>$(n).addClass("nav-scroll")))}),"-=0.4").set(".nav-note",{display:"none"}):(o.forEach((n=>$(n).removeClass("nav-scroll"))),n.set(".nav-note",{display:"flex"}).to(".nav_main",{y:"0%",duration:.8,ease:"cubic.inOut"}).to([".nav-menu_trigger",".nav-menu_line"],{backgroundColor:"white",duration:0,ease:"quart.out"},0).to(".nav-menu_line",{backgroundColor:"var(--_colors---swatch--soft-black)",duration:0,ease:"quart.out"},"<").to(".nav-menu_line.is-top",{rotation:45,y:4,duration:.6,ease:"cubic-bezier(.625, .05, 0, 1)"},0).to(".nav-menu_line.is-bottom",{rotation:-45,y:-4,duration:.6,ease:"cubic-bezier(.625, .05, 0, 1)"},0).to(".nav-menu_logo-bg",{opacity:0,duration:.3,ease:"quart.out"},0).to(".nav-note",{y:"0%",duration:.8,ease:"cubic.inOut"},.32).to(".nav_links",{y:"0rem",duration:.8,ease:"cubic.inOut"},.32).to(".nav_links",{opacity:.8,duration:.8,ease:"cubic.inOut"},.4).add((()=>$(".nav-menu_trigger").addClass("is-open"))))}));
