import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Pagination } from "swiper/modules";
import optionCard from "../../libs/globalState";
import {
  backIcon,
  bagIcon2,
  minusIcon,
  plusIcon,
  starIcon,
} from "../../utils/icons";
import { addFavorite } from "../../utils/likeHandeling";
import { createFormAddProduct } from "./optionsAddToCard";
import { getPRoduct } from "../../../apis/products";
import { checkExpireToken } from "../../utils/errors";
import { router } from "../../main";

export  async function renderProduct (data){
    try {
    const product = await getPRoduct(data.id)
    showProduct(product)
  } catch (error) {
    console.log(error);
    checkExpireToken(error.response.request.status);
  }
}
 function showProduct(data) {
  document.getElementById("app").innerHTML = `
    <button id="close-modal" class="absolute top-[20px] left-[20px] z-10">${backIcon()}</button>
    <div class="swiper mySwiper" >
      <div class="swiper-wrapper">
    ${[1, 2, 3, 4, 5, 6].map(
      () =>
        `<div class="swiper-slide">
              <img src='${data.imageURL}' class='w-full' onerror="this.onerror=null;this.src='https://placeholder.pics/svg/300/EAEAEA-E8E8E8/000000-FFFFFF/image%20not%20found';" />
          </div>`
    )}
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class='px-[25px] pt-4'>
        <div class='flex justify-between items-center py-2  '>
            <h2 class='text-xl font-bold  text-[1.4rem]'>${data.name}</h2>
            <button id="like-product" ></button>
        </div>
        <div class='flex items-center py-2 border-b border-gray-line gap-5' >
            <span class='px-2 py-1 bg-[#ECECED] rounded-sm text-sm' >5.371</span>
            <div class='flex items-center gap-1'>
                <span>${starIcon()}</span>
                <span class='text-sm text-badge-gray'>4.3(5389 reviews)</span>
            </div>
        </div>
        <div class='mt-5'>
            <h2 class='text-[1.2rem] font-[600]'>Description</h2>
            <p class='font-light text-[#6B6B6C] font-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eveniet doloremque! Accusantium voluptas, a cum quam nam</p>
        </div> 
        <form id='form-sub-product' class='mt-5'>
            <div class='grid grid-cols-2'>
                <div class=''>
                    <h2 class='text-2xl'>Size</h2>
                    <div id='size-btns' class='overflow-x-auto flex gap-4 py-3'></div>
                </div>
                <div class=''>
                    <h2 class='text-2xl'>Color</h2>
                    <div id='color-btns' class=' overflow-x-auto flex gap-4 py-3'></div>
                </div>
            </div>
            <div class='flex items-center gap-5 mt-5 border-b border-gray-line pb-5'>
                <span class='text-[1.2rem] font-[700]'>Quantity</span>
                <span class='bg-[#F3F3F3] rounded-full flex gap-4 text-xl items-center px-3 py-2'>
                    <button type="button" id='decrease-quantity'>${minusIcon()}</button>
                    <span id='show-quantity'>${
                      optionCard.productQuantity
                    }</span>
                    <button type="button" id='increase-quantity'>${plusIcon()}</button>
                </span>
            </div>
            <div class='flex items-center justify-between pb-[36px] mt-5'>
            <div>
              <p class='text-sm text-gray-text-search font-light'>Total price</p>
            <p class='text-lg' id='total-price'>$${
              data.price * optionCard.productQuantity
            }</p>
            </div>
                <button type="submit" class='bg-black shadow-xl rounded-full flex gap-[10px] items-center px-[60px]  text-white py-[15px]'>${bagIcon2()} <span>add to  Cart</span></button>
            </div>
        </form>
    </div>
  `;

  // handling the like btn
  addFavorite(data);


  createFormAddProduct(data, optionCard);
  document.getElementById("close-modal").onclick = () => {
    optionCard.productColor = "black";
    optionCard.productSize = "41";
    optionCard.productQuantity = 1;
    router.navigate('/')
  };

  // slider handling
  new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    modules: [Pagination],
    centeredSlides: true,
    centeredSlidesBounds: true,
  });
}
