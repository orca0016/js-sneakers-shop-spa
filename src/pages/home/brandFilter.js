import { getAllBrands } from "../../../apis/products";
import { checkExpireToken } from "../../utils/errors";
import { infiniteCardHandling } from "./productList";
export const state = {
  brandSort: "All",
};

const brandingButtons = (data) => {
  const listDataBrands = [...data];
  const listBrands = document.getElementById("list-brands");
  listDataBrands?.unshift("All");

  // Add a button with styles and functionality for each brand data button
  listDataBrands?.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "ship-brands btn-brand";

    // Active a default btn 
    if (item === state.brandSort) {
      btn.classList.add("btn-active");
    }
    btn.dataset.brandSort = item;

    // functionality for button
    btn.addEventListener("click", () => {
      const shipBrands = document.getElementsByClassName("ship-brands");
      state.brandSort = item;

      // Activate the selected button and deactivate the previous button.
      for (let brandItem of shipBrands) {
        if (state.brandSort === brandItem.dataset.brandSort) {
          brandItem.classList.add("btn-active");
          brandItem.classList.remove("btn-inactive");
        } else {
          brandItem.classList.remove("btn-active");
          brandItem.classList.add("btn-inactive");
        }
      }

      // Render new data with the selected brand
      infiniteCardHandling(true);
    });
    btn.innerText = item;
    listBrands.appendChild(btn);
  });
};

export const fetchBrands = async () => {
  try {
    const data = await getAllBrands();
    brandingButtons(data);
  } catch (error) {
    checkExpireToken(error.response?.request?.status);
    console.log(error);
  }
};
