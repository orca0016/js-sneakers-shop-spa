import gsap, { SplitText } from "gsap/all";

export const textOverlayAnimation = (targetElement, tag, delay) => {
  gsap.registerPlugin(SplitText);

  gsap.set(tag, { opacity: 1 });
  let logoText = SplitText.create(targetElement, { type: "chars" });
  gsap.from(logoText.chars, {
    y: 20,
    autoAlpha: 0,
    delay: delay,
    stagger: 0.05,
  });
};
