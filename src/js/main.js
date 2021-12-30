"use strict";

let dataMovies = [];
let dataMoviesPrefer = [];

//variables
const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const resetElement = document.querySelector(".js-reset");
const favoriteElement = document.querySelector(".js-favorite");
const resultsElement = document.querySelector(".js-results");

//get Value Input
const getValueInputHandler = () => {
  const valueInput = inputElement.value;
  return valueInput;
};

//get movies prefer
const renderMoviePrefer = (eve) => {
  const currentTargetId = parseInt(eve.currentTarget.id);
  //const currentTarget = eve.currentTarget;
  //1er busco el id en mi array favorite
  let foundIdFavorite = dataMoviesPrefer.find(
    (item) => item.mal_id === currentTargetId
  );
  //findIdFavorite dara undefine pq no tiene aun datos
  if (foundIdFavorite === undefined) {
    let foundId = dataMovies.find((item) => item.mal_id === currentTargetId);
    //si no esta la agrego
    dataMoviesPrefer.push({
      mal_id: foundId.mal_id,
      title: foundId.title,
      image_url: foundId.image_url,
    });
    setInLocalStorge();
  } else {
    foundIdFavorite;
  }
  paintFavorite(dataMoviesPrefer);
};

//button reset
const getResetHandler = () => {
  localStorage.removeItem("data");
  dataMoviesPrefer = [];
  const idInput = document.getElementById('id');
  idInput.value = '';
  favoriteElement.textContent = "";
  resultsElement.textContent = "";
};

//helpers
const listenEvents = (element, handler, eventType) => {
  element.addEventListener(eventType, handler);
};

//listeners
//input
listenEvents(inputElement, getValueInputHandler, "keyup");
//buscar
listenEvents(btnElement, getApi, "click");
//reset
listenEvents(resetElement, getResetHandler, "click");

//favorite
const listenEventFavorite = () => {
  const divElement = document.querySelectorAll(".container");
  for (const item of divElement) {
    listenEvents(item, renderMoviePrefer, "click");
  }
};

//Function reUse
const divPainter = (movie, divClassNameOnClick, divClassNameImage) => {
  //create div
  const createDiv = document.createElement("div");
  createDiv.className = divClassNameOnClick;
  createDiv.id = `${movie.mal_id}`;

  //create img
  const createImg = document.createElement("img");
  createImg.className = divClassNameImage;
  createImg.src = `${movie.image_url}`;
  createImg.alt = `${movie.title}`;

  createDiv.appendChild(createImg);

  return createDiv;
};

//get paint movies
const paintMoviesSearch = (data) => {
  resultsElement.textContent = "";
  for (const movie of data) {
    const createdDiv = divPainter(movie, "container", "images");

    //create name
    const createName = document.createElement("h4");
    createName.className = "text";
    createName.textContent = `${movie.title}`;
    createdDiv.appendChild(createName);
    resultsElement.appendChild(createdDiv);
  }
  listenEventFavorite();
};

//paint favorites
const paintFavorite = (data) => {
  favoriteElement.textContent = "";
  //create div con click
  for (const movie of data) {
    const createdDiv = divPainter(movie, "div_favorite", "images_favorite");

    //create name
    const createName = document.createElement("h5");
    createName.className = "text";
    createName.textContent = `${movie.title}`;
    //create emoticon
    const createRemove = document.createElement("div");
    createRemove.className = "remove";
    createRemove.className = "fa-solid fa-xmark";
    createdDiv.appendChild(createName);
    createdDiv.appendChild(createRemove);
    favoriteElement.appendChild(createdDiv);
  }
};

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
      paintMoviesSearch(dataMovies);
    });
}

//local Storage
//guardo en el local
const setInLocalStorge = () => {
  const stringifyData = JSON.stringify(dataMoviesPrefer);
  localStorage.setItem("data", stringifyData);
};

// lo recupero
const getFromLocalStorage = () => {
  const localStorageData = localStorage.getItem("data");
  if (localStorageData !== null) {
    dataMoviesPrefer = JSON.parse(localStorageData);
  }
  //get paint
  paintFavorite(dataMoviesPrefer);
};
getFromLocalStorage();
