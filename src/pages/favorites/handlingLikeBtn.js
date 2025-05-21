import { heartIcon } from "../../utils/icons";
import { showToast } from "../../utils/toasts/toast";
import { renderCardProducts } from "./favorite-page";

export const handlingLikeBtn = (data, targetElement = "like-product") => {
  const likeButtons = document.getElementsByClassName(targetElement);
  const getFavorites = () =>
    JSON.parse(localStorage.getItem("favorite-product")) || [];

  for (let likeButton of likeButtons) {
    const currentId = +likeButton.getAttribute("data-id");
    const isInitiallyFavorite = getFavorites().some(
      (item) => item.id === currentId
    );
    likeButton.innerHTML = heartIcon(isInitiallyFavorite ? "red" : null);

    if (!likeButton.classList.contains("listener-event-add")) {
      likeButton.classList.add("listener-event-add");

      likeButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const currentId = +likeButton.getAttribute("data-id");
        const favorites = getFavorites();
        const isFavorite = favorites.some((item) => item.id === currentId);

        let newFavorites;
        if (isFavorite) {
          newFavorites = favorites.filter((item) => item.id !== currentId);
          showToast("Product removed from favorites", "danger");
        } else {
          const itemToAdd = data.find((item) => item.id === currentId);
          if (!itemToAdd) return showToast("Product not found", "danger");
          newFavorites = [...favorites, itemToAdd];
          showToast("Product added to favorites", "success");
        }

        localStorage.setItem("favorite-product", JSON.stringify(newFavorites));
        likeButton.innerHTML = heartIcon(!isFavorite ? "red" : null);
        renderCardProducts(newFavorites)
      });
    }
  }
};
