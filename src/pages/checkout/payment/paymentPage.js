import {
  appleIcon,
  backIcon,
  googleIcon,
  loadingIcon,
  masterCardIcon,
  paypalIcon,
  plusIcon,
  walletPaymentIcon,
} from "../../../utils/icons";
import { paymentCardRendering } from "./paymentCardRendering";
import { paymentDialog } from "./paymentDialog";
let dataPayment = [
  {
    id: 1,
    title: "My Wallet",
    selected: true,
    price: "$9.55",
    icon: walletPaymentIcon(),
  },
  {
    id: 2,
    title: "PayPal",
    selected: false,
    price: "0000",
    icon: paypalIcon(),
  },
  {
    id: 3,
    title: "Google Payment",
    selected: false,
    price: "0000",
    icon: googleIcon(),
  },
  {
    id: 4,
    title: "Apple Pay",
    selected: false,
    price: "0000",
    icon: appleIcon(),
  },
  {
    id: 5,
    title: ".... .... .... .... 4679",
    selected: false,
    price: "0000",
    icon: masterCardIcon(),
  },
];

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
            <div class='hidden animate-spin' id='loading-dialog-payment'>
              ${loadingIcon()}
            </div>
              <div id='white-box-delivery-done' class='max-w-[400px] min-w-[300px] m-auto bg-white rounded-[40px]  px-10 py-6 hidden flex-col items-center'>
                <img src='../../../../public/images/payment-confirm.jpg'/>
                <h1 class='text-2xl font-[700] mb-3'>Order Successful !</h1>
                <p class='text-gray-500 mb-3'>You have  successfully made order</p>
                <button class='w-full bg-black rounded-full text-white my-2 py-4' id='back-to-home-modal-payment'>Back to the Home page</button>
                <button class='w-full bg-[#E7E7E7] rounded-full text-gray-500 my-2 py-4' id='view-receipt-btn'>View Orders</button>
              </div>
          </div>
          `;

  document.getElementById("app").innerHTML = htmlElement;
  paymentCardRendering(dataPayment);
  paymentDialog();
};
