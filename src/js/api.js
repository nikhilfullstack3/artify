import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "cW2qU_RKn9nrpUMJx8Fyvojsczr33ww41hhAfxI1LzA",
});

export async function fetchImagesFromCollection(collection) {
  try {
    let data = [];

    const storedData = localStorage.getItem(collection);

    if (storedData) {
      data = JSON.parse(storedData);
    } else {
      const response = await unsplash.search.getPhotos({
        query: collection,
        page: 1,
        perPage: 25,
        orientation: "portrait",
      });

      if (!response) {
        throw new Error("Failed to fetch images");
      }

      data = response.response.results;

      localStorage.setItem(collection, JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
