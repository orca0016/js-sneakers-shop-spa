import { selectIcon } from "../../../utils/icons";
import { clickableCardShipping } from "./clickableCardShipping";

export const shippingCardRendering = (dataShipping) => {
  document.getElementById("container-card-shipping").innerHTML = "";
  dataShipping.forEach((item) => {
    const htmlElement = `
        <div class='px-6'>
          <div class='rounded-3xl shadow-xl p-6 grid grid-cols-6 items-center gap-4 my-6 bg-white'>
              <div class='rounded-full flex items-center justify-center w-12 h-12 bg-[#202020] text-white col-span-1'>
                  ${item.icon}
              </div>
              <div class='flex flex-col gap-1 col-span-4'>
                  <h1 class='text-2xl'>${item.title}</h1>
                  <p class='text-gray-500 font-light text-[16px] line-clamp-1'>${item.description}</p>
              </div>
              <div class='flex items-center justify-center col-span-1 gap-2'>
                  <span>$${item.price}</span>
                  <button class='change-address cursor-pointer' data-id='${item.id}'>${selectIcon(item.selected)}</button>
              </div>
          </div>
        </div>  
    `;
    document.getElementById("container-card-shipping").innerHTML += htmlElement;
  });
  clickableCardShipping(dataShipping);
};