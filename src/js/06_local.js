"use strict";

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
