import gsap, { SplitText } from "gsap/all";

export const textOverlayAnimation = (targetElement) => {
  gsap.registerPlugin(SplitText);

  gsap.set("span", { opacity: 1 });

  let logoText = SplitText.create(targetElement, { type: "chars" });
  gsap.from(logoText.chars, {
    y: 20,
    autoAlpha: 0,
    delay: 0.5,
    stagger: 0.05,
  });
};
