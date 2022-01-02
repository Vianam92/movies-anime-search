"use strict";

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
