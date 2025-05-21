// import { optionCard } from "../showProduct";
import optionCard from "../../libs/globalState";
import { showToast } from "../../utils/toasts/toast";
import {
  createColorOption,
  createSizeOption,
  quantityProduct,
} from "./buttonOptions";

export const createFormAddProduct = (data) => {
  //create color select buttons
  const colorData = data.colors.split("|");
  createColorOption(colorData);

  //create size select buttons
  const sizeData = data.sizes.split("|");
  createSizeOption(sizeData);

  //add event to the quantity button
  quantityProduct(data);

  document
    .getElementById("form-sub-product")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const userCard = JSON.parse(localStorage.getItem("card-shop"));
      if (!!userCard && userCard.find((item) => item.id === data.id)) {
        showToast("This product is already in your cart.", "danger");
      } else {
        const newProduct = {
          id: data.id,
          name: data.name,
          imageURL: data.imageURL,
          productQuantity: optionCard.productQuantity,
          productColor: optionCard.productColor,
          productSize: optionCard.productSize,
          price: data.price,
        };
        localStorage.setItem(
          "card-shop",
          userCard
            ? JSON.stringify([...userCard, newProduct])
            : JSON.stringify([newProduct])
        );
        showToast("Product added to the card shop.", "success");
      }
    });
};
