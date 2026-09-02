/* =========================================================
   AKZ-SMP — MAIN JAVASCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   PLAYER DATA
   ========================================================= */

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
            "When the battle begins, Relvo doesn't run.",

        armor: [
            {
                name: "Netherite Helmet",
                enchantments: [
                    "Protection",
                    "Unbreaking",
                    "Mending",
                    "Respiration",
                    "Aqua Affinity"
                ],
                trim: "Netherite Trim"
            },

            {
                name: "Netherite Chestplate",
                enchantments: [
                    "Protection",
                    "Unbreaking",
                    "Mending",
                    "Thorns"
                ],
                trim: "Netherite Trim"
            },

            {
                name: "Netherite Leggings",
                enchantments: [
                    "Protection",
                    "Unbreaking",
                    "Mending",
                    "Swift Sneak"
                ],
                trim: "Netherite Trim"
            },

            {
                name: "Netherite Boots",
                enchantments: [
                    "Protection",
                    "Unbreaking",
                    "Mending",
                    "Feather Falling",
                    "Depth Strider",
                    "Soul Speed"
                ],
                trim: "Netherite Trim"
            }
        ],

        weapons: [
            {
                name: "Netherite Mace",
                description: "Relvo's signature weapon.",
                enchantments: [
                    "Density",
                    "Unbreaking",
                    "Mending",
                    "Wind Burst"
                ]
            },

            {
                name: "Netherite Sword",
                description: "A devastating close-range weapon.",
                enchantments: [
                    "Sharpness IV",
                    "Unbreaking",
                    "Mending",
                    "Sweeping Edge",
                    "Looting",
                    "Fire Aspect"
                ]
            },

            {
                name: "Netherite Axe",
                description: "Heavy combat weapon.",
                enchantments: [
                    "Sharpness",
                    "Efficiency",
                    "Unbreaking",
                    "Mending"
                ]
            }
        ],

        tools: [
            {
                name: "Netherite Pickaxe",
                enchantments: [
                    "Efficiency",
                    "Fortune",
                    "Unbreaking",
                    "Mending"
                ]
            },

            {
                name: "Netherite Axe",
                enchantments: [
                    "Efficiency",
                    "Sharpness",
                    "Unbreaking",
                    "Mending"
                ]
            },

            {
                name: "Netherite Shovel",
                enchantments: [
                    "Efficiency",
                    "Unbreaking",
                    "Mending"
                ]
            },

            {
                name: "Netherite Hoe",
                enchantments: [
                    "Efficiency",
                    "Unbreaking",
                    "Mending"
                ]
            }
        ]
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
            "Built by AKZZZ. Remembered by the world.",

        creation: "THE AKZ ACADEMY"
    }
};


/* =========================================================
   PAGE LOADER
   ========================================================= */

/*
   IMPORTANT:
   This loader is intentionally failsafe.

   Even if another JavaScript feature has an error,
   the loading screen will still disappear.
*/

function hideLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.classList.add("hide");

    // Completely remove it after the animation
    setTimeout(() => {
        loader.style.display = "none";
    }, 800);
}


/* Start loader timer immediately */
setTimeout(hideLoader, 1500);


/* Also remove loader when DOM is ready */
document.addEventListener("DOMContentLoaded", () => {

    setTimeout(hideLoader, 1500);

});


/* Absolute failsafe:
   NEVER allow the loader to remain forever. */
setTimeout(() => {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.remove();
    }

}, 5000);


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            navigation.classList.toggle("active");
            menuButton.classList.toggle("active");

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
       ===================================================== */

    if (navigation) {

        const navLinks = navigation.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("active");

                if (menuButton) {
                    menuButton.classList.remove("active");
                }

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(event) {

            const targetID = this.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .section-title, .character-card, .armor-card, .weapon-card, .tool-card, .story-item"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       CHARACTER CARDS
       ===================================================== */

    const characterCards = document.querySelectorAll(
        ".character-card"
    );

    const characterModal = document.getElementById(
        "character-modal"
    );

    const modalTitle = document.getElementById(
        "modal-title"
    );

    const modalContent = document.getElementById(
        "modal-content"
    );

    const modalClose = document.querySelector(
        ".modal-close"
    );


    function openCharacter(character) {

        if (!characterModal) return;

        const data = AKZ_DATA[character];

        if (!data) return;


        if (modalTitle) {
            modalTitle.textContent =
                `${data.name} — ${data.title}`;
        }


        if (modalContent) {

            let html = `
                <p class="modal-description">
                    ${data.description}
                </p>

                <div class="modal-roles">
            `;


            data.roles.forEach(role => {

                html += `
                    <span class="role-tag">
                        ${role}
                    </span>
                `;

            });


            html += `</div>`;


            if (data.quote) {

                html += `
                    <blockquote>
                        "${data.quote}"
                    </blockquote>
                `;

            }


            if (character === "akzzz") {

                html += `
                    <div class="modal-feature">
                        <span>GREATEST CREATION</span>
                        <strong>
                            ${data.creation}
                        </strong>
                    </div>
                `;

            }


            if (character === "relvo") {

                html += `
                    <div class="modal-feature">
                        <span>SIGNATURE WEAPON</span>
                        <strong>
                            NETHERITE MACE
                        </strong>
                    </div>
                `;

            }


            modalContent.innerHTML = html;

        }


        characterModal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    characterCards.forEach(card => {

        card.addEventListener("click", () => {

            const character =
                card.dataset.character ||
                card.getAttribute("data-character");

            if (character) {
                openCharacter(character);
            }

        });

    });


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeModal() {

        if (!characterModal) return;

        characterModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (characterModal) {

        characterModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === characterModal
                ) {
                    closeModal();
                }

            }
        );

    }


    /* ESC KEY */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* =====================================================
       MACE IMPACT EFFECT
       ===================================================== */

    const maceSection = document.querySelector(
        ".mace-section"
    );

    const maceButton = document.querySelector(
        ".mace-trigger"
    );


    function maceImpact() {

        document.body.classList.add(
            "mace-impact"
        );


        /* Screen flash */

        const flash =
            document.createElement("div");

        flash.className =
            "impact-flash";

        document.body.appendChild(flash);


        /* Shockwave */

        const shockwave =
            document.createElement("div");

        shockwave.className =
            "shockwave";

        document.body.appendChild(shockwave);


        /* Camera shake */

        document.body.classList.add(
            "screen-shake"
        );


        setTimeout(() => {

            document.body.classList.remove(
                "mace-impact"
            );

            document.body.classList.remove(
                "screen-shake"
            );

        }, 500);


        setTimeout(() => {

            flash.remove();

        }, 600);


        setTimeout(() => {

            shockwave.remove();

        }, 1000);

    }


    if (maceButton) {

        maceButton.addEventListener(
            "click",
            maceImpact
        );

    }


    /* Click mace section */

    if (maceSection) {

        maceSection.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".mace-trigger"
                    )
                ) return;

                maceImpact();

            }
        );

    }


    /* =====================================================
       PARTICLE SYSTEM
       ===================================================== */

    const particleContainer =
        document.querySelector(
            ".particles"
        );


    if (particleContainer) {

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.animationDuration =
                5 + Math.random() * 8 + "s";

            particle.style.opacity =
                0.2 + Math.random() * 0.6;

            particleContainer.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       PARALLAX EFFECT
       ===================================================== */

    const parallaxElements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (parallaxElements.length) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollY =
                    window.scrollY;

                parallaxElements.forEach(
                    element => {

                        const speed =
                            parseFloat(
                                element.dataset.parallax
                            ) || 0.2;

                        element.style.transform =
                            `translateY(${scrollY * speed}px)`;

                    }
                );

            },
            { passive: true }
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector("header");


    if (header) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 60) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        links.length &&
        "IntersectionObserver" in window
    ) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;

                            links.forEach(link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            });

                        }

                    });

                },
                {
                    rootMargin:
                        "-25% 0px -65% 0px"
                }
            );


        sections.forEach(section => {

            navObserver.observe(
                section
            );

        });

    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
       ===================================================== */

    document
        .querySelectorAll("button, .btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.className =
                        "ripple";

                    ripple.style.left =
                        `${event.clientX - rect.left}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top}px`;

                    button.appendChild(
                        ripple
                    );


                    setTimeout(() => {
                        ripple.remove();
                    }, 600);

                }
            );

        });


    /* =====================================================
       ACADEMY REVEAL
       ===================================================== */

    const academy =
        document.querySelector(
            ".academy-reveal"
        );


    if (academy) {

        const academyObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            academy.classList.add(
                                "revealed"
                            );

                        }

                    });

                },
                {
                    threshold: 0.25
                }
            );


        academyObserver.observe(
            academy
        );

    }


    /* =====================================================
       EQUIPMENT ANIMATION
       ===================================================== */

    const equipmentCards =
        document.querySelectorAll(
            ".armor-card, .weapon-card, .tool-card"
        );


    equipmentCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 60}ms`;

        }
    );


    /* =====================================================
       PREVENT BROKEN IMAGE ICONS
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.display =
                        "none";

                }
            );

        });


    /* =====================================================
       PAGE READY
       ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});


/* =========================================================
   GLOBAL ERROR FAILSAFE
   ========================================================= */

/*
   If another script error happens, don't let it
   trap the visitor behind the loading screen.
*/

window.addEventListener(
    "error",
    () => {

        const loader =
            document.getElementById(
                "loader"
            );

        if (loader) {

            loader.classList.add(
                "hide"
            );

            setTimeout(() => {

                loader.style.display =
                    "none";

            }, 500);

        }

    }
);
