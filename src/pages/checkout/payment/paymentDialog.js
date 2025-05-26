import gsap from "gsap/all";
import { router } from "../../../main";
import { showToast } from "../../../utils/toasts/toast";
const addEventForModalButtons = ()=>{
  const confirmBtn = document.getElementById('back-to-home-modal-payment')
  confirmBtn.addEventListener('click' , ()=>{
    localStorage.removeItem('card-shop')
    // localStorage.removeItem('address-list')
    localStorage.removeItem('Shipping-method')
    localStorage.removeItem('total-prices')
    localStorage.removeItem('discount')
    document.getElementById('body').style.overflow='auto'
    router.navigate('/')
  })
  const viewReceiptBtn = document.getElementById('view-receipt-btn')
  viewReceiptBtn.addEventListener('click' , ()=>{
    showToast('This feature is under construction.' , 'warning')
  })
}
export const paymentDialog = () => {
  const dialogDeliveryDone = document.getElementById("dialog-delivery-done");
  const whiteBoxDeliveryDone = document.getElementById(
    "white-box-delivery-done"
  );
addEventForModalButtons()
  whiteBoxDeliveryDone.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const applyBtnShipping = document.getElementById("apply-btn-shipping");
  applyBtnShipping.addEventListener("click", () => {
    dialogDeliveryDone.classList.add("flex");
    dialogDeliveryDone.classList.remove("hidden");
    document.getElementById("body").style.overflow = "hidden";
    let timelineAnimation = gsap.timeline();
    timelineAnimation.to("#white-box-delivery-done", {
      duration: 0,
      scale: 0,
      display: "none",
    });
    timelineAnimation.to("#loading-dialog-payment", {
      duration: 1,
      display: "block",
    });
    timelineAnimation.to("#loading-dialog-payment", {
      duration: 0.2,
      opacity: 0,
    });
    timelineAnimation.to("#loading-dialog-payment", {
      duration: 0,
      display: "none",
    });
    timelineAnimation
      .to("#white-box-delivery-done", {
        duration: 0,
        scale: 0,
        opacity: 1,
        display: "flex",
      })
      .to("#white-box-delivery-done", { duration: 0.5, scale: 1 });
  });
};
