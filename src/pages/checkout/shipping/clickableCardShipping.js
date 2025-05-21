import { shippingCardRendering } from "./shippingCardRendering";

export const clickableCardShipping = (data) => {
  const changeAddressBtns = document.getElementsByClassName("change-address");
  for (let button of changeAddressBtns) {
    button.addEventListener("click", () => {
      const idBtn = Number(button.getAttribute("data-id"));
      const updatedShipping = data.map((item) => ({
        ...item,
        selected: item.id === idBtn,
      }));
      console.log(updatedShipping);
      localStorage.setItem("Shipping-method", JSON.stringify(updatedShipping));
      shippingCardRendering(updatedShipping);
    });
  }
};
