let columSizeEl = document.getElementById("numberOfColumns");
let cardContainer = document.getElementById("card-container");
var rootEl = document.querySelector(":root");
let cardsToShow = "dynamic";

function dropdownHandler() {
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
columSizeEl.addEventListener("change", dropdownHandler);

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
