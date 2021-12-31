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

//renders
//get movies prefer
const renderMoviePrefer = (eve) => {
  const currentTargetId = parseInt(eve.currentTarget.id);
  const currentTarget = eve.currentTarget;
  console.log(currentTarget);
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
    currentTarget.classList.add("section_results--styles");
    setInLocalStorge();
  } else {
    let foundPosition = dataMoviesPrefer.findIndex(
      (item) => item.mal_id === currentTargetId
    );
    dataMoviesPrefer.splice(foundPosition, 1);
    currentTarget.classList.remove("section_results--styles");
    setInLocalStorge();
  }
  paintFavorite(dataMoviesPrefer);
};
//button remove favorite
const renderRemoveFavoriteMovie = (eve) => {
  const currentTargetId = parseInt(eve.currentTarget.id);
  const findId = dataMoviesPrefer.find(
    (item) => item.mal_id === currentTargetId
  );
  dataMoviesPrefer.splice(findId, 1);
  paintFavorite(dataMoviesPrefer);
  setInLocalStorge();
};

//button reset
const getResetHandler = () => {
  localStorage.removeItem("data");
  dataMoviesPrefer = [];
  const idInput = document.getElementById("id");
  idInput.value = "";
  favoriteElement.textContent = "";
  resultsElement.textContent = "";
};

//helpers
const listenEvents = (element, handler, eventType) => {
  element.addEventListener(eventType, handler);
};

//listeners
//buscar
listenEvents(btnElement, getApi, "click");
//reset
listenEvents(resetElement, getResetHandler, "click");

//favorite
const listenEventFavorite = () => {
  const divElement = document.querySelectorAll(".js-container");
  for (const item of divElement) {
    listenEvents(item, renderMoviePrefer, "click");
  }
};
//remove favorite
const listenEventRemove = () => {
  const elementRemove = document.querySelectorAll(".js-remove");
  for (const item of elementRemove) {
    listenEvents(item, renderRemoveFavoriteMovie, "click");
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
    const createdDiv = divPainter(movie, "js-container", "images");
    //create name
    const createName = document.createElement("h4");
    createName.className = "text";
    createName.textContent = `${movie.title}`;
    createdDiv.appendChild(createName);
    resultsElement.appendChild(createdDiv);
  }
  validarFavoriteInMovieStyles();
  listenEventFavorite();
};

const validarFavoriteInMovieStyles = () => {
  const foundIdPrefer = dataMoviesPrefer.filter((item) => item.mal_id);
  const foundIdMovies = dataMovies.find((item) => item.mal_id);
  if (foundIdPrefer === foundIdMovies) {
    const element = document.querySelector(".js-container");
    if (!element.classList.contains("section_results--styles")){
      element.classList.add("section_results--styles");
    }
  }
  paintMoviesSearch(dataMovies);
};

//paint favorites
const paintFavorite = (data) => {
  favoriteElement.textContent = "";
  //create div con click
  for (const movie of data) {
    const createdDiv = divPainter(movie, "div_favorite section_favorite--styles", "images_favorite");

    //create name
    const createName = document.createElement("h5");
    createName.className = "text";
    createName.textContent = `${movie.title}`;
    //create emoticon
    const createRemove = document.createElement("div");
    createRemove.className = "remove";
    const createP = document.createElement("p");
    createP.className = "remove-movie js-remove";
    createP.textContent = "x";
    createP.id = `${movie.mal_id}`;
    createRemove.appendChild(createP);
    createdDiv.appendChild(createName);
    createdDiv.appendChild(createRemove);
    favoriteElement.appendChild(createdDiv);
  }
  listenEventRemove();
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
