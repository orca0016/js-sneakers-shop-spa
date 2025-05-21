import { logoIcon, nextIcon, searchIcon } from "../../utils/icons";
import { footer } from "../home/footer";
import {
  decreaseCardItem,
  increaseCardItem,
  removeCard,
  totalPrice,
} from "./oparationsCard";
import { card } from "./singleCardProduct";

export const renderCard = () => {
  const cardData = JSON.parse(localStorage.getItem("card-shop")) || [];
  const cardsContainer = document.getElementById("cards-container");

  cardsContainer.innerHTML = "";
  cardData.forEach((element) => {
    cardsContainer.innerHTML += card(element);
  });
  if (cardData.length===0) {
    cardsContainer.innerHTML = `
    <div class='flex justify-center pt-10 col-span-2 text-center  flex-col items-center'>
        <img src='../../../public/images/not-found.png'/>
        <h2 class='font-bold text-3xl'>Not Found Any Product </h2>
        <p class='text-[#676767]'>
       There are no products in your shopping cart. Please add a product to your cart.
        </p>
    </div>
    `
  }
  removeCard();
  increaseCardItem();
  decreaseCardItem();
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
