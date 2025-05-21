import { closeIcon, xMarkIcon } from "../../utils/icons";
import { calculatePresentDiscount } from "./discountHandling";

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
      ${xMarkIcon()}
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