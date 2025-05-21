import gsap from "gsap/all";

export const paymentDialog = () => {
  const dialogDeliveryDone = document.getElementById("dialog-delivery-done");
  const whiteBoxDeliveryDone = document.getElementById(
    "white-box-delivery-done"
  );
  dialogDeliveryDone.addEventListener("click", (e) => {
      let timelineAnimation = gsap.timeline({
          onComplete:()=>{
              e.target.classList.add("hidden");
              e.target.classList.remove("flex");
              document.getElementById("body").style.overflow = "auto";
        }
     });
    timelineAnimation.to("#white-box-delivery-done", { duration: 0, scale:1})
      .to("#white-box-delivery-done", { duration: 0.3, scale:0 , opacity:0  })
});
whiteBoxDeliveryDone.addEventListener("click", (e) => {
    e.stopPropagation();
});

const applyBtnShipping = document.getElementById("apply-btn-shipping");
applyBtnShipping.addEventListener("click", () => {
    dialogDeliveryDone.classList.add("flex");
    dialogDeliveryDone.classList.remove("hidden");
    document.getElementById("body").style.overflow = "hidden";
    let timelineAnimation = gsap.timeline();
    timelineAnimation.to("#white-box-delivery-done", { duration: 0, scale:0 , opacity:1})
      .to("#white-box-delivery-done", { duration: 0.5, scale:1})
  });
};
