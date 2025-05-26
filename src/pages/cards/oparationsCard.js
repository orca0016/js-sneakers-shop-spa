import gsap from "gsap/all";
import { showToast } from "../../utils/toasts/toast";
import { closeAnimationDialog } from "./animationsDialogCard";
import { goToPayment, renderCard } from "./cardsPage";
import { card } from "./singleCardProduct";

const removeHandlingDialog = (product) => {
  const dialogWrapper = document.getElementById("dialog-wrapper");
  const dialogContent = dialogWrapper.querySelector(".content-dialog-card");
  const closeDialogCard = document.getElementById("close-dialog-card");
  const contentDialogCards = document.getElementById("content-dialog-cards");
  const removeDialogCard = document.getElementById("remove-dialog-card");
  contentDialogCards.innerHTML = card(product, true);

  let timelineAnimation = gsap.timeline({
    onStart: () => {
      dialogWrapper.classList.remove("hidden");
      dialogWrapper.classList.add("flex");
      document.getElementById("body").style.overflow = "auto";
    },
  });
  timelineAnimation
    .to("#dialog-wrapper", { duration: 0, opacity: 100 })
    .to(".content-dialog-card", { duration: 0, y: 600 })
    .to(".content-dialog-card", { duration: 0.5, y: 0, ease: "power2.out" });

  dialogWrapper.addEventListener("click", () => {
    closeAnimationDialog(dialogWrapper);
  });
  closeDialogCard.addEventListener("click", () => {
    closeAnimationDialog(dialogWrapper);
  });
  removeDialogCard.addEventListener("click", () => {
    let cardData = JSON.parse(localStorage.getItem("card-shop")) || [];
    if (cardData.find((item) => item.id === product.id)) {
      showToast("Product successfully removed from cart. ", "success");
    }
    cardData = cardData.filter((el) => el.id !== product.id);
    localStorage.setItem("card-shop", JSON.stringify(cardData));
    renderCard();
    closeAnimationDialog(dialogWrapper);
    goToPayment()
  });
  dialogContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });
};
export const removeCard = () => {
  let cardData = JSON.parse(localStorage.getItem("card-shop")) || [];
  const removeButtonCard =
    document.getElementsByClassName("remove-button-card");
  for (let item of removeButtonCard) {
    item.addEventListener("click", () => {
      cardData.forEach((el, index) => {
        if (el.id === Number(item.getAttribute("data-id"))) {
          removeHandlingDialog(cardData[index]);
        }
      });
    });
  }
  totalPrice();
};
export const increaseCardItem = () => {
  let cardData = JSON.parse(localStorage.getItem("card-shop")) || [];
  const minusProducts = document.getElementsByClassName("plus-products");
  for (let element of minusProducts) {
    element.addEventListener("click", () => {
      const btnId = element.getAttribute("data-id");
      cardData.forEach((item, index) => {
        if (item.id === +btnId) {
          if (item.productQuantity < 10) {
            cardData[index].productQuantity++;
            localStorage.setItem("card-shop", JSON.stringify(cardData));
            renderCard();
          }
        }
      });
    });
  }
  totalPrice();
};
export const decreaseCardItem = () => {
  let cardData = JSON.parse(localStorage.getItem("card-shop")) || [];
  const minusProducts = document.getElementsByClassName("minus-products");
  for (let element of minusProducts) {
    element.addEventListener("click", () => {
      const btnId = element.getAttribute("data-id");
      cardData.forEach((item, index) => {
        if (item.id === +btnId) {
          if (item.productQuantity > 1) {
            cardData[index].productQuantity--;
            localStorage.setItem("card-shop", JSON.stringify(cardData));
            renderCard();
          }
        }
      });
    });
  }
  totalPrice();
};
export const totalPrice = () => {
  const totalItem = JSON.parse(localStorage.getItem("card-shop")) || [];
  let totalPrices = 0;
  totalItem.forEach((item) => {
    totalPrices += item.price * item.productQuantity;
  });
  const contTotalPrice = document.getElementById("total-price-checkout-card");
  contTotalPrice.innerText = `$${totalPrices}`;
};