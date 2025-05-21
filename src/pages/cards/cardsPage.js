import gsap from "gsap/all";
import { logoIcon, nextIcon, searchIcon, trashIcon } from "../../utils/icons";
import { showToast } from "../../utils/toasts/toast";
import { footer } from "../home/footer";

const closeAnimationDialog = (dialogWrapper) => {
  let timelineAnimation = gsap.timeline({
    onComplete: () => {
      dialogWrapper.classList.add("hidden");
      dialogWrapper.classList.remove("flex");
      document.getElementById("body").style.overflow = "auto";
    },
  });
  timelineAnimation
    .to(".content-dialog-card", { duration: 0, y: 0 })
    .to(".content-dialog-card", { duration: 0.3, y: 600, ease: "power2.in" })
    .to("#dialog-wrapper", { duration: 0, opacity: 0 });
};
const totalPrice = () => {
  const totalItem = JSON.parse(localStorage.getItem("card-shop")) || [];
  let totalPrices = 0;
  totalItem.forEach((item) => {
    totalPrices += item.price * item.productQuantity;
  });
  const contTotalPrice = document.getElementById("total-price-checkout-card");
  contTotalPrice.innerText = `$${totalPrices}`;
};
const card = (item, isDialogOpen) => {
  return `<div data-id="${
    item.id
  }" class='flex gap-4 items-center bg-[#f9f9f9] p-4 rounded-3xl shadow-2xl'>
                <img src='${
                  item.imageURL
                }' class='w-[100px] h-[100px] object-cover rounded-2xl' />
                
                <div class='flex flex-col flex-1 gap-2'>
                  <div class='flex justify-between items-start'>
                    <h1 class='font-semibold text-base line-clamp-1 '>${
                      item.name
                    }</h1>
                    <button   data-id="${item.id}" class='remove-button-card ${
    isDialogOpen ? "hidden" : null
  }'>${trashIcon()}</button>
                  </div>

                  <div class='flex items-center text-sm text-gray-600 gap-4'>
                    <div class='w-4 h-4 rounded-full' style="background-color:${
                      item.productColor
                    };"></div>
                    <span class='border-r pr-2'>${item.productColor}</span>
                    <span>Size: ${item.productSize}</span>
                  </div>

                  <div class='flex justify-between items-center'>
                    <h2 class='font-semibold text-lg'>$${
                      item.price * item.productQuantity
                    }</h2>
                    <div class='flex items-center gap-3 bg-gray-200  px-3 py-1 rounded-full text-base'>
                      <button data-id="${
                        item.id
                      }" class='minus-products' >-</button>
                      <span >${item.productQuantity}</span>
                      <button  data-id="${
                        item.id
                      }" class='plus-products'>+</button>
                    </div>
                  </div>
                </div>
              </div>`;
};
const removeHandling = (product) => {
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
  });
  dialogContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });
};
const renderCard = () => {
  const cardData = JSON.parse(localStorage.getItem("card-shop")) || [];
  const cardsContainer = document.getElementById("cards-container");

  cardsContainer.innerHTML = "";
  cardData.forEach((element) => {
    cardsContainer.innerHTML += card(element);
  });
  removeCard();
  increaseCardItem();
  decreaseCardItem();
};
const removeCard = () => {
  let cardData = JSON.parse(localStorage.getItem("card-shop")) || [];
  const removeButtonCard =
    document.getElementsByClassName("remove-button-card");
  for (let item of removeButtonCard) {
    item.addEventListener("click", () => {
      cardData.forEach((el, index) => {
        if (el.id === Number(item.getAttribute("data-id"))) {
          removeHandling(cardData[index]);
        }
      });
    });
  }
  totalPrice();
};
const increaseCardItem = () => {
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
const decreaseCardItem = () => {
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
export const cardPage = () => {
  const htmlElement = `
    <div class='bg-white min-h-[100vh] px-6 py-10'>
      <div class='flex justify-between items-center'>
        <h2 class='flex gap-3 items-center'>
          <span class='w-4 h-4'>${logoIcon()}</span>
          <span class='font-bold text-lg'>My Cart</span>
        </h2>
        <div class='text-black'>
          ${searchIcon()}
        </div>
      </div>

      <div class='py-10 pb-40 space-y-6' id='cards-container'></div>
      <div id='dialog-wrapper' class=' hidden fixed w-full h-screen bg-black/60 top-0 left-0 z-[1000]  justify-center items-end'>
        <div  class='content-dialog-card bg-white rounded-t-4xl w-full  px-6 max-w-[400px] pb-8 relative'>
        <div class='absolute left-0 top-2  flex justify-center w-full'>
        <span class='rounded-xl bg-[#DADADB] px-6 py-0.5'></span>
        </div>  
          <h1 class='py-6 border-[#E8E8E8] border-b text-center text-2xl font-[500]'>Remove From Cart? </h1>
          <div class='py-6 border-[#E8E8E8] border-b' id='content-dialog-cards'></div>
          <div class='py-4 grid grid-cols-2 px-3 gap-2'>
              <button class='rounded-4xl bg-[#E7E7E7] py-4' id='close-dialog-card'>Cancel</button>
              <button class='rounded-4xl bg-black shadow-2xl py-4 text-white' id='remove-dialog-card'>Yes,Remove</button>
          </div>
        </div>
      </div>
      <div class='fixed bottom-16 left-0 w-full '>
        <div class='max-w-[450px] mx-auto bg-white rounded-t-[30px] border-t border-gray-line grid grid-cols-4 gap-3 px-6 py-6 items-center'>
          <div class='col-span-1'>
              <p class='text-gray-text-search text-sm'> Total price</p>
              <h1 class='text-2xl font-bold' id='total-price-checkout-card'>1532</h1>
          </div>
          <a href='/checkout' data-navigo class='col-span-3 text-2xl font-light bg-black shadow-xl px-10 py-4 rounded-full text-white flex items-center justify-center gap-4'>Checkout${nextIcon()}</a>
        </div>
      </div>
      ${footer()}
    </div>
  `;

  document.getElementById("app").innerHTML = htmlElement;
  renderCard();
  removeCard();
  increaseCardItem();
  decreaseCardItem();
  totalPrice();
};
