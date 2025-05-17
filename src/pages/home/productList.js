import { getAllPRoducts } from "../../../apis/products";
import { router } from "../../main";
import { checkExpireToken } from "../../utils/errors";
import { state } from "./brandFilter";

const updateCardProducts = (product) => {
  product.forEach((item) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-wrapper");
    productContainer.classList.add("loading");
    const divWrapper = document.createElement("div");
    divWrapper.addEventListener("click", () => {
      // showProduct(item);
      router.navigate(`/product/${item.id}`);
    });
    const divContent = `
      <div>
      <img 
      alt="a random image by picsum.photos" 
      src="${item.imageURL}"
      class="loading w-full rounded-[24px] object-fill mb-[12px]"
      onerror="this.onerror=null;this.src='https://placeholder.pics/svg/300/EAEAEA-E8E8E8/000000-FFFFFF/image%20not%20found';"
      />
      <h2 class="text-[18px] font-[600] mb-[8px] line-clamp-1">${item.name}</h2>
      <p class='text-[16px] font-[600]'>$${item.price}</p>
      </div>
        `;
    divWrapper.innerHTML = divContent;
    productContainer.appendChild(divWrapper);

    document.getElementById(`product-container`)?.appendChild(productContainer);

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

      // console.log(state.brandSort);
      const products = await getAllPRoducts(
        `?page=${currentPage}&limit=10${
          state.brandSort !== "All" ? `&brands=${state.brandSort}` : ""
        }`
      );
      // console.log(products);

      lengthData = products.data.length;
      updateCardProducts(products.data);
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
      if (location.pathname === "/") {
        await fetchProducts();
      }
    }
  });
  const el = document.getElementById("username-header");
  window.scrollTo(0, el.offsetTop);
}
