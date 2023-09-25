import { fetchImagesFromCollection } from "./api.js";
import { getFavorites } from "./favorites.js";
import { renderImages } from "./gallery.js";

const sortByRatingButton = document.getElementById("sort-by-rating");
const sortByTimestampButton = document.getElementById("sort-by-timestamp");

const navbar = document.querySelector(".navbar");
const imageContainer = document.getElementById("image-container");

const categoryTitle = document.getElementById("category-title");

let selectedCategory = "classic art";

export const updateImages = async (category) => {
  categoryTitle.innerHTML = category.toUpperCase();
  try {
    if (category === "favorites") {
      const favoriteImages = getFavorites();
      renderImages(favoriteImages, imageContainer, category);
    } else {
      const images = await fetchImagesFromCollection(category);
      renderImages(images, imageContainer, category);
    }
  } catch (error) {
    console.error(error);
  }
};

navbar.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const category = event.target.getAttribute("data-category");

    if (category !== selectedCategory) {
      navbar
        .querySelector(`[data-category="${selectedCategory}"]`)
        .classList.remove("selected");
      event.target.classList.add("selected");
      selectedCategory = category;

      updateImages(category);
    }
  }
});

navbar
  .querySelector(`[data-category="${selectedCategory}"]`)
  .classList.add("selected");

const showFullImage = (imageData) => {
  const fullImageContainer = document.getElementById("full-image-container");
  const fullImage = document.getElementById("full-image");
  const imageDescription = document.getElementById("image-description");
  const imageUsername = document.getElementById("image-username");

  fullImage.src = imageData.urls.full;
  fullImage.alt = imageData.alt_description;
  imageDescription.textContent =
    imageData.description || imageData.alt_description;
  imageUsername.textContent = `Posted By :${imageData.user.name}` || "Unknown";

  fullImageContainer.style.display = "block";
};

const hideFullImage = () => {
  const fullImageContainer = document.getElementById("full-image-container");
  fullImageContainer.style.display = "none";
};

const closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", hideFullImage);

imageContainer.addEventListener("click", async (e) => {
  const clickedImage = e.target.closest(".image");
  if (clickedImage) {
    const imageId = clickedImage.getAttribute("data-id");
    const imageCat = clickedImage.getAttribute("data-category");
    console.log(imageCat);

    const storedImages = JSON.parse(localStorage.getItem(imageCat));
    if (storedImages) {
      const imageData = storedImages.find((image) => image.id === imageId);
      if (imageData) {
        showFullImage(imageData);
      }
    }
  }
});

const logo = document.querySelector(".navbar-logo");
logo.addEventListener("click", function () {
  navbar
    .querySelector(`[data-category="${selectedCategory}"]`)
    .classList.remove("selected");
  selectedCategory = "classic art";
  navbar
    .querySelector(`[data-category="${selectedCategory}"]`)
    .classList.add("selected");
  updateImages(selectedCategory);
});

sortByRatingButton.addEventListener("click", () => {
  const storedImages = JSON.parse(localStorage.getItem(selectedCategory));

  if (storedImages && storedImages.length > 0) {
    storedImages.sort((a, b) => b.likes - a.likes);

    renderImages(storedImages, imageContainer, selectedCategory);
  }
});

sortByTimestampButton.addEventListener("click", () => {
  const newImage = JSON.parse(localStorage.getItem(selectedCategory));

  function dateToTimestamp(dateString) {
    return new Date(dateString).getTime();
  }

  newImage.sort(
    (a, b) => dateToTimestamp(b.created_at) - dateToTimestamp(a.created_at)
  );

  renderImages(newImage, imageContainer, selectedCategory);
});

// JavaScript code to handle scrolling

// JavaScript code to handle scrolling
// JavaScript code to handle scrolling
const nav = document.querySelector(".sticky");
let scrollTimeout;

function hideNavBar() {
  nav.classList.add("hidden");
}

function showNavBar() {
  nav.classList.remove("hidden");
}

window.addEventListener("scroll", function () {
  // Clear the previous timeout to prevent immediate hiding
  clearTimeout(scrollTimeout);

  // Hide the navigation bar when scrolling starts
  hideNavBar();

  // Set a timeout to check if scrolling has stopped
  scrollTimeout = setTimeout(function () {
    // If no scrolling has occurred for a certain duration, show the navigation bar
    showNavBar();
  }, 500); // Adjust the duration as needed (in milliseconds)
});

updateImages(selectedCategory);
