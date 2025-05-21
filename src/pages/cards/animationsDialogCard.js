import gsap from "gsap/all";

export const closeAnimationDialog = (dialogWrapper) => {
  let timelineAnimation = gsap.timeline({
    onComplete: () => {
      dialogWrapper.classList.add("hidden");
      dialogWrapper.classList.remove("flex");
      document.getElementById("body").style.overflow = "auto";
    },
  });
  timelineAnimation
    .to(".content-dialog-card", { duration: 0, y: 0 })
    .to(".content-dialog-card", { duration: 0.3, y: 600, ease: "power2.in" })
    .to("#dialog-wrapper", { duration: 0, opacity: 0 });
};