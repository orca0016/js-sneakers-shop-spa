import { router } from "../../../main";
import {
  backIcon,
  mapIcon,
  moreIcon,
  penIcon,
  selectIcon,
} from "../../../utils/icons";
let dataAddress = [
  {
    id: 1,
    title: "home",
    description: "3214 SunBrock Park, PC 5794",
    selected: true,
    isDefault: true,
  },
  {
    id: 2,
    title: "Office",
    description: "3214 SunBrock Park, PC 5794",
    selected: false,
    isDefault: false,
  },
  {
    id: 3,
    title: "Apartment",
    description: "3214 SunBrock Park, PC 5794",
    selected: false,
    isDefault: false,
  },
  {
    id: 4,
    title: "Parent's House",
    description: "3214 SunBrock Park, PC 5794",
    selected: false,
    isDefault: false,
  },
];
const addressCardRendering = () => {
  document.getElementById("container-card-address").innerHTML = "";
  dataAddress.forEach((item) => {
    const htmlElement = `
        <div class='px-6 '>
              <div id='select-address' class='rounded-3xl shadow-xl p-6 grid grid-cols-6 items-center gap-4 my-6 bg-white' >
                  <div class='rounded-full flex items-center justify-center w-10 h-10  bg-black text-white col-span-1'  style='box-shadow:0px 0px 0 8px #DFDFDF;'>
                      ${mapIcon()}
                  </div>
                  <div class='flex flex-col gap-1 col-span-4'>
                      <h1 id='title-address' class='text-2xl '>${
                        item.title
                      }</h1>
                      <p id='description-address' class='text-gray-500 font-light text-[16px] line-clamp-1'>
                            ${item.description}
                        </p>
                  </div>
                  <div class='flex items-center justify-center col-span-1'>
                      <button class='change-address cursor-pointer' data-id='${
                        item.id
                      } '>${selectIcon(item.selected)}</button>
                  </div>
              </div>
          </div>  
          `;
    document.getElementById("container-card-address").innerHTML += htmlElement;
  });
  clickableCardAddress();
};
const clickableCardAddress = () => {
  const changeAddressBtns = document.getElementsByClassName("change-address");

  for (let button of changeAddressBtns) {
    button.addEventListener("click", () => {
      const idBtn = Number(button.getAttribute("data-id"));
      const indexData = dataAddress.findIndex((item) => item.id === idBtn);

      dataAddress = dataAddress.map((item) => {
        if (item.selected) {
          return {
            ...item,
            selected: false,
          };
        } else {
          return item;
        }
      });
      dataAddress[indexData].selected = true;

      addressCardRendering();
    });
  }
};
export const addressPage = () => {
  const htmlElement = `
      <div class='w-full bg-white '>

          <div class='flex justify-between items-center px-6 py-10'>
              <div class='flex gap-4 items-center'>
                  <a href="/cards" data-navigo>${backIcon()}</a>
                  <h1 class='text-2xl  font-[700]'>Shipping address</h1>
                  </div>
                  <div>${moreIcon()}</div>
          </div>

          <div id='container-card-address'></div>
         
        <div  class='px-6 mt-16'>
            <button class='flex items-center justify-center gap-4 py-5 rounded-full bg-[#E8E8E8] text-[#3A3C40] w-full'>Add New Address</button>    
        </div>


         <div class='rounded-t-3xl bg-white   border-[#EFEFEF] border-t p-6 mt-20'>
            <button id='apply-btn-address' class='flex items-center justify-center gap-4 py-5 rounded-full bg-black text-white w-full'>
                Apply
            </button>
        </div>
      </div>
      `;

  document.getElementById("app").innerHTML = htmlElement;
  addressCardRendering();
  document.getElementById("apply-btn-address").addEventListener("click", () => {
    localStorage.setItem(
      "address-Shipping",
      JSON.stringify(dataAddress)
    );
    router.navigate("/checkout");
  });
};
