import { logoIcon, searchIcon } from "../../utils/icons";
import { card } from "../cards/singleCardProduct";
import { footer } from "../home/footer";
const renderOrders = () => {
  const ordersContainer = document.getElementById("orders-container");
  const ordersData = JSON.parse(localStorage.getItem("orders-list")) || [];

  ordersData.forEach((order) => {
    const htmlElement = `
      <div class="w-full rounded-2xl bg-white shadow-md border border-gray-200 overflow-hidden">
        <div class="p-4 border-b border-gray-100 flex flex-wrap gap-4 text-sm text-gray-700">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-500">Total Price:</span>
            <span class="text-green-700 font-bold">$${
              order.prices.totalPrices
            }</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-500">Shipping Cost:</span>
            <span class="text-blue-600">$${order.prices.shippingCont}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-500">Discount:</span>
            <span class="text-red-600">-$${order.prices.discountPrice}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-500">Address:</span>
            <span class="truncate max-w-xs text-gray-800">${
              order.orderAddress.description
            }</span>
          </div>
        </div>
        
        <div class="p-4 bg-gray-50 grid gap-4">
          ${order.orderProduct.map((item) => card(item, true)).join("")}
        </div>
      </div>
    `;

    ordersContainer.innerHTML += htmlElement;
  });

//   if orders not found
  if (ordersData.length === 0) {
    ordersContainer.innerHTML = `
      <div class='flex flex-col items-center h-[50vh] justify-center'>
      <img src="../../../public/images/not-found.png" alt="order not found">
      <h1 class='text-4xl text-slate-900 font-semibold'>No orders found.</h1>
      </div>
      `;
  }
};

export const orderPage = () => {
  const htmlElement = `
    <div class='bg-white min-h-[100vh] px-6 py-10'>
      <div class='flex justify-between items-center'>
        <h2 class='flex gap-3 items-center'>
          <span class='w-3 h-3'>${logoIcon()}</span>
          <span class='font-bold   text-xl'>My Orders</span>
        </h2>
        <div class='text-black'>
          ${searchIcon()}
        </div>
      </div>

      <div class='py-10 pb-20 space-y-6' id='orders-container'></div>
      
      ${footer()}
    </div>
  `;

  document.getElementById("app").innerHTML = htmlElement;
  renderOrders();
};
