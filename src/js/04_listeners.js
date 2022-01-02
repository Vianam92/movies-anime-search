"use strict";

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
