import {
  backIcon,
  mapIcon,
  moreIcon,
  nextArrowIcon,
  nextIcon,
  penIcon,
  plusIcon,
  truckIcon,
} from "../../utils/icons";
import { renderOrders } from "./renderOrders";
const renderCurrentAddress = () => {
  const currentCard = document.getElementById("current-card-address");
  const addresses = JSON.parse(localStorage.getItem("address-Shipping")) || [
    {
      id: 1,
      title: "home default",
      description: "3214 SunBrock Park, PC 5794",
      selected: true,
      isDefault: true,
    },
  ];
  const defaultData = addresses.find((item) => item.selected);

  const htmlElement = `
    <div id='select-address' class='rounded-3xl shadow-2xl p-6 grid grid-cols-6 items-center gap-4 my-6' >
                <div class='rounded-full flex items-center justify-center w-10 h-10  bg-black text-white col-span-1'  style='box-shadow:0px 0px 0 8px #DFDFDF;'>
                    ${mapIcon()}
                </div>
                <div class='flex flex-col gap-1 col-span-4'>
                    <h1 id='title-address' class='text-2xl '>${
                      defaultData.title
                    }</h1>
                    <p id='description-address' class='text-gray-500 font-light text-[16px] line-clamp-1'>${
                      defaultData.description
                    }</p>
                </div>
                <div class='flex items-center justify-center col-span-1'>
                    <a href='/checkout/address' data-navigo class='change-address cursor-pointer'>${penIcon()}</a>
                </div>
            </div>
    `;
  currentCard.innerHTML = htmlElement;
};
const renderCurrentShipping = () => {
  const dataShipping = JSON.parse(localStorage.getItem("Shipping-method"));
  const selectedShippingMethod = dataShipping?.find((item) => item.selected);
  let htmlElement;
  console.log(dataShipping);
  
  if (!dataShipping) {
    htmlElement = ` 
        <div id='select-address' class='rounded-3xl shadow-2xl p-6 grid grid-cols-6 items-center gap-4 my-6' >
                    <div class='col-span-1'>
                        ${truckIcon()}
                    </div>
                    <div class='flex flex-col gap-1 col-span-4'>
                        <h1 id='title-address' class='text-lg'>Choose Shipping Type</h1>
                    </div>
                    <div class='flex items-center justify-center col-span-1'>
                        <a href='/checkout/shipping' class='change-address cursor-pointer'>${nextArrowIcon()}</a>
                    </div>
                </div>
`;
  } else {
    htmlElement = `<div  class='rounded-3xl shadow-2xl p-6 grid grid-cols-6 items-center gap-4 my-6' >
                <div class='rounded-full flex items-center justify-center w-10 h-10  bg-black text-white col-span-1'  style='box-shadow:0px 0px 0 8px #DFDFDF;'>
                    ${selectedShippingMethod.icon}
                </div>
                <div class='flex flex-col gap-1 col-span-4'>
                    <h1 id='title-address' class='text-2xl '>${
                      selectedShippingMethod.title
                    }</h1>
                    <p id='description-address' class='text-gray-500 font-light text-[16px] line-clamp-1'>${
                      selectedShippingMethod.description
                    }</p>
                </div>
                <div class='flex items-center justify-center gap-2 col-span-1'>
                <span>$${selectedShippingMethod.price}</span>
                    <a href='/checkout/shipping' data-navigo class='change-address cursor-pointer'>${penIcon()}</a>
                </div>
            </div>`;
  }
  document.getElementById("card-shipping-method").innerHTML = htmlElement;
};
export const checkoutPage = () => {
  const htmlElement = `
    <div class='w-full bg-white '>
        <div class='flex justify-between items-center px-6 py-10'>
            <div class='flex gap-4 items-center'>
                <a href="/cards" data-navigo>${backIcon()}</a>
                <h1 class='text-2xl  font-[700]'>Checkout</h1>
                </div>
                <div>${moreIcon()}</div>
        </div>
        <div class='px-6 '>
            <h1 class='text-2xl  font-[700]'>Shipping Address</h1>
           <div id='current-card-address'></div>
        </div>

        <div class='py-3  my-6 px-6 '>
            <div class='border-y-1 pb-6 border-[#EFEFEF] flex flex-col gap-6' id='orders-list'>
                <h1 class='py-3  text-2xl font-bold'>Order List</h1>
            </div>
        </div>
        <div  class='px-6'>
            <div class='border-b border-[#EFEFEF] '>
                <h1 class='text-2xl  font-[700]'>Choose Shipping</h1>
                <div id='card-shipping-method'></div>  
            </div>
        </div>

       <div class='px-6 py-10'>
            <h1 class='text-2xl py-4 font-[700]'>Promo Code</h1>
            <div class='grid grid-cols-9 gap-4 items-center'>
                <input type="text" name="promoCode" placeholder='Enter your  Promo Code' class='col-span-7 bg-[#FAFAFB] rounded-2xl outline-gray-500 placeholder:text-placeholder-text px-4 py-5'>
                <button class=' rounded-full w-16 h-16 flex items-center justify-center bg-black text-white col-span-2'>
                    ${plusIcon()}
                </button>
            </div>
            <div class='shadow-2xl rounded-4xl p-6 mt-6'>
                <div class='flex justify-between items-center pb-6'>
                    <h3 class='text-gray-500'>Amount</h3>
                    <p class='text-xl'>$432</p>
                </div>
                <div class='flex justify-between items-center pb-6'>
                    <h3 class='text-gray-500'>Shipping</h3>
                    <p class='text-xl'>-</p>
                </div>
                <div class='flex justify-between items-center border-t border-[#EFEFEF] pt-6'>
                    <h3 class='text-gray-500'>Total</h3>
                    <p class='text-xl'>-</p>
                </div>
            </div>
        </div>
        <div class='rounded-t-3xl bg-white   border-[#EFEFEF] border-t p-6'>
            <button class='flex items-center justify-center gap-4 py-5 rounded-full bg-black text-white w-full'>Continue to Payment ${nextIcon()}</button>
        </div>

    </div>
    `;
  document.getElementById("app").innerHTML = htmlElement;
  renderOrders();
  renderCurrentAddress();
  renderCurrentShipping();
};
