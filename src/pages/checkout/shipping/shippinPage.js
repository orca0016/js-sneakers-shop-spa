import { router } from "../../../main";
import {
  backIcon,
  boxCheckIcon,
  boxIcon,
  mapIcon,
  moreIcon,
  selectIcon,
  truckExpressIcon,
  truckIcon,
} from "../../../utils/icons";
let dataShipping = [
  {
    id: 1,
    title: "Economy",
    description: "Estimated  Arrival,Dec 20-30",
    selected: true,
    isDefault: true,
    price:10,
    icon:boxCheckIcon(),
    
},
{
    id: 2,
    title: "Regular",
    description: "Estimated  Arrival,Dec 20-30",
    selected: false,
    isDefault: false,
    price:15,
    icon:boxIcon(),
},
{
    id: 3,
    title: "Cargo",
    description: "Estimated  Arrival,Dec 20-30",
    selected: false,
    isDefault: false,
    price:20,
    icon:truckIcon(),
},
{
    id: 4,
    title: "Express",
    description: "Estimated  Arrival,Dec 20-30",
    selected: false,
    isDefault: false,
    price:30,
    icon:truckExpressIcon(),
  },
];

const shippingCardRendering = () => {
  document.getElementById("container-card-shipping").innerHTML = "";
  dataShipping.forEach((item) => {
    const htmlElement = `
        <div class='px-6 '>
              <div id='select-address' class='rounded-3xl shadow-xl p-6 grid grid-cols-6 items-center gap-4 my-6 bg-white' >
                  <div class='rounded-full flex items-center justify-center w-12 h-12  bg-[#202020] text-white col-span-1'  >
                      ${item.icon}
                  </div>
                  <div class='flex flex-col gap-1 col-span-4'>
                      <h1 id='title-address' class='text-2xl '>${
                        item.title
                      }</h1>
                      <p id='description-address' class='text-gray-500 font-light text-[16px] line-clamp-1'>
                            ${item.description}
                        </p>
                  </div>
                  <div class='flex items-center justify-center col-span-1 gap-2'>
                      <span>$${item.price}</span>
                      <button class='change-address cursor-pointer' data-id='${
                        item.id
                      } '>${selectIcon(item.selected)}</button>
                  </div>
              </div>
          </div>  
          `;
    document.getElementById("container-card-shipping").innerHTML += htmlElement;
  });
  clickableCardShipping();
};
const clickableCardShipping = () => {
  const changeAddressBtns = document.getElementsByClassName("change-address");

  for (let button of changeAddressBtns) {
    button.addEventListener("click", () => {
      const idBtn = Number(button.getAttribute("data-id"));
      const indexData = dataShipping.findIndex((item) => item.id === idBtn);

      dataShipping = dataShipping.map((item) => {
        if (item.selected) {
          return {
            ...item,
            selected: false,
          };
        } else {
          return item;
        }
      });
      dataShipping[indexData].selected = true;

      shippingCardRendering();
    });
  }
};
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

         <div class='rounded-t-3xl bg-white   border-[#EFEFEF] border-t p-6 mt-20'>
            <button id='apply-btn-shipping' class='flex items-center justify-center gap-4 py-5 rounded-full bg-black text-white w-full'>
                Apply
            </button>
        </div>
      </div>
      `;

  document.getElementById("app").innerHTML = htmlElement;
  shippingCardRendering();
  document.getElementById("apply-btn-shipping").addEventListener("click", () => {
    localStorage.setItem(
      "Shipping-method",
      JSON.stringify(dataShipping)
    );
    router.navigate("/checkout");
  });
};
                                   