import { router } from "../../../main";
import {
  backIcon,
  boxCheckIcon,
  boxIcon,
  moreIcon,
  truckExpressIcon,
  truckIcon,
} from "../../../utils/icons";
import { shippingCardRendering } from "./shippingCardRendering";

let dataShipping = [
  {
    id: 1,
    title: "Economy",
    description: "Estimated  Arrival,Dec 20-30",
    selected: true,
    isDefault: true,
    price: 10,
    icon: boxCheckIcon(),
  },
  {
    id: 2,
    title: "Regular",
    description: "Estimated  Arrival,Dec 20-30",
    selected: false,
    isDefault: false,
    price: 15,
    icon: boxIcon(),
  },
  {
    id: 3,
    title: "Cargo",
    description: "Estimated  Arrival,Dec 20-30",
    selected: false,
    isDefault: false,
    price: 20,
    icon: truckIcon(),
  },
  {
    id: 4,
    title: "Express",
    description: "Estimated  Arrival,Dec 20-30",
    selected: false,
    isDefault: false,
    price: 30,
    icon: truckExpressIcon(),
  },
];

export const shippingPage = () => {
  const htmlElement = `
      <div class='w-full bg-white '>
          <div class='flex justify-between items-center px-6 py-10'>
              <div class='flex gap-4 items-center'>
                  <a href="/cards" data-navigo>${backIcon()}</a>
                  <h1 class='text-2xl  font-[700]'>Choose Shipping </h1>
              </div>
              <div>${moreIcon()}</div>
          </div>
          <div id='container-card-shipping'></div>
          <div class='rounded-t-3xl bg-white border-[#EFEFEF] border-t p-6 mt-20'>
            <button id='apply-btn-shipping' class='flex items-center justify-center gap-4 py-5 rounded-full bg-black text-white w-full'>
                Apply
            </button>
        </div>
      </div>
      `;
  document.getElementById("app").innerHTML = htmlElement;
  shippingCardRendering(dataShipping);
  document.getElementById("apply-btn-shipping").addEventListener("click", () => {
    router.navigate("/checkout");
  });
};
