"use strict";

const apiKey = "2f8f50ca469aa025b4445eb6391b78db";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=`;
const apiLink = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const h1 = document.querySelector("#title");
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const content = document.querySelector("#content");
const column = document.querySelector(".site-column");

async function getMovies(url) {
  await fetch(url, {
    method: "GET",
    cache: "default",
    headers: {
      "Content-Type": "aplication/json",
    },
  })
    .then((res) => res.json())

    .then((data) => {
      data.results.forEach((movie) => {
        const card = document.createElement("div");
        const details = document.createElement("div");
        const image = document.createElement("img");
        const title = document.createElement("p");
        const votes = document.createElement("p");
        const reviewsLink = document.createElement("a");
        card.classList.add("card");
        details.classList.add("details");
        image.classList.add("thumbnail");
        title.classList.add("movie-title");
        votes.classList.add("vote-average");
        image.src = imgPath + movie.poster_path;
        image.setAttribute("loading", "lazy");
        title.innerHTML = `${movie.title}`;
        votes.textContent = `⭐${movie.vote_average} / 10`;
        reviewsLink.textContent = "See reviews";
        reviewsLink.setAttribute(
          "href",
          `./pages/movies.html?id=${movie.id}&title=${movie.title}`
        );
        reviewsLink.classList.add("reviews-link");
        card.appendChild(image);
        card.appendChild(details);
        details.appendChild(title);
        details.appendChild(votes);
        details.appendChild(reviewsLink);
        column.appendChild(card);

        card.addEventListener("click", () => {
          window.location = `./pages/movies.html?id=${movie.id}&title=${movie.title}`;
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  column.innerHTML = "";
  const searchItem = search.value;
  if (searchItem) {
    getMovies(searchApi + searchItem);
    changeTitle();
  } else {
    setTitle();
    getMovies(apiLink);
  }
});

const returnHome = document.querySelector("#home");
returnHome.addEventListener("click", () => {
  column.innerHTML = "";
  getMovies(apiLink);
  setTitle();
  search.value = "";
});

const changeTitle = () => {
  h1.textContent = `Results for: ${search.value}`;
};

const setTitle = () => {
  h1.textContent = "Trending Right Now";
};

window.onload = (getMovies(apiLink), setTitle());
