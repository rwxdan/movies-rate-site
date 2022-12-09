"use strict";

const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const apiLink = `../server/api/v1/`;

const h2 = document.querySelector("#title");
const content = document.querySelector("#content");
const column = document.querySelector(".reviews-column");

h2.textContent = movieTitle;

getReviews(apiLink);

async function getReviews(url) {
  await fetch(`${url}movie/${movieId}`, {
    method: "GET",
    cache: "default",
    headers: {
      "Content-Type": "aplication/json",
    },
  })
    .then((res) => res.json())

    .then((data) => {
      data.forEach((review) => {
        const card = document.createElement("div");
        card.setAttribute("id", `"${review._id}"`);
        card.classList.add("review card");
        card.innerHTML = `
        <p class="reviews-content">Review: ${review.review}</p>
        <p class="reviews-content">User: ${review.user}</p>
        <p><a class="review-link" href="#" onclick="editReview('${review._id}', '${review.preview}', '${review.user}')"><i class="fa-regular fa-pen-to-square"></i></a><a                     class="user-action"
        href="#" onclick="deleteReview('${review._id}')"><i class="fa-regular fa-trash"></i></a></p>
        `;
        column.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editReview(id, review, user) {
  const card = document.querySelector("#id");
  const reviewInputId = `review ${id}`;
  const userInputId = `user ${id}`;
  card.innerHTML = `
  <p class="reviews-content">Review:
    <input type="text" class="add-review" id="${reviewInputId}" value="${review}">
  </p>
  <p class="reviews-content">User:
    <input type="text" class="add-user" id="${userInputId}" value="${user}">
  </p>
  <p class="reviews-content"><a                     class="user-action"
  href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')"><i class="fa-solid fa-floppy-disk"></i></a></p>
  `;
}

//TO FIX

// function saveReview(reviewInputId, userInputId, id = "") {
//   const review = document.querySelector(`#${reviewInputId}`).value;
//   const user = document.querySelector(`#${userInputId}`).value;

//   fetch(apiLink + "new", {
//     method: "POST",
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ user: user, review: review, movieId: movieId }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       location.reload();
//     });
// }
