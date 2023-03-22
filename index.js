import data from "./data.json" assert { type: "json" };
var rootEl = document.querySelector(":root");
let cardContainer = document.getElementById("card-container");
let cards;

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
let filterBySrcRadioBtns = document.getElementsByName("filterBySource");
cards = document.querySelectorAll("card");

function filterBySource() {
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

// toggle dark/light mode functionality
let modeRadioBtns = document.getElementsByName("theme");

function toggleMode() {
  let selectedMode = document.querySelector(
    'input[name="theme"]:checked'
  ).value;

  if (selectedMode === "darkTheme") {
    rootEl.style.setProperty("--card-bg-clr", "#000");
    rootEl.style.setProperty("--card-text-clr", "#fff");
  } else {
    rootEl.style.setProperty("--card-bg-clr", "#fff");
    rootEl.style.setProperty("--card-text-clr", "#000");
  }
}

// like counter functionality
// let hearts = document.getElementsByClassName("heart");

function toggleHeart(e) {
  console.log(e.target);
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
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="heart">
      <path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        <span class="heartCounterContainer">0</span>
    </div>
    `;

    card.classList.add("card");
    card.classList.add(`${cardData.source_type}`);
    card
      .querySelectorAll(".hearts-container")[0]
      .addEventListener("click", function handleHeartCounter() {
        let counterContainer = this.querySelectorAll(
          ".heartCounterContainer"
        )[0];
        let counter = parseInt(counterContainer.innerHTML);
        let clickedHeart = this.querySelectorAll(".heart")[0];
        console.log(clickedHeart);

        if (clickedHeart.classList.contains("active")) {
          counter--;
          clickedHeart.nextElementSibling.innerHTML = counter;
          clickedHeart.classList.remove("active");
        } else {
          counter++;
          clickedHeart.nextElementSibling.innerHTML = counter;
          clickedHeart.classList.add("active");
        }
      });
    cardContainer.appendChild(card);
    currentCardPointer++;
  }
}

loadFourCards();

// adding event listeners on document load
document.addEventListener("DOMContentLoaded", () => {
  // catch the first 4 cards
  cards = document.querySelectorAll(".card");

  // filters
  for (let i = 0; i < filterBySrcRadioBtns.length; i++) {
    filterBySrcRadioBtns[i].addEventListener("click", filterBySource);
  }

  // mode setter
  for (let i = 0; i < modeRadioBtns.length; i++) {
    modeRadioBtns[i].addEventListener("click", toggleMode);
  }
});
