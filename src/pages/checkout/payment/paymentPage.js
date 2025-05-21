import { appleIcon, backIcon, googleIcon, masterCardIcon, paypalIcon, plusIcon, selectIcon, walletPaymentIcon } from "../../../utils/icons";
import { paymentDialog } from "./paymentDialog";
let dataPayment = [
  {
    id: 1,
    title: "My Wallet",
    selected: true,
    price:'$9.55',
    icon:walletPaymentIcon(),
    
},
{
    id: 2,
    title: "PayPal",
    selected: false,
    price:'0000',
    icon:paypalIcon(),
},
{
    id: 3,
    title: "Google Payment",
    selected: false,
    price:'0000',
    icon:googleIcon(),
},
{
    id: 4,
    title: "Apple Pay",
    selected: false,
    price:'0000',
    icon:appleIcon(),
  },
{
    id: 5,
    title: ".... .... .... .... 4679",
    selected: false,
    price:'0000',
    icon:masterCardIcon(),
  },
];

const paymentCardRendering = () => {
  document.getElementById("container-card-payment").innerHTML = "";
  dataPayment.forEach((item) => {
    const htmlElement = `
        <div class='px-6 '>
              <div id='select-payment' class='rounded-3xl shadow-xl p-6 grid grid-cols-6 items-center gap-4 my-6 bg-white' >
                  <div class=' flex items-center justify-center w-12 h-12   col-span-1'  >
                      ${item.icon}
                  </div>
                  <div class='flex flex-col gap-1 col-span-4'>
                      <h1 id='title-payment' class='text-2xl '>${
                        item.title
                      }</h1>
                  </div>
                  <div class='flex items-center justify-center col-span-1 gap-2 mr-6'>
                      <span class='${!item.price.includes('$')?'opacity-0':''}'>${item.price}</span>
                      <button class='change-payment cursor-pointer' data-id='${
                        item.id
                      } '>${selectIcon(item.selected)}</button>
                  </div>
              </div>
          </div>  
          `;
    document.getElementById("container-card-payment").innerHTML += htmlElement;
  });
  clickableCardPayment();
};
const clickableCardPayment = () => {
  const changeAddressBtns = document.getElementsByClassName("change-payment");

  for (let button of changeAddressBtns) {
    button.addEventListener("click", () => {
      const idBtn = Number(button.getAttribute("data-id"));
      const indexData = dataPayment.findIndex((item) => item.id === idBtn);

      dataPayment = dataPayment.map((item) => {
        if (item.selected) {
          return {
            ...item,
            selected: false,
          };
        } else {
          return item;
        }
      });
      dataPayment[indexData].selected = true;

      paymentCardRendering();
    });
  }
};
export const paymentPage = () => {
  const htmlElement = `
          <div class='w-full bg-white '>
    
              <div class='flex justify-between items-center px-6 py-10'>
                  <div class='flex gap-4 items-center'>
                        <a href="/cards" data-navigo>${backIcon()}</a>
                        <h1 class='text-2xl  font-[700]'>Choose Shipping </h1>
                    </div>
                    <div>${plusIcon()}</div>
              </div>
            <p class='text-gray-500 px-6 text-md'>Select the  payment method you want  to use.</p>
              <div id='container-card-payment'></div>
    
             <div class='rounded-t-3xl bg-white   border-[#EFEFEF] border-t p-6 mt-20'>
                <button id='apply-btn-shipping' class='flex items-center justify-center gap-4 py-5 rounded-full bg-black text-white w-full'>
                    Confirm Payment
                </button>
            </div>
          </div>
          <div id='dialog-delivery-done' class='fixed left-0 top-0 w-full h-screen bg-gray-700/50 hidden justify-center items-center'>
              <div id='white-box-delivery-done' class='max-w-[400px] min-w-[300px] m-auto bg-white rounded-[40px]  px-10 py-6 flex flex-col items-center'>
                <img src='../../../../public/images/payment-confirm.jpg'/>
                <h1 class='text-2xl font-[700] mb-3'>Order Successful !</h1>
                <p class='text-gray-500 mb-3'>You have  successfully made order</p>
                <button id='' class='w-full bg-black rounded-full text-white my-2 py-4'>View Order</button>
                <button class='w-full bg-[#E7E7E7] rounded-full text-gray-500 my-2 py-4'>View E-Receipt</button>
              </div>
          </div>
          `;

  document.getElementById("app").innerHTML = htmlElement;
  paymentCardRendering()
  paymentDialog()
};
