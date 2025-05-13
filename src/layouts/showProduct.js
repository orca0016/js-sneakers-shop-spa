import gsap from "gsap/all";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import {
  backIcon,
  bagIcon2,
  checkIcon,
  heartIcon,
  minusIcon,
  plusIcon,
  starIcon,
} from "../utils/icons";
let productColor = "white";
let productSize = "41";
let productQuantity = 1;
const handleChangeSizeButtons = (currentSize) => {
  const buttons = document.getElementsByClassName("btns-size-selected");

  for (let item of buttons) {
    if (item.dataset.currentSize === currentSize) {
      item.style.color = "white";
      item.style.backgroundColor = "black";
    } else {
      item.style.color = "black";
      item.style.backgroundColor = "white";
    }
  }
};
const handleChangeColorButtons = (currentColor) => {
  const buttons = document.getElementsByClassName("btns-color-selected");

  for (let item of buttons) {
    if (item.dataset.currentColor === currentColor) {
      item.style.color =
        item.dataset.currentColor === "black" ? "white" : "black";
    } else {
      item.style.color = item.dataset.currentColor;
    }
  }
};
const createFormAddProduct = (data) => {
  //create color select buttons
  const colorBtns = document.getElementById("color-btns");
  const colorData = data.colors.split("|");
  colorData.forEach((element) => {
    const buttonColor = document.createElement("button");
    buttonColor.style.background = element;
    buttonColor.style.color = element;
    buttonColor.dataset.currentColor = element;
    buttonColor.className =
      "p-[10px] w-[40px] h-[40px]  flex items-center justify-center  rounded-full   shadow-xl cursor-pointer  btns-color-selected ";
    buttonColor.type = "button";
    buttonColor.innerHTML = checkIcon();
    buttonColor.addEventListener("click", () => {
      productColor = element;
      handleChangeColorButtons(element);
    });
    colorBtns.appendChild(buttonColor);
  });
  //create size select buttons
  const sizeBtns = document.getElementById("size-btns");
  const sizeData =  data.sizes.split("|");

  sizeData.forEach((element) => {
    const buttonSize = document.createElement("button");
    buttonSize.textContent = element;
    buttonSize.className =
      "p-[10px] w-[40px] h-[40px]  flex items-center justify-center  rounded-full border  shadow-xl cursor-pointer btns-size-selected";
    buttonSize.type = "button";
    buttonSize.addEventListener("click", () => {
      productSize = element;
      buttonSize.dataset.currentSize = element;
      handleChangeSizeButtons(element);
    });
    sizeBtns.appendChild(buttonSize);
  });

  const decreaseQuantity = document.getElementById("decrease-quantity");
  const increaseQuantity = document.getElementById("increase-quantity");
  const showQuantity = document.getElementById("show-quantity");

  decreaseQuantity.addEventListener("click", () => {
    if (productQuantity > 1) {
      productQuantity--;
      showQuantity.innerText = productQuantity;
      document.getElementById("total-price").innerText = `$${
        data.price * productQuantity
      }`;
    }
  });
  increaseQuantity.addEventListener("click", () => {
    if (productQuantity < 10) {
      productQuantity++;
      showQuantity.innerText = productQuantity;
      document.getElementById("total-price").innerText = `$${
        data.price * productQuantity
      }`;
    }
  });

  document
    .getElementById("form-sub-product")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const userCard = JSON.parse(localStorage.getItem("card-shop"));
      if ( !!userCard && userCard.find((item) => item.id === data.id)) {
        vanillaToast.error("This product is already in your cart.");
      } else {
        const newProduct = {
          id: data.id,
          name: data.name,
          imageURL: data.imageURL,
          productQuantity,
          productColor,
          productSize,
          price: data.price,
        };
        localStorage.setItem(
          "card-shop",
          userCard
            ? JSON.stringify([...userCard, newProduct])
            : JSON.stringify([newProduct])
        );
        vanillaToast.success("Product added to the card shop");
      }
    });
};
export function showProduct(data) {
  const modal = document.getElementById("product-modal");
  const content = document.getElementById("product-modal-content");

  console.log(data);

  content.innerHTML = `
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
            <button id="like-product">${heartIcon()}</button>
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
                    <span id='show-quantity'>${productQuantity}</span>
                    <button type="button" id='increase-quantity'>${plusIcon()}</button>
                </span>
            </div>
            <div class='flex items-center justify-between pb-[36px] mt-5'>
            <div>
              <p class='text-sm text-gray-text-search font-light'>Total price</p>
            <p class='text-lg' id='total-price'>$${
              data.price * productQuantity
            }</p>
            </div>
                <button type="submit" class='bg-black shadow-xl rounded-full flex gap-[10px] items-center px-[60px]  text-white py-[15px]'>${bagIcon2()} <span>add to  Cart</span></button>
            </div>
        </form>
    </div>
  `;

  modal.classList.remove("hidden");
  gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  document.getElementById("body").style.overflow = "hidden";
  createFormAddProduct(data);
  document.getElementById("close-modal").onclick = () => {
    productColor = "white";
    productSize = "41";
    productQuantity = 1;
    gsap.to(modal, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        modal.classList.add("hidden");
      },
    });
    document.getElementById("body").style.overflow = "auto";
  };

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
