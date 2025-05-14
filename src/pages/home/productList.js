import { getAllPRoducts } from "../../../apis/products";
import { showProduct } from "../../layouts/showProduct/showProduct";
import { checkExpireToken } from "../../utils/errors";
import { heartIcon } from "../../utils/icons";
import { state } from "./brandFilter";

const updateCardProducts = (product) => {
  product.forEach((item) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-wrapper");
    productContainer.classList.add("loading");
    const divWrapper = document.createElement("div");
    divWrapper.addEventListener("click", () => {
      showProduct(item);

      // change color of like button in product Page
      let flag = true;
      document.getElementById("like-product").onclick = () => {
        if (flag) {
          document.getElementById("like-product").innerHTML = heartIcon("red");

          flag = false;
        } else {
          document.getElementById("like-product").innerHTML = heartIcon();
          flag = true;
        }
      };
    });
    const divContent = `
      <div>
      <img 
      alt="a random image by picsum.photos" 
      src="${item.imageURL}"
      class="loading w-full rounded-[24px] object-fill mb-[12px]"
      onerror="this.onerror=null;this.src='https://placeholder.pics/svg/300/EAEAEA-E8E8E8/000000-FFFFFF/image%20not%20found';"
      />
      <h2 class="text-[20px] font-[700] mb-[8px]">${item.name}</h2>
      <p class='text-[16px] font-[600]'>$${item.price}</p>
      </div>
        `;
    divWrapper.innerHTML = divContent;
    productContainer.appendChild(divWrapper);

    document.getElementById(`product-container`).appendChild(productContainer);

    setTimeout(() => {
      productContainer.classList.remove("loading");
    }, 500);
  });
};

/**
 * Loads product list with infinite scroll.
 * @param {boolean} isRerender - If true, resets the list before loading new items.
 */
export function infiniteCardHandling(isRerender) {
  if (isRerender) document.getElementById(`product-container`).innerHTML = "";

  let isFetching = false;
  let currentPage = 1;
  let lengthData;
  const loader = document.getElementById("loader");

  const fetchProducts = async () => {
    try {
      loader.classList.add("show");
      isFetching = true;
      const images = await getAllPRoducts(
        `?page=${currentPage}&limit=10${
          state.brandSort !== "All" ? `&brands=${state.brandSort}` : ""
        }`
      );
      lengthData = images.data.length;
      updateCardProducts(images.data);
      currentPage++;
      isFetching = false;
      loader.classList.remove("show");
    } catch (error) {
      console.log(error);
      checkExpireToken(error.response.request.status);
    }
  };
  fetchProducts();

  window.addEventListener("scroll", async () => {
    // Do not run if currently fetching
    if (isFetching) return;

    // Scrolled to bottom
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      await fetchProducts();
    }
  });
  const el = document.getElementById("username-header");
  window.scrollTo(0, el.offsetTop);
}
