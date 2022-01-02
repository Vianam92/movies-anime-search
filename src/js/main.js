"use strict";
//let data = [];
let dataMovies = [];
let dataMoviesPrefer = [];

//varibles
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

//get Api Search Results
function getApiSearch(ev) {
  ev.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${getValueInputHandler()}&=1`)
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
    foundIdFavorite;
    foundPositionMoviesPrefer(currentTarget, currentTargetId);
    setInLocalStorge();
  }
  paintFavorite(dataMoviesPrefer);
  paintMoviesSearch(dataMovies);
};

const addOrRemoveClass = (dataM) => {
  const foundId = dataMoviesPrefer.find((data) => data.mal_id === dataM);
  if (foundId === undefined) {
    return false;
  } else {
    return true;
  }
};

const foundPositionMoviesPrefer = (currentTarget, id) => {
  let foundPosition = dataMoviesPrefer.findIndex((item) => item.mal_id === id);
  dataMoviesPrefer.splice(foundPosition, 1);
  currentTarget.classList.remove("article_results--styles");
};

/*const removeStyleFromFavorite = (id) => {
  const foundFav = dataMovies.findIndex((item) => parseInt(item.mal_id) === id);
  if (foundFav) {
    for (const data of dataMovies) {
      document
        .getElementById("res_" + data.mal_id)
        .classList.remove("article_results--styles");
    }
  }
};*/

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
listenEvents(btnElement, getApiSearch, "click");
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
    listenEvents(item, renderMoviePrefer, "click");
  }
};

//Function reUse
const divPainter = (
  movie,
  divClassNameOnClick,
  divClassNameImage,
  nullImg,
  type
) => {
  //create div
  const createDiv = document.createElement("article");
  createDiv.className = divClassNameOnClick;
  createDiv.id = `${type}_${movie.mal_id}`;
  createDiv.setAttribute("data-mal_id", movie.mal_id);

  //create img
  if (nullImg === null) {
    createImg.src = `${nullImg}`;
  }
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
    const createdDiv = divPainter(
      movie,
      "js-container article_results",
      "article_results--img",
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV",
      "res"
    );
    const isFav = addOrRemoveClass(dataMovies);
    //create name
    const createName = document.createElement("h4");
    createName.className = "article_results--text";
    createName.textContent = `${movie.title}`;
    createdDiv.appendChild(createName);
    resultsElement.appendChild(createdDiv);
    if (isFav) {
      createdDiv.classList.add("article_results--styles");
    } else {
      createdDiv.classList.remove("article_results--styles");
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
    createRemove.className = "article_favorite_x remove js-remove";
    createRemove.id = `fav_${movie.mal_id}`;
    createRemove.setAttribute("data-mal_id", movie.mal_id);
    const createP = document.createElement("p");
    createP.className = "article_favorite_x--remove";
    createP.textContent = "x";
    createRemove.appendChild(createP);
    createdDiv.appendChild(createName);
    createdDiv.appendChild(createRemove);
    favoriteElement.appendChild(createdDiv);
  }
  listenEventRemove();
};

//getApi
/*function getApiPrincipal() {
  fetch("https://api.jikan.moe/v3/anime/")
    .then((response) => response.json())
    .then((movies) => {
      data = movies;
      console.log(data);
      //paintMoviesSearch(data);
    });
}*/

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
