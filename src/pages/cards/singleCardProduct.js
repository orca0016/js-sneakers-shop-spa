import { trashIcon } from "../../utils/icons";

export const card = (item, isDialogOpen) => {
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
                      }" class='minus-products ${isDialogOpen?'hidden':''}' >-</button>
                      <span >${item.productQuantity}</span>
                      <button  data-id="${
                        item.id
                      }" class='plus-products ${isDialogOpen?'hidden':''}'>+</button>
                    </div>
                  </div>
                </div>
              </div>`;
};