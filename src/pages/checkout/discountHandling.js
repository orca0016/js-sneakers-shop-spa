import { allDiscount } from "../../libs/globalState";
import { plusIcon } from "../../utils/icons";
import { showToast } from "../../utils/toasts/toast";
import {
  handleShowDiscounts,
  handleShowPromoCost,
  handlingShowTotalPrice,
  newTotalPrice,
} from "./checkoutPage";

const inputDiscount = (inputElement) => {
  inputElement.className =
    "col-span-7 bg-[#FAFAFB] rounded-2xl outline-gray-500 placeholder:text-placeholder-text px-4 py-5";
  inputElement.name = "promoCode";
  inputElement.placeholder = "Enter your Promo Code";
  inputElement.type = "text";
  inputElement.id = "promo-input";
};
export const calculatePresentDiscount = () => {
  const totalPrices = JSON.parse(
    localStorage.getItem("total-prices")
  ).totalPrices;
  const allDiscounts = JSON.parse(localStorage.getItem("discount")) || [];
  const currentTotalPercent = allDiscounts.reduce(
    (sum, d) => sum + d.discountCost,
    0
  );
  const totalDiscountAmount = (totalPrices * currentTotalPercent) / 100;
  newTotalPrice('discountPrice',totalDiscountAmount);
};
const createButtonPromoCode = (button, inputElement) => {
  button.className =
    "rounded-full w-16 h-16 flex items-center justify-center bg-black text-white col-span-2";

  button.addEventListener("click", () => {
    const inputValue = inputElement.value.trim();

    if (!inputValue) {
      showToast("Please enter a promo code.", "danger");
      return;
    }

    const totalPrices =
      JSON.parse(localStorage.getItem("total-prices"))?.totalPrices || 0;
    const prevDiscounts = JSON.parse(localStorage.getItem("discount")) || [];

    const isAlreadyApplied = prevDiscounts.some((d) => d.name === inputValue);
    if (isAlreadyApplied) {
      showToast("This code is already added.", "danger");
      return;
    }

    const discountItem = allDiscount.find((d) => d.name === inputValue);
    if (!discountItem) {
      showToast("Invalid promo code.", "danger");
      return;
    }

    const currentTotalPercent = prevDiscounts.reduce(
      (sum, d) => sum + d.discountCost,
      0
    );

    const newTotalPercent = currentTotalPercent + discountItem.discountCost;

    if (newTotalPercent > 70) {
      showToast("You cannot apply a discount of more than 70%.", "danger");
      return;
    }

    const updatedDiscounts = [...prevDiscounts, discountItem];
    localStorage.setItem("discount", JSON.stringify(updatedDiscounts));

    const totalDiscountAmount = (totalPrices * newTotalPercent) / 100;
    newTotalPrice("discountPrice", totalDiscountAmount);

    showToast("Your discount code added.");
    inputElement.value = "";
    handleShowPromoCost();
    handlingShowTotalPrice();
    handleShowDiscounts();
  });
};

export const addNewDiscount = () => {
  const containerDiscount = document.getElementById("container-discount");

  const input = document.createElement("input");
  const button = document.createElement("button");
  button.innerHTML = plusIcon();

  inputDiscount(input);
  createButtonPromoCode(button, input);

  containerDiscount.appendChild(input);
  containerDiscount.appendChild(button);
};
