import { router } from "../../main";
import {
  backIcon,
  moreIcon,
  nextIcon
} from "../../utils/icons";
import { addNewDiscount, calculatePresentDiscount } from "./discountHandling";
import { newTotalPrice } from "./newTotalPrice";
import { renderOrders } from "./renderOrders";
import {
  renderCurrentAddress,
  renderCurrentShipping,
} from "./renderShippingItem";
import {
  handleShowDiscounts,
  handleShowPromoCost,
  handlingShowTotalPrice,
} from "./showDiscountsItmes";

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
  const price = exactShipping.price;
  const shippingConstDiv = document.getElementById("shipping-const");
  shippingConstDiv.innerText = `${price !== "-" ? "$" : ""}${price}`;
  if (price !== "-") {
    newTotalPrice("shippingCont", price);
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
  calculatePresentDiscount();
  handleShowPromoCost();
  handlingShowTotalPrice();
  handleShowDiscounts();
};
