```javascript
"use strict";

/* =====================================================
   AKZ-SMP DATA
===================================================== */

const AKZ_DATA = {

    relvo: {

        name: "RELVO",

        title: "THE MACE MASTER",

        roles: [
            "Mace Expert",
            "PvP Expert",
            "Survival Specialist"
        ],

        description:
            "An extremely dangerous and experienced Minecraft warrior. Relvo has mastered survival, PvP and the devastating power of the mace.",

        quote:
            "When the battle begins, Relvo doesn't run."

    },

    akzzz: {

        name: "AKZZZ",

        title: "THE LEGENDARY BUILDER",

        roles: [
            "Legendary Builder",
            "Master Architect",
            "World Creator"
        ],

        description:
            "A legendary builder capable of transforming an empty Minecraft world into monumental structures. His greatest creation is the AKZ Academy.",

        quote:
            "Built by AKZZZ. Remembered by the world."

    }

};


/* =====================================================
   MAIN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =============================================
       MOBILE MENU
    ============================================= */

    const menu =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav-links");


    if (menu && nav) {

        menu.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }


    /* =============================================
       NAV LINKS
    ============================================= */

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                if (nav) {

                    nav.classList.remove("active");

                }

            });

        });


    /* =============================================
       HEADER
    ============================================= */

    const header =
        document.getElementById("header");


    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        },
        { passive: true }
    );


    /* =============================================
       CHARACTER MODAL
    ============================================= */

    const modal =
        document.getElementById("character-modal");

    const modalTitle =
        document.getElementById("modal-title");

    const modalContent =
        document.getElementById("modal-content");

    const modalClose =
        document.querySelector(".modal-close");


    function openModal(character) {

        if (!modal) return;

        const data =
            AKZ_DATA[character];

        if (!data) return;


        if (modalTitle) {

            modalTitle.textContent =
                `${data.name} — ${data.title}`;

        }


        if (modalContent) {

            modalContent.innerHTML = `

                <p class="modal-description">
                    ${data.description}
                </p>

                <div class="modal-roles">

                    ${data.roles
                        .map(role => `
                            <span class="role-tag">
                                ${role}
                            </span>
                        `)
                        .join("")}

                </div>

                <blockquote>
                    "${data.quote}"
                </blockquote>

            `;

        }


        modal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    document
        .querySelectorAll(".character-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                const character =
                    card.dataset.character;

                openModal(character);

            });

        });


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                closeModal();

            }

        });

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    /* =============================================
       PARTICLES
    ============================================= */

    const particleContainer =
        document.querySelector(".particles");


    if (particleContainer) {

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.className = "particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.animationDuration =
                `${5 + Math.random() * 8}s`;

            particle.style.animationDelay =
                `${Math.random() * 8}s`;

            particleContainer.appendChild(particle);

        }

    }


    /* =============================================
       MACE IMPACT
    ============================================= */

    document
        .querySelectorAll(".mace-trigger")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.stopPropagation();

                maceImpact();

            });

        });


    function maceImpact() {

        document.body.classList.add("screen-shake");


        const flash =
            document.createElement("div");

        flash.className =
            "impact-flash";

        document.body.appendChild(flash);


        const shockwave =
            document.createElement("div");

        shockwave.className =
            "shockwave";

        document.body.appendChild(shockwave);


        setTimeout(() => {

            document.body.classList.remove(
                "screen-shake"
            );

        }, 400);


        setTimeout(() => {

            flash.remove();

        }, 600);


        setTimeout(() => {

            shockwave.remove();

        }, 1100);

    }


    /* =============================================
       SCROLL REVEAL
    ============================================= */

    const revealElements =
        document.querySelectorAll(
            ".character-card, .equipment-card, .story-item, .gallery img"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(30px)";

            element.style.transition =
                "opacity .7s ease, transform .7s ease";

            observer.observe(element);

        });

    }


    /* =============================================
       IMAGE ERROR HANDLING
    ============================================= */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener("error", () => {

                img.style.opacity = "0";

                img.parentElement
                    ?.classList
                    .add("image-missing");

            });

        });

});
```
