"use strict";

//get Value Input
const getValueInputHandler = () => {
  const valueInput = inputElement.value;
  return valueInput;
};

//get Api
function getApi(ev) {
  ev.preventDefault();
  fetch(
    `https://api.jikan.moe/v3/search/anime?q=${getValueInputHandler()}?page=1`
  )
    .then((response) => {
      //validación
      if (!response.ok) {
        throw (resultsElement.innerHTML = "Not found");
      }
      return response.json();
    })
    .then((data) => {
      dataMovies = data.results.map((info) => {
        return {
          mal_id: info.mal_id,
          title: info.title,
          image_url: info.image_url,
        };
      });
      paintMoviesSearch(dataMovies);
    });
}
