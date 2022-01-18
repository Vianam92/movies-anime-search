"use strict";

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
    currentTarget.classList.add("article_results_styles");
    currentTarget.lastChild.classList.add("article_results_styles--text");
    setInLocalStorge();
  } else {
    let foundPosition = dataMoviesPrefer.findIndex(
      (item) => item.mal_id === currentTargetId
    );
    dataMoviesPrefer.splice(foundPosition, 1);
    currentTarget.classList.remove("article_results_styles");
    currentTarget.lastChild.classList.remove("article_results_styles--text");
    setInLocalStorge();
  }
 paintFavorite(dataMoviesPrefer);
};

//button remove favorite
const renderRemoveFavoriteMovie = (eve) => {
  const currentTargetId = parseInt(eve.currentTarget.dataset.mal_id);
  const findId = dataMoviesPrefer.find(
    (item) => item.mal_id === currentTargetId
  );
  dataMoviesPrefer.splice(findId, 1);
  paintFavorite(dataMoviesPrefer);
  paintMoviesSearch(dataMovies);
  setInLocalStorge();
};

const validarFavoriteInMovieStyles = () => {
  const foundIdPrefer = dataMoviesPrefer.filter((item) => item.mal_id);
  foundIdPrefer.forEach((x) => {
    document
      .getElementById("res_" + x.mal_id)
      .classList.add("article_results_styles");
    document.getElementById("res_" + x.mal_id).lastChild.classList.add('article_results_styles--text');
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
