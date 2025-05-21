import { paymentCardRendering } from "./paymentCardRendering";

export const clickableCardPayment = (dataPayment) => {
  const changeAddressBtns = document.getElementsByClassName("change-payment");

  for (let button of changeAddressBtns) {
    button.addEventListener("click", () => {
      const idBtn = Number(button.getAttribute("data-id"));
      const indexData = dataPayment.findIndex((item) => item.id === idBtn);

      dataPayment = dataPayment.map((item) => {
        if (item.selected) {
          return {
            ...item,
            selected: false,
          };
        } else {
          return item;
        }
      });
      dataPayment[indexData].selected = true;

      paymentCardRendering(dataPayment);
    });
  }
};