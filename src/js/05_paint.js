"use strict";

//Function reUse
const painter = (
  movie,
  classNameOnClick,
  classNameImage,
  classNameTitle,
  placeholder,
  type
) => {
  //create div
  //let createdCont = "";
  //let createdName = "";
  const createCont = document.createElement("article");
  createCont.className = classNameOnClick;
  createCont.id = `${type}_${movie.mal_id}`;
  createCont.setAttribute("data-mal_id", movie.mal_id);
  //create img
  const createImg = document.createElement("img");
  createImg.className = classNameImage;
  createImg.src = `${movie.image_url}`;
  createImg.alt = `${movie.title}`;
  //create name
  const createName = document.createElement("h4");
  createName.className = classNameTitle;
  createName.textContent = `${movie.title}`;
  //evaluo si mi funcion se cumple para agregar o no la clase.
  /*if (removeStyleSearch(dataMovies)) {
    createdCont = "article_results_styles";
    createdName = "article_results_styles--text";
    createCont.classList.add(`${createdCont}`);
    createName.classList.add(`${createdName}`);
    createdCont = "";
    createdName = "";
  }*/
  //evaluo el valor de img
  if (createImg.src === null) {
    createImg.src = placeholder;
  }
  createCont.appendChild(createImg);
  createCont.appendChild(createName);

  return createCont;
};

//get paint movies
const paintMoviesSearch = (data) => {
  resultsElement.textContent = "";
  for (const movie of data) {
    const createdCont = painter(
      movie,
      "js-container article_results",
      "article_results--img",
      "article_results--text",
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV",
      "res"
    );
    resultsElement.appendChild(createdCont);
  }
  listenEventFavorite();
  validarFavoriteInMovieStyles();
};

//paint favorites
const paintFavorite = (data) => {
  favoriteElement.textContent = "";
  //create div con click
  for (const movie of data) {
    const createdCont = painter(
      movie,
      "article_favorite article_results_styles",
      "article_favorite--images",
      "article_favorite--text",
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV",
      "fav"
    );
    //create emoticon
    const createRemove = document.createElement("div");
    createRemove.className = "article_favorite_x";
    const createP = document.createElement("p");
    createP.className = "article_favorite_x--remove js-remove";
    createP.textContent = "x";
    createRemove.appendChild(createP);
    createdCont.appendChild(createRemove);
    favoriteElement.appendChild(createdCont);
  }
  listenEventRemove();
};
