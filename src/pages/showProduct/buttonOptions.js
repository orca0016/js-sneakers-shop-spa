import optionCard from "../../libs/globalState";
import { checkIcon } from "../../utils/icons";

export const handleChangeSizeButtons = (currentSize) => {
  const buttons = document.getElementsByClassName("btns-size-selected");

  for (let item of buttons) {
    if (item.dataset.currentSize === currentSize) {
      item.style.color = "white";
      item.style.backgroundColor = "black";
    } else {
      item.style.color = "black";
      item.style.backgroundColor = "white";
    }
  }
};
export const handleChangeColorButtons = (currentColor) => {
  const buttons = document.getElementsByClassName("btns-color-selected");
  for (let item of buttons) {
    if (item.dataset.currentColor === currentColor) {
      item.style.color =
        item.dataset.currentColor === "black" ? "white" : "black";
    } else {
      item.style.color = item.dataset.currentColor;
    }
  }
};

export const createColorOption = (colorData) => {
  const colorBtns = document.getElementById("color-btns");

  colorData.forEach((element) => {
    const buttonColor = document.createElement("button");
    buttonColor.style.background = element;
    buttonColor.style.color = element;
    buttonColor.dataset.currentColor = element;
    buttonColor.className =
      "p-[10px] w-[40px] h-[40px]  flex items-center justify-center  rounded-full   shadow-xl cursor-pointer  btns-color-selected";
    buttonColor.type = "button";
    buttonColor.innerHTML = checkIcon();
    handleChangeColorButtons(optionCard.productColor);
    buttonColor.addEventListener("click", () => {
      optionCard.productColor = element;
      handleChangeColorButtons(optionCard.productColor);
    });
    colorBtns.appendChild(buttonColor);
  });
};

export const createSizeOption = (sizeData) => {
  const sizeBtns = document.getElementById("size-btns");
  sizeData.forEach((element) => {
    const buttonSize = document.createElement("button");
    buttonSize.textContent = element;
    buttonSize.dataset.currentSize = element;
    buttonSize.className =
      " p-[10px] w-[40px] h-[40px]  flex items-center justify-center  rounded-full border  shadow-xl cursor-pointer btns-size-selected";
    buttonSize.type = "button";
    handleChangeSizeButtons(optionCard.productSize);
    buttonSize.addEventListener("click", () => {
      optionCard.productSize = element;
      handleChangeSizeButtons(optionCard.productSize);
    });
    sizeBtns.appendChild(buttonSize);
  });
};

export const quantityProduct = (data) => {
  const decreaseQuantity = document.getElementById("decrease-quantity");
  const increaseQuantity = document.getElementById("increase-quantity");
  const showQuantity = document.getElementById("show-quantity");

  decreaseQuantity.addEventListener("click", () => {
    if (optionCard.productQuantity > 1) {
      optionCard.productQuantity--;
      showQuantity.innerText = optionCard.productQuantity;
      document.getElementById("total-price").innerText = `$${
        data.price * optionCard.productQuantity
      }`;
    }
  });
  increaseQuantity.addEventListener("click", () => {
    if (optionCard.productQuantity < 10) {
      optionCard.productQuantity++;
      showQuantity.innerText = optionCard.productQuantity;
      document.getElementById("total-price").innerText = `$${
        data.price * optionCard.productQuantity
      }`;
    }
  });
};
