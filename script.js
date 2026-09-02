/*
===========================================================
AKZ-SMP EDITABLE DATA
Change player information, enchantments and equipment here.
===========================================================
*/

const AKZ_DATA = {

  relvo: {

    name: "RELVO",

    role: "THE WARRIOR",

    title: "MACE MASTER",

    tags: [
      "PvP EXPERT",
      "SURVIVAL SPECIALIST"
    ],

    description:
      "The ultimate combat specialist of AKZ-SMP. Relvo is an extremely experienced survival warrior whose defining weapon is the mace. When the battle begins, Relvo doesn't run.",

    armor: [

      {
        name: "Netherite Helmet",
        icon: "⛑",
        trim: "WARD ARMOR TRIM",
        enchantments: [
          "Protection IV",
          "Unbreaking III",
          "Mending",
          "Respiration III",
          "Aqua Affinity"
        ]
      },

      {
        name: "Netherite Chestplate",
        icon: "🛡",
        trim: "SENTRY ARMOR TRIM",
        enchantments: [
          "Protection IV",
          "Unbreaking III",
          "Mending",
          "Thorns III"
        ]
      },

      {
        name: "Netherite Leggings",
        icon: "⚔",
        trim: "VEX ARMOR TRIM",
        enchantments: [
          "Protection IV",
          "Unbreaking III",
          "Mending",
          "Swift Sneak III"
        ]
      },

      {
        name: "Netherite Boots",
        icon: "🥾",
        trim: "RIB ARMOR TRIM",
        enchantments: [
          "Protection IV",
          "Unbreaking III",
          "Mending",
          "Feather Falling IV",
          "Depth Strider III"
        ]
      }

    ],

    weapons: [

      {
        name: "Mace",
        icon: "🔨",
        enchantments: [
          "Density V",
          "Wind Burst III",
          "Unbreaking III",
          "Mending"
        ]
      },

      {
        name: "Netherite Sword",
        icon: "🗡",
        enchantments: [
          "Sharpness IV",
          "Unbreaking III",
          "Mending",
          "Looting III",
          "Sweeping Edge III",
          "Fire Aspect II"
        ]
      },

      {
        name: "Netherite Axe",
        icon: "🪓",
        enchantments: [
          "Sharpness V",
          "Efficiency V",
          "Unbreaking III",
          "Mending"
        ]
      }

    ],

    tools: [

      {
        name: "Netherite Pickaxe",
        icon: "⛏",
        enchantments: [
          "Efficiency V",
          "Fortune III",
          "Unbreaking III",
          "Mending"
        ]
      },

      {
        name: "Netherite Axe",
        icon: "🪓",
        enchantments: [
          "Efficiency V",
          "Unbreaking III",
          "Mending"
        ]
      },

      {
        name: "Netherite Shovel",
        icon: "🔧",
        enchantments: [
          "Efficiency V",
          "Silk Touch",
          "Unbreaking III",
          "Mending"
        ]
      },

      {
        name: "Netherite Hoe",
        icon: "⚒",
        enchantments: [
          "Efficiency V",
          "Unbreaking III",
          "Mending"
        ]
      }

    ]

  },


  akzzz: {

    name: "AKZZZ",

    role: "THE CREATOR",

    title: "LEGENDARY BUILDER",

    tags: [
      "MASTER ARCHITECT",
      "WORLD BUILDER"
    ],

    description:
      "AKZZZ is the legendary builder of AKZ-SMP. His greatest creation is the AKZ Academy, a monumental structure that stands as one of the most important landmarks in the world.",

  }

};


/*
===========================================================
PAGE LOADER
===========================================================
*/

window.addEventListener("load", () => {

  setTimeout(() => {

    document.getElementById("loader")
      .classList.add("hide");

  }, 1300);

});


/*
===========================================================
PARTICLES
===========================================================
*/

const particleContainer =
  document.getElementById("particles");

for (let i = 0; i < 40; i++) {

  const particle =
    document.createElement("span");

  particle.style.position = "fixed";
  particle.style.width = `${Math.random() * 3 + 1}px`;
  particle.style.height = particle.style.width;
  particle.style.background = "#ffffff";
  particle.style.opacity = Math.random() * .25;
  particle.style.borderRadius = "50%";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "1";

  particle.animate(

    [
      {
        transform: "translateY(0)"
      },
      {
        transform:
          `translateY(-${Math.random() * 150 + 50}px)`
      }
    ],

    {
      duration: Math.random() * 6000 + 4000,
      iterations: Infinity,
      direction: "alternate"
    }

  );

  particleContainer.appendChild(particle);

}


/*
===========================================================
ARMORY GENERATOR
===========================================================
*/

function createItem(item) {

  const card =
    document.createElement("div");

  card.className = "item-card";

  card.innerHTML = `

    <div class="item-icon">
      ${item.icon}
    </div>

    <div class="item-name">
      ${item.name}
    </div>

    ${
      item.trim
      ?
      `<div class="trim">${item.trim}</div>`
      :
      ""
    }

    <div class="enchants">

      ${
        item.enchantments
        .map(enchant => `✦ ${enchant}`)
        .join("<br>")
      }

    </div>

  `;

  return card;

}


function loadArmory() {

  const armor =
    document.getElementById("armorItems");

  const weapons =
    document.getElementById("weaponItems");

  const tools =
    document.getElementById("toolItems");

  AKZ_DATA.relvo.armor
    .forEach(item => {
      armor.appendChild(createItem(item));
    });

  AKZ_DATA.relvo.weapons
    .forEach(item => {
      weapons.appendChild(createItem(item));
    });

  AKZ_DATA.relvo.tools
    .forEach(item => {
      tools.appendChild(createItem(item));
    });

}

loadArmory();


/*
===========================================================
CHARACTER MODAL
===========================================================
*/

const modal =
  document.getElementById("characterModal");

const modalRole =
  document.getElementById("modalRole");

const modalName =
  document.getElementById("modalName");

const modalTitle =
  document.getElementById("modalTitle");

const modalDescription =
  document.getElementById("modalDescription");

const modalTags =
  document.getElementById("modalTags");


function openCharacter(character) {

  const data =
    AKZ_DATA[character];

  modalRole.textContent =
    data.role;

  modalName.textContent =
    data.name;

  modalTitle.textContent =
    data.title;

  modalDescription.textContent =
    data.description;

  modalTags.innerHTML = "";

  data.tags.forEach(tag => {

    const span =
      document.createElement("span");

    span.textContent = tag;

    modalTags.appendChild(span);

  });

  modal.classList.add("active");

}


document
  .querySelectorAll(".legend-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      openCharacter(
        card.dataset.character
      );

    });

  });


document
  .getElementById("closeModal")
  .addEventListener("click", () => {

    modal.classList.remove("active");

  });


modal.addEventListener("click", e => {

  if (e.target === modal) {

    modal.classList.remove("active");

  }

});


/*
===========================================================
MACE CINEMATIC
===========================================================
*/

const maceButton =
  document.getElementById("maceButton");

const impactFlash =
  document.getElementById("impactFlash");

const shockwave =
  document.getElementById("shockwave");


maceButton.addEventListener("click", () => {

  document.body.classList.remove("impact");

  void document.body.offsetWidth;

  document.body.classList.add("impact");

  impactFlash.classList.remove("active");

  shockwave.classList.remove("active");

  void impactFlash.offsetWidth;

  impactFlash.classList.add("active");

  shockwave.classList.add("active");

  maceButton.textContent =
    "RELVO — THE MACE MASTER";

  setTimeout(() => {

    maceButton.textContent =
      "EXPERIENCE THE IMPACT";

  }, 2500);

});


/*
===========================================================
SCROLL REVEAL
===========================================================
*/

const revealElements =
  document.querySelectorAll(
    ".section-heading, .legend-card, .timeline-item, .inventory, .academy-text"
  );


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.animate(

            [
              {
                opacity: 0,
                transform: "translateY(35px)"
              },

              {
                opacity: 1,
                transform: "translateY(0)"
              }

            ],

            {
              duration: 900,
              easing: "cubic-bezier(.2,.8,.2,1)",
              fill: "forwards"
            }

          );

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: .12
    }

  );


revealElements.forEach(
  element => observer.observe(element)
);


/*
===========================================================
MOBILE MENU
===========================================================
*/

const menuBtn =
  document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {

  const links =
    document.querySelector(".nav-links");

  const open =
    links.style.display === "flex";

  links.style.display =
    open ? "none" : "flex";

  if (!open) {

    links.style.position = "absolute";
    links.style.top = "85px";
    links.style.left = "0";
    links.style.right = "0";
    links.style.background = "#050505";
    links.style.padding = "25px";
    links.style.flexDirection = "column";

  }

});


/*
===========================================================
SMOOTH NAVIGATION
===========================================================
*/

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener("click", e => {

      const target =
        document.querySelector(
          link.getAttribute("href")
        );

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });
