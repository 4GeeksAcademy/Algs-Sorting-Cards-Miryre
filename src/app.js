import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  const suits = [
    { symbol: "♠", class: "black" },
    { symbol: "♥", class: "red" },
    { symbol: "♦", class: "red" },
    { symbol: "♣", class: "black" }
  ];

  const numbs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let drawnCards = [];

  function createFullDeck() {
    const deck = [];
    for (let suit of suits) {
      for (let i = 0; i < numbs.length; i++) {
        deck.push({
          suit: suit.symbol,
          class: suit.class,
          value: numbs[i],
          numeric: i + 1
        });
      }
    }
    return deck;
  }

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function renderDeck(cards, containerId = "deck") {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (const card of cards) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "plcard";
      cardDiv.innerHTML = `
        <span class="suit-top ${card.class}">${card.suit}</span>
        <span class="numberr ${card.class}">${card.value}</span>
        <span class="suit-bttm ${card.class}">${card.suit}</span>
      `;
      container.appendChild(cardDiv);
    }
  }

  function generateRandomDeck() {
    const userInput = parseInt(document.getElementById("cardCount").value);
    if (isNaN(userInput) || userInput < 4 || userInput > 13) {
      alert("Please enter a number between 4 and 13.");
      return;
    }

    const chosenDeck = createFullDeck();
    shuffle(chosenDeck);
    drawnCards = chosenDeck.slice(0, userInput);
    renderDeck(drawnCards);
    document.getElementById("sort-log").innerHTML = "";
  }

  function bubbleSort(cards) {
    const log = document.getElementById("sort-log");
    let arr = [...cards];
    let len = arr.length;
    let sortedSteps = [];

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j].numeric > arr[j + 1].numeric) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          sortedSteps.push([...arr]);
        }
      }
    }

    log.innerHTML = "";
    sortedSteps.forEach((step, index) => {
      const row = document.createElement("div");
      row.className = "sorted-row";
      row.innerHTML = `<strong>Step ${index + 1}:</strong>`;
      step.forEach(card => {
        const miniCard = document.createElement("div");
        miniCard.className = "plcard";
        miniCard.innerHTML = `
          <span class="suit-top ${card.class}">${card.suit}</span>
          <span class="numberr ${card.class}">${card.value}</span>
          <span class="suit-bttm ${card.class}">${card.suit}</span>
        `;
        row.appendChild(miniCard);
      });
      log.appendChild(row);
    });

    drawnCards = arr;
    renderDeck(drawnCards);
  }

  document.getElementById("drawBtn").addEventListener("click", generateRandomDeck);
  document.getElementById("sortBtn").addEventListener("click", () => bubbleSort(drawnCards));
};
