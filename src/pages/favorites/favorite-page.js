import { router } from "../../main";
import { logoIcon, searchIcon, starIcon } from "../../utils/icons";
import { footer } from "../home/footer";
import { handlingLikeBtn } from "./handlingLikeBtn";

export const renderCardProducts = (product) => {
  document.getElementById(`container-favorite-card`).innerHTML = "";
  product.forEach((item) => {
    const divWrapper = document.createElement("div");
    divWrapper.addEventListener("click", () => {
      router.navigate(`/product/${item.pid}`);
    });

    const divContent = `
      <div class='relative'>
          <img 
          alt="a random image by picsum.photos" 
          src="${item.imageURL}"
          class="loading w-full rounded-[24px] object-fill mb-[12px]"
          onerror="this.onerror=null;this.src='https://placeholder.pics/svg/300/EAEAEA-E8E8E8/000000-FFFFFF/image%20not%20found';"
          />
          <h2 class="text-[18px] font-[600] mb-[8px] line-clamp-1">${
            item.name
          }</h2>
          <div class='flex items-center gap-2'>
            <span class='flex'>${starIcon()} 4.5</span> | <span class='bg-[#ECECEC] text-[10px] rounded-md px-2  py-1 font-light'>8.374 sold</span>
          </div>
        <p class='text-[16px] font-[600] mt-2'>$${item.price}</p>
        <button class='favorite-btn-like absolute right-3 top-3 rounded-full p-2 bg-[#252626] text-white'data-id='${
          item.id
        }' ></button>
      </div>
        `;
    divWrapper.innerHTML = divContent;

    document.getElementById(`container-favorite-card`).appendChild(divWrapper);
  });
  if (product.length === 0) {
    document.getElementById(`container-favorite-card`).innerHTML = `
    <div class='flex justify-center pt-10 col-span-2 text-center  flex-col items-center'>
        <img src='../../../public/images/not-found.png'/>
        <h2 class='font-bold text-3xl'>There is nothing to show. </h2>
        <p class='text-[#676767]'>
       There are no products in your wishlist.
        </p>
    </div>
    `;
  }
  handlingLikeBtn(product, "favorite-btn-like");
};
export const favoritePage = () => {
  const htmlElement = `
        <div class='bg-white min-h-[100vh] px-6 py-10'>
              <div class='flex justify-between items-center'>
                <h2 class='flex gap-3 items-center'>
                  <span class='h-3 w-3'>${logoIcon()}</span>
                  <span class='font-bold  text-2xl'>My Favorite Products</span>
                </h2>
                <div class='text-black text-2xl'>
                  ${searchIcon()}
                </div>
              </div>
            <div id='container-favorite-card' class='grid grid-cols-2 gap-4 py-10 '>
              
            </div>
              ${footer()}
            </div>
    `;
  document.getElementById("app").innerHTML = htmlElement;

  const favoritesData =
    JSON.parse(localStorage.getItem("favorite-product")) || [];
  renderCardProducts(favoritesData);
};
