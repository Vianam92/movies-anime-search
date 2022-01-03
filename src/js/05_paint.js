"use strict";

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
