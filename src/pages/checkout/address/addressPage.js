import { router } from "../../../main";
import {
  backIcon,
  mapIcon,
  moreIcon,
  penIcon,
  selectIcon,
} from "../../../utils/icons";
import { createNewAddress, getPrevAddress } from "./createNewAddress";

export const addressCardRendering = () => {
  const dataAddress = getPrevAddress();
  document.getElementById("container-card-address").innerHTML = "";
  dataAddress.forEach((item, index) => {

    const htmlElement = `
        <div class='px-6 '>
              <div id='select-address' class='rounded-3xl shadow-xl p-6 grid grid-cols-6 items-center gap-4 my-6 bg-white' >
                  <div class='rounded-full flex items-center justify-center w-10 h-10  bg-black text-white col-span-1'  style='box-shadow:0px 0px 0 8px #DFDFDF;'>
                      ${mapIcon()}
                  </div>
                  <div class='flex flex-col gap-1 col-span-4'>
                      <h1 id='title-address' class='text-2xl flex gap-3'>${
                        item.title
                      } <span class='px-2  items-center rounded-lg bg-[#EAEAEA] text-xs text-[#3A3C40] ${
      index === 0 ? "flex" : "hidden"
    }'>default</span></h1>

                      <p id='description-address' class='text-gray-500 font-light text-[16px] line-clamp-1'>
                            ${item.description}
                        </p>
                  </div>
                  <div class='flex items-center justify-center col-span-1'>
                      <button class='change-address cursor-pointer' data-id='${
                        item.id
                      }'>${selectIcon(item.selected)}</button>

                  </div>
              </div>
          </div>  
          `;
    document.getElementById("container-card-address").innerHTML += htmlElement;
  });
  if (dataAddress.length===0) {
    document.getElementById("container-card-address").innerHTML = `
    <div class='flex flex-col items-center py-10'>
      <img src="../../../../public/images/not-found.png" alt="not found address">
      <h2>Please add  a address before continue </h2>
    </div>
    ` 
  }
  clickableCardAddress();
};
const clickableCardAddress = () => {
  let dataAddress = getPrevAddress();


  const changeAddressBtns = document.getElementsByClassName("change-address");

  for (let button of changeAddressBtns) {
    button.addEventListener("click", () => {
      const idBtn = button.getAttribute("data-id");
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
      localStorage.setItem("address-list", JSON.stringify(dataAddress));

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
            <button id='open-dialog-add-new-address' class='flex items-center justify-center gap-4 py-5 rounded-full bg-[#E8E8E8] text-[#3A3C40] w-full'>Add New Address</button>    
        </div>

        <!--this is modal section-->
        <div id='wrapper-dialog-add-new-address' class='fixed top-0 left-0 w-full h-screen bg-slate-900/60  hidden justify-center items-center '>
          <div id='box-dialog-add-new-address' class='max-w-[430px] py-10 px-6 rounded-3xl  bg-white '>
            <h1 class='font-semibold text-2xl pb-4 border-b border-gray-300'>Enter A New Address:</h1>
            <form autoComplete='off' class='w-full flex flex-col gap-6 mt-4 items-center' id='form-dialog-add-new-address'>
                <input type="text" name="titleAddress" placeholder='title of new address' class='outline-none border border-gray-200 bg-[#FAFAFA] shadow-2xl rounded-lg py-3 px-2 w-full'>
                <textarea maxRows="10" cols="" placeholder='enter your full address ' name='descriptionAddress' class='max-h-[200px] min-h-[100px] outline-none border border-gray-200 bg-[#FAFAFA] shadow-2xl rounded-lg py-5 px-3 w-full'></textarea> 
                <button id='add-new-address' class='flex items-center justify-center gap-4 py-3 rounded-full bg-black text-white w-full'>
                Add new
            </button>             
            </form>
          </div>
        </div>
        <!--this is end  modal section-->

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
    router.navigate("/checkout");
  });
  createNewAddress();

};
