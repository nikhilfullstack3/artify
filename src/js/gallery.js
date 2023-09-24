import { toggleFavorite, isFavorite } from "./favorites.js";
export function renderImages(images, container, category) {
  container.innerHTML = "";
  images.forEach((image) => {
    const imageElement = createImageElement(image, category);
    if (imageElement) {
      container.appendChild(imageElement);
    }
  });
}

export function createImageElement(image, category) {
  const { id, alt_description, urls } = image;

  const imageDiv = document.createElement("div");
  imageDiv.className = "image";
  imageDiv.setAttribute("data-id", id);
  imageDiv.setAttribute("data-category", category);

  const img = document.createElement("img");
  img.src = urls.small;
  img.alt = alt_description;

  const likeButton = document.createElement("button");

  likeButton.className = `like-button ${isFavorite(image) ? "liked" : ""}`;
  likeButton.innerHTML = isFavorite(image) ? "LIKE &#9829;" : "LIKE &#9825;";
  likeButton.addEventListener("click", (e) => {
    e.stopPropagation();

    likeButton.classList.toggle("liked");

    toggleFavorite(image, category);
  });

  imageDiv.appendChild(img);
  imageDiv.appendChild(likeButton);

  return imageDiv;
}
