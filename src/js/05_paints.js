'use strict';

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
  const createImg = document.createElement("img");
  //create img
  if (nullImg === null) {
    createImg.src = `${nullImg}`;
  }
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
    listenEventFavorite();
    validarFavoriteInMovieStyles();
  }
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
