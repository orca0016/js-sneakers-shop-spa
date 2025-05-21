import { selectIcon } from "../../../utils/icons";
import { clickableCardPayment } from "./clickableCardPayment";

export const paymentCardRendering = (dataPayment) => {
  document.getElementById("container-card-payment").innerHTML = "";
  dataPayment.forEach((item) => {
    const htmlElement = `
        <div class='px-6 '>
              <div id='select-payment' class='rounded-3xl shadow-xl p-6 grid grid-cols-6 items-center gap-4 my-6 bg-white' >
                  <div class=' flex items-center justify-center w-12 h-12   col-span-1'  >
                      ${item.icon}
                  </div>
                  <div class='flex flex-col gap-1 col-span-4'>
                      <h1 id='title-payment' class='text-2xl '>${
                        item.title
                      }</h1>
                  </div>
                  <div class='flex items-center justify-center col-span-1 gap-2 mr-6'>
                      <span class='${!item.price.includes('$')?'opacity-0':''}'>${item.price}</span>
                      <button class='change-payment cursor-pointer' data-id='${
                        item.id
                      } '>${selectIcon(item.selected)}</button>
                  </div>
              </div>
          </div>  
          `;
    document.getElementById("container-card-payment").innerHTML += htmlElement;
  });
  clickableCardPayment(dataPayment);
};