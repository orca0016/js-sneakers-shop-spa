import { gsap } from "gsap";

import { router } from "../main";
import { textOverlayAnimation } from "../utils/animations/textAnimation";
import { loadingIcon, logoOnboardingIcon } from "../utils/icons";
const app = document.getElementById("app");
let currentPage = 0;

const showBtns = () => {
  const buttons = document.getElementById("buttons");
  buttons.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const btnLine = document.createElement("button");
    btnLine.classList = `py-[3px] ${
      i === currentPage ? "bg-black" : "bg-m-gray"
    }  w-[30px]`;
    btnLine.innerText = " ";
    btnLine.addEventListener("click", () => {
      currentPage = i;
      showSlide();
      textOverlayAnimation(".title-onboarding", "h2", 0);
    });
    buttons.appendChild(btnLine);
  }
};
const showSlide = () => {
  const nextCards = document.getElementById("onboard-3");
  const arrayCards = [
    {
      imagePath: "./public/images/WallpaperDog-1.png",
      message: "We provide high quality products just for you",
    },
    {
      imagePath: "./public/images/WallpaperDog-2.png",
      message: "Your satisfaction is our number one periority",
    },
    {
      imagePath: "./public/images/WallpaperDog-3.png",
      message: "Let’s fulfill your fashion needs with shoearight now!",
    },
  ];
  for (let i = 0; i < arrayCards.length; i++) {
    if (i === currentPage) {
      nextCards.innerHTML = ` <div>
        <div class="overflow-hidden w-full h-[550px]">
            <img src="${
              arrayCards[i].imagePath
            }" class="w-full  animate-fades opacity-0" style="animation-delay:0.5s;"  id="image-1" alt="wallpaper">
        </div>
        <div class="px-[24px] py-[32px] text-center">
                <h2 class="text-[30px] title-onboarding">${
                  arrayCards[i].message
                }</h2>
                <div id='buttons' class="mt-[60px] w-full flex justify-center gap-[6px]">
                </div>
                <div class='mt-[40px]' id='next-btn'>
                <button class="bg-dark-gray rounded-4xl w-full mt-[40px] text-white h-[47px] py-[12px] px-[16px]">
                  ${i === 2 ? "Get started" : "Next"}
                </button>
                </div>
        </div>`;
    }
  }
  const nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", () => {
    if (currentPage === 2) {
      router.navigate("/login");
      localStorage.setItem("show-onboard", "true");
    } else {
      currentPage++;
      showSlide();
      showBtns();
    }
    textOverlayAnimation(".title-onboarding", "h2", 0);
  });

  showBtns();
};

export const onboarding = () => {
  const template = `
       <div
      class=" relative bg-white "
    >
      <div
        class="w-full h-screen flex items-center justify-center flex-col z-10"
        id="onboard-1"
      >
        <div class="w-full flex justify-center items-center h-[60%]">
          <span class="animate-wiggle"> ${logoOnboardingIcon()} </span>
          <span class="text-animation text-heading-title text-[52px] font-[700]"
            >Shoea</span
          >
        </div>
        <div
          class="left-[50%] bottom-[100px] animate-spin"
          style="transform: translate(0 50px)"
        >
          ${loadingIcon()}
        </div>
      </div>
      <!-- secondpage -->
      <div
        id="onboard-2"
        class="w-full h-screen relative bg-top bg-cover hidden opacity-0 bg-linear-to-t from-gray-900 to-gtry-100/4 bg-[url('./public/images/onboarding-baner.png')] bg-no-repeat before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-t before:from-gray-900 before:to-gray-100/0 before:opacity-75 before:z-[0] text-white"
      >
        <div class="absolute bottom-[0px] pb-[70px] px-[30px] left-0 z-3">
          <h3 class="text-[40px] font-[600] flex items-center">Welcome to <img class='w-[36px] h-[36px]' src='../../public/images/handIcon.png'/></h3>
          <h1 class="text-[72px] font-[700] text-animation">Shoea</h1>
          <p class="text-[16px] font-[600] text-animation">
            The best sneakers & shoes e-commerse app of the century for your
            fashion needs!
          </p>
        </div>
      </div>
      <!-- third page -->
      <div id="onboard-3" class="hidden opacity-0 min-h-screen ">
            <div>
              <div class="overflow-hidden w-full h-[600px]">
                <img src="./public/images/WallpaperDog-1.png" class="w-full  animate-fades"  id="image-1" alt="wallpaper">
              </div>
              <div class="px-[24px] py-[32px] text-center">
                <h2 class="text-[32px]">We provide high quality products just for you</h2>
                <div id='buttons' class="mt-[60px] w-full flex justify-center gap-[6px]">
              </div>
              <button class="bg-dark-gray rounded-4xl w-full mt-[40px] text-white h-[47px] py-[12px] px-[16px]">Next</button>
            </div>
      </div>

    </div>
    `;
  app.innerHTML = template;

  textOverlayAnimation(".text-animation", "span", 0.5);
  let tl = gsap.timeline({ delay: 0.5 });

  // اسلاید اول - ظاهر شدن با scale + fade
  tl.fromTo(
    "#onboard-1",
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
  );

  // اسلاید اول - محو شدن
  tl.to("#onboard-1", { opacity: 0, duration: 0.8, ease: "power1.in" });
  tl.set("#onboard-1", { display: "none" });

  // اسلاید دوم - ظاهر شدن
  tl.set("#onboard-2", { display: "flex", opacity: 0 });
  tl.to("#onboard-2", { opacity: 1, duration: 1.2, ease: "power2.out" });

  // اسلاید دوم - باقی بمونه ۳ ثانیه
  tl.to("#onboard-2", { duration: 3 }, "+=0.5");

  // اسلاید دوم - محو
  tl.to("#onboard-2", { opacity: 0, duration: 0.8, ease: "power1.in" });
  tl.set("#onboard-2", { display: "none" });

  // اسلاید سوم - ظاهر شدن با انیمیشن نرم
  tl.set("#onboard-3", { display: "block", opacity: 0, scale: 0.95 });
  tl.to("#onboard-3", {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "power2.out",
  });

  showSlide();
  showBtns();
  setTimeout(() => {
    textOverlayAnimation(".title-onboarding", "h2", 0);
  }, 9000);
};
