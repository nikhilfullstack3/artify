import { updateImages } from "./index.js";

export function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites;
}

const notification = document.querySelector(".notification");
export function toggleFavorite(image, category) {
  const favorites = getFavorites();
  const existingIndex = favorites.findIndex((fav) => fav.id === image.id);

  if (existingIndex !== -1) {
    favorites.splice(existingIndex, 1);
    notification.innerHTML = "Removed From Favorites ";
    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
    }, 2000);
  } else {
    favorites.push(image);
    notification.innerHTML = "Added To Favorites ";
    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
    }, 2000);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  if (category === "favorites") {
    updateImages("favorites");
  }
}

export function isFavorite(image) {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === image.id);
}
