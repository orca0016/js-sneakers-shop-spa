import { heartIcon } from "./icons";
import { showToast } from "./toasts/toast";

export const addFavorite = (data , targetElement="like-product") => {
  const likeButton = document.getElementById(targetElement);

  const getFavorites = () =>
    JSON.parse(localStorage.getItem("favorite-product")) || [];

  const isInitiallyFavorite = getFavorites().some(
    (item) => item.id === data.id
  );
  likeButton.innerHTML = heartIcon(isInitiallyFavorite ? "red" : null);

  likeButton.addEventListener("click", () => {
    let favorites = getFavorites();
    const isFavorite = favorites.some((item) => item.id === data.id);
    likeButton.innerHTML = heartIcon(!isFavorite ? "red" : null);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((item) => item.id !== data.id);
      showToast("Product removed from favorites", "danger");
    } else {
      newFavorites = [...favorites, data];
      showToast("Product added to favorites", "success");
    }
    localStorage.setItem("favorite-product", JSON.stringify(newFavorites));
    
  });
};
