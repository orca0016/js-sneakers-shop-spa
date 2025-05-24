import { mapIcon, nextArrowIcon, penIcon, truckIcon } from "../../utils/icons";

export const renderCurrentAddress = () => {
  const currentCard = document.getElementById("current-card-address");
  const addresses = JSON.parse(localStorage.getItem("address-list")) || [

    {
      id: 1,
      title: "Select a address",
      description: "",
      selected: true,
      isDefault: true,
    },
  ];
  const defaultData = addresses.find((item) => item.selected);

  const htmlElement = `
    <div id='select-address' class='rounded-3xl shadow-2xl p-6 grid grid-cols-6 items-center gap-4 my-6' >
                <div class='rounded-full flex items-center justify-center w-10 h-10  bg-black text-white col-span-1'  style='box-shadow:0px 0px 0 8px #DFDFDF;'>
                    ${mapIcon()}
                </div>
                <div class='flex flex-col gap-1 col-span-4'>
                    <h1 id='title-address' class='text-2xl '>${
                      defaultData.title
                    }</h1>
                    <p id='description-address' class='text-gray-500 font-light text-[16px] line-clamp-1'>${
                      defaultData.description
                    }</p>
                </div>
                <div class='flex items-center justify-center col-span-1'>
                    <a href='/checkout/address' data-navigo class='change-address cursor-pointer'>${penIcon()}</a>
                </div>
            </div>
    `;
  currentCard.innerHTML = htmlElement;
};
export const renderCurrentShipping = () => {
  const selectedShippingMethod = JSON.parse(localStorage.getItem("Shipping-method"));
  let htmlElement;

  if (!selectedShippingMethod) {
    htmlElement = ` 
        <div id='select-address' class='rounded-3xl shadow-2xl p-6 grid grid-cols-6 items-center gap-4 my-6' >
                    <div class='col-span-1'>
                        ${truckIcon()}
                    </div>
                    <div class='flex flex-col gap-1 col-span-4'>
                        <h1 id='title-address' class='text-lg'>Choose Shipping Type</h1>
                    </div>
                    <div class='flex items-center justify-center col-span-1'>
                        <a href='/checkout/shipping' class='change-address cursor-pointer'>${nextArrowIcon()}</a>
                    </div>
                </div>
`;
  } else {
    htmlElement = `<div  class='rounded-3xl shadow-2xl p-6 grid grid-cols-6 items-center gap-4 my-6' >
                <div class='rounded-full flex items-center justify-center w-12 h-12  bg-[#161617] text-white col-span-1'>
                    ${selectedShippingMethod.icon}
                </div>
                <div class='flex flex-col gap-1 col-span-4'>
                    <h1 id='title-address' class='text-2xl '>${
                      selectedShippingMethod.title
                    }</h1>
                    <p id='description-address' class='text-gray-500 font-light text-[16px] line-clamp-1'>${
                      selectedShippingMethod.description
                    }</p>
                </div>
                <div class='flex items-center justify-center gap-2 col-span-1'>
                <span>$${selectedShippingMethod.price}</span>
                    <a href='/checkout/shipping' data-navigo class='change-address cursor-pointer'>${penIcon()}</a>
                </div>
            </div>`;
  }
  document.getElementById("card-shipping-method").innerHTML = htmlElement;
};