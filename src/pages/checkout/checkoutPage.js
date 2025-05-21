import { router } from "../../main";
import {
  backIcon,
  closeIcon,
  mapIcon,
  moreIcon,
  nextArrowIcon,
  nextIcon,
  penIcon,
  plusIcon,
  truckIcon,
} from "../../utils/icons";
import { addNewDiscount, calculatePresentDiscount } from "./discountHandling";
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
                <div class='rounded-full flex items-center justify-center w-12 h-12  bg-[#161617] text-white col-span-1'>
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
const goToPayment = () => {
  const goToPaymentBtn = document.getElementById("go-to-payment");
  if (
    localStorage.getItem("Shipping-method") &&
    localStorage.getItem("address-Shipping")
  ) {
    goToPaymentBtn.removeAttribute("disabled");
  } else {
    goToPaymentBtn.setAttribute("disabled", "true");
  }
  goToPaymentBtn.addEventListener("click", () => {
    router.navigate("/checkout/payment");
  });
};
export const newTotalPrice = (name, newCost) => {
  let prevPrices = JSON.parse(localStorage.getItem("total-prices")) || {};
  prevPrices = {
    ...prevPrices,
    [name]: newCost,
  };

  localStorage.setItem("total-prices", JSON.stringify(prevPrices));
};
const renderTotalPrice = () => {
  const totalDiv = document.getElementById("total-amount");
  const totalPrices = JSON.parse(localStorage.getItem("card-shop"));
  let tempPrice = 0;
  totalPrices?.forEach((el) => {
    tempPrice += el.price * el.productQuantity;
  });
  totalDiv.innerText = `$${tempPrice}`;
  newTotalPrice("totalPrices", tempPrice);
};
const shippingCost = () => {
  const exactShipping = JSON.parse(localStorage.getItem("Shipping-method")) || [
    { price: "-", selected: true },
  ];
  const price = exactShipping.find((item) => item.selected).price;
  const shippingConstDiv = document.getElementById("shipping-const");
  shippingConstDiv.innerText = `${price !== "-" ? "$" : ""}${price}`;
  if (price !== "-") {
    newTotalPrice("shippingCont", price);
  }
};

export const handleShowPromoCost = () => {
  const contRowDiscount = document.getElementById("show-discount");
  const isDiscountExist =
    JSON.parse(localStorage.getItem("total-prices")).discountPrice || null;
  const discountConst = document.getElementById("discount-const");
  if (isDiscountExist) {
    discountConst.innerText = `-$${isDiscountExist}`;
    contRowDiscount.classList.add("flex");
    contRowDiscount.classList.remove("hidden");
  }else{
    contRowDiscount.classList.remove("flex");
    contRowDiscount.classList.add("hidden");
  }
};
export const handlingShowTotalPrice = () => {
  const totalPriceElement = document.getElementById("total-price-element");
  const totalPrice = JSON.parse(localStorage.getItem("total-prices"));
  let finalPrice = totalPrice.totalPrices;

  if (totalPrice.discountPrice) finalPrice -= totalPrice.discountPrice;
  if (totalPrice.shippingCont) finalPrice += totalPrice.shippingCont;

  totalPriceElement.innerText = `$${finalPrice}`;
};
export const handleShowDiscounts = () => {
  const showDiscounts = document.getElementById("show-discounts");
  showDiscounts.innerHTML = "";
  const allDiscounts = JSON.parse(localStorage.getItem("discount")) || [];

  allDiscounts.forEach((item) => {
    showDiscounts.innerHTML += `
    <div class='bg-black px-5 py-3 rounded-full text-white flex gap-2 min-w-fit'>
      ${item.description}
      <button data-id='${item.id}' class='delete-discount-btn'>
      ${closeIcon()}
      </button>
    </div>
    `;
  });
  const allCloseBtn = document.getElementsByClassName("delete-discount-btn");
  for (const element of allCloseBtn) {
    element.addEventListener("click", () => {
      const btnId = Number(element.getAttribute("data-id"));
      localStorage.setItem('discount' , JSON.stringify(allDiscounts.filter(item=>item.id!==btnId)))
      calculatePresentDiscount() 
      handleShowDiscounts()
      handleShowPromoCost()
      handlingShowTotalPrice()
    });
  }
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
            
            <div id='container-discount' class='grid grid-cols-9 gap-4 items-center'></div>
            
            <div id='show-discounts' class='overflow-x-auto flex gap-3 my-4'></div>

            <div class='shadow-2xl rounded-4xl p-6 mt-6'>
                <div class='flex justify-between items-center pb-6'>
                    <h3 class='text-gray-500'>Amount</h3>
                    <p class='text-xl' id='total-amount'>$432</p>
                </div>
                <div class='flex justify-between items-center pb-6'>
                    <h3 class='text-gray-500'>Shipping</h3>
                    <p class='text-xl' id='shipping-const'>-</p>
                </div>
                <div id='show-discount' class='hidden justify-between items-center pb-6'>
                    <h3 class='text-gray-500'>Promo</h3>
                    <p class='text-xl' id='discount-const'>-</p>
                </div>
                <div class='flex justify-between items-center border-t border-[#EFEFEF] pt-6'>
                    <h3 class='text-gray-500'>Total</h3>
                    <p class='text-xl' id='total-price-element'>-</p>
                </div>
            </div>
        </div>
        <div class='rounded-t-3xl bg-white   border-[#EFEFEF] border-t p-6'>
            <button disabled id='go-to-payment' class='disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-4 py-5 rounded-full bg-black text-white w-full'>Continue to Payment ${nextIcon()}</button>
        </div>

    </div>
    `;
  document.getElementById("app").innerHTML = htmlElement;
  renderOrders();
  renderCurrentAddress();
  renderCurrentShipping();
  goToPayment();
  renderTotalPrice();
  shippingCost();
  addNewDiscount();
  calculatePresentDiscount()
  handleShowPromoCost();
  handlingShowTotalPrice();
  handleShowDiscounts();
};
