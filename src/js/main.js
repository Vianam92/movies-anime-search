"use strict";

let dataMovies = [];
let dataMoviesPrefer = [];

//variables
const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const resetElement = document.querySelector(".js-reset");
const favoriteElement = document.querySelector(".js-favorite");
const resultsElement = document.querySelector(".js-results");

//get Api
function getApi(ev) {
  ev.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${getValueInputHandler()}`)
    .then((response) => {
      //validación
      if (!response.ok) {
        throw (resultsElement.innerHTML = "Not found");
      }
      return response.json();
    })
    .then((data) => {
      dataMovies = data.results;
      renderMoviesSearch();
      paintMovierPrefer();
    });
}

//get paint movies
const renderMoviesSearch = () => {
  resultsElement.textContent = "";
  for (const movie of dataMovies) {
    //create div
    const createDiv = document.createElement("div");
    createDiv.className = "container";
    createDiv.id = `${movie.mal_id}`;
    //create img
    const createImg = document.createElement("img");
    createImg.className = "images";
    createImg.src = `${movie.image_url}`;
    createImg.alt = `${movie.title}`;
    //create name
    const createName = document.createElement("h4");
    createName.className = "text";
    createName.textContent = `${movie.title}`;
    createDiv.appendChild(createImg);
    createDiv.appendChild(createName);
    resultsElement.appendChild(createDiv);
  }
};

//get pain movies prefer
const paintMovierPrefer = () =>{
favoriteElement.textContent = "";

}

//get Value Input
const getValueInputHandler = () => {
  const valueInput = inputElement.value;
  return valueInput;
};

const getResetHandler = () => {
  console.log("funciona");
};

//helpers
const listenEvents = (element, handler, eventType) => {
  element.addEventListener(eventType, handler);
};

//lister
//input
listenEvents(inputElement, getValueInputHandler, "keyup");
//buscar
listenEvents(btnElement, getApi, "click");
//reset
listenEvents(resetElement, getResetHandler, "click");

renderMoviesSearch();
