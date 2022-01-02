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
  const currentTargetId = parseInt(
    eve.currentTarget.getAttribute("data-mal_id")
  );
  const currentTarget = eve.currentTarget;
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
    currentTarget.classList.add("article_results--styles");
    setInLocalStorge();
  } else {
    let foundPosition = dataMoviesPrefer.findIndex(
      (item) => item.mal_id === currentTargetId
    );
    dataMoviesPrefer.splice(foundPosition, 1);
    currentTarget.classList.remove("article_results--styles");
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
  paintMoviesSearch(dataMovies);
  setInLocalStorge();
};

const removeStyleSearch = (data) => {
  const foundFav = dataMoviesPrefer.find((item) => item.mal_id === data.mal_id);
  return foundFav;
};

const validarFavoriteInMovieStyles = () => {
  const foundIdPrefer = dataMoviesPrefer.filter((item) => item.mal_id);

  foundIdPrefer.forEach((x) => {
    document
      .getElementById("res_" + x.mal_id)
      .classList.add("article_results--styles");
  });
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
const divPainter = (
  movie,
  divClassNameOnClick,
  divClassNameImage,
  placeholder,
  type
) => {
  //create div
  let createdDiv = "";
  const createDiv = document.createElement("article");
  createDiv.className = divClassNameOnClick;
  createDiv.id = `${type}_${movie.mal_id}`;
  createDiv.setAttribute("data-mal_id", movie.mal_id);
  if (removeStyleSearch(dataMovies)) {
    createdDiv = "article_results--styles";
    createDiv.classList.add(`${createdDiv}`);
  } else {
    createdDiv = "";
  }
  //create img
  const createImg = document.createElement("img");
  createImg.placeholder = placeholder;
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
    const createdDiv = divPainter(
      movie,
      "js-container article_results",
      "article_results--img",
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV",
      "res"
    );
    //create name
    const createName = document.createElement("h4");
    createName.className = "article_results--text";
    createName.textContent = `${movie.title}`;
    createdDiv.appendChild(createName);
    resultsElement.appendChild(createdDiv);
  }
  listenEventFavorite();
  validarFavoriteInMovieStyles();
};

//paint favorites
const paintFavorite = (data) => {
  favoriteElement.textContent = "";
  //create div con click
  for (const movie of data) {
    const createdDiv = divPainter(
      movie,
      "article_favorite article_results--styles",
      "article_favorite--images",
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV",
      "fav"
    );
    //create name
    const createName = document.createElement("h5");
    createName.className = "article_favorite--text";
    createName.textContent = `${movie.title}`;
    //create emoticon
    const createRemove = document.createElement("div");
    createRemove.className = "article_favorite_x";
    const createP = document.createElement("p");
    createP.className = "article_favorite_x--remove js-remove";
    createP.textContent = "x";
    // createP.id = `favorite_${movie.mal_id}`;
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
