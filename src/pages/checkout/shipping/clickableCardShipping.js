import { shippingCardRendering } from "./shippingCardRendering";

export const clickableCardShipping = (data) => {
  const changeAddressBtns = document.getElementsByClassName("change-address");
  for (let button of changeAddressBtns) {
    const clickBtn = () => {
      const idBtn = Number(button.getAttribute("data-id"));
      const updatedShipping = data.map((item) => ({
        ...item,
        selected: item.id === idBtn,
      }));
      localStorage.setItem(
        "Shipping-method",
        JSON.stringify(updatedShipping.find((item) => item.selected))
      );
      shippingCardRendering(updatedShipping);
    };
    button.removeEventListener("click", clickBtn);
    button.addEventListener("click", () => {
      clickBtn();
    });
  }
};
