import data from "./data.json" assert { type: "json" };
var rootEl = document.querySelector(":root");
let cardContainer = document.getElementById("card-container");

// loading cards data from JSON to local variable
var localData = data;

// deciding number of grid columns
let columSizeEl = document.getElementById("numberOfColumns");
let cardsToShow = "dynamic";

function numberOfCardsDropdownHandler() {
  // just update global variable
  cardsToShow = columSizeEl.value;

  // if it's big screen when we change it update the feed
  if (window.innerWidth >= 992) {
    if (cardsToShow === "dynamic") {
      cardContainer.classList.remove("static");
      cardContainer.classList.add("dynamic");
    } else {
      cardContainer.classList.remove("dynamic");
      cardContainer.classList.add("static");
      rootEl.style.setProperty("--cards-number", cardsToShow);
    }
  }
}
columSizeEl.addEventListener("change", numberOfCardsDropdownHandler);

function resizeHandler() {
  if (window.innerWidth < 768) {
    rootEl.style.setProperty("--cards-number", "1");
    cardContainer.classList.remove("dynamic");
    cardContainer.classList.add("static");
  } else if (window.innerWidth < 992) {
    rootEl.style.setProperty("--cards-number", "2");
    cardContainer.classList.remove("dynamic");
    cardContainer.classList.add("static");
  } else if (window.innerWidth >= 992) {
    if (cardsToShow === "dynamic") {
      cardContainer.classList.remove("static");
      cardContainer.classList.add("dynamic");
    } else {
      cardContainer.classList.remove("dynamic");
      cardContainer.classList.add("static");
      rootEl.style.setProperty("--cards-number", cardsToShow);
    }
  }
}
window.addEventListener("resize", resizeHandler);

// change grid gap functionality
let gapInput = document.getElementById("cardSpaceBetween");
gapInput.addEventListener("input", gapDropdownHandler);

function gapDropdownHandler() {
  let gapValue = gapInput.value;
  rootEl.style.setProperty("--grid-gap", gapValue);
}

// change background color of cards functionality
let colorInput = document.getElementById("cardBackgroundColor");
colorInput.addEventListener("input", colorInputHandler);

function colorInputHandler() {
  rootEl.style.setProperty("--card-bg-color", colorInput.value);
}

// filter by source functionality
let radioBtns = document.getElementsByName("filterBySource");

for (let i = 0; i < radioBtns.length; i++) {
  radioBtns[i].addEventListener("click", filterBySource);
}

function filterBySource() {
  let cards = document.querySelectorAll(".card");
  let selectedFilter = document.querySelector(
    'input[name="filterBySource"]:checked'
  ).value;

  if (selectedFilter === "all") {
    cards.forEach((card) => {
      card.style.display = "block";
    });
  } else {
    cards.forEach((card) => {
      if (card.classList.contains(`${selectedFilter}`)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}

// cards loading
let loadCardsBtn = document.getElementById("load-card-btn");
loadCardsBtn.addEventListener("click", loadFourCards);
let currentCardPointer = 0;

function loadFourCards() {
  for (let i = 0; i < 4; i++) {
    let cardData = localData[currentCardPointer];

    // hiding Load More button when all cards are loaded
    if (cardData === undefined) {
      loadCardsBtn.style.visibility = "hidden";
      return;
    }

    let card = document.createElement("div");
    card.innerHTML = `
    <div class="card-heading">
        <img class="profile-img" src="${cardData.profile_image}"></img>
        <div class="name-date-container">
            <p class="username">${cardData.name}</p>
            <p class="post-date">${cardData.date}</p>
        </div>
        <img class="social-network" src=${
          cardData.source_type === "facebook"
            ? "./icons/facebook.svg"
            : "./icons/instagram-logo.svg"
        }></img>
    </div>
    <div class="post-image">
        <img src=${cardData.image}></img>
    </div>
    <div class="text-container">
        <p>${cardData.caption}</p>
    </div>
    <div class="horizontal-line"></div>
    <div class="hearts-container">
        <img src="./icons/heart.svg" alt="heart">
        <span>0</span>
    </div>
    `;

    card.classList.add("card");
    card.classList.add(`${cardData.source_type}`);
    cardContainer.appendChild(card);
    currentCardPointer++;
  }
}

loadFourCards();
