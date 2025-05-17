import { getAllPRoducts } from "../../../apis/products";
import { router } from "../../main";
import { checkExpireToken } from "../../utils/errors";
import { starIcon } from "../../utils/icons";
import { updateNumberResults } from "./search";

const updateCardProducts = (product) => {
  product.forEach((item) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-wrapper");
    productContainer.classList.add("loading");
    const divWrapper = document.createElement("div");
    divWrapper.addEventListener("click", () => {
      document.getElementById('body').style.overflow='auto'
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
      <div class='flex items-center gap-2'>
        <span class='flex'>${starIcon()} 4.5</span> | <span class='bg-[#ECECEC] text-[10px] rounded-md px-2  py-1 font-light'>8.374 sold</span>
      </div>
      <p class='text-[16px] font-[600] mt-2'>$${item.price}</p>
      </div>
        `;
    divWrapper.innerHTML = divContent;
    productContainer.appendChild(divWrapper);

    document.getElementById(`results-search`).appendChild(productContainer);

    setTimeout(() => {
      productContainer.classList.remove("loading");
    }, 500);
  });
};
const notFoundProduct = () => {
  const notFound = `
    <div class='flex justify-center pt-10 col-span-2 text-center  flex-col items-center'>
        <img src='../../../public/images/not-found.png'/>
        <h2 class='font-bold text-3xl'>Not Found </h2>
        <p class='text-[#676767]'>
        Sorry. the keyword you  entered  cannot be found . Please check again or search  with another keyword .
        </p>
    </div>
    `;
  document.getElementById(`results-search`).innerHTML = notFound;
};
/**
 * Loads product list with infinite scroll.
 * @param {boolean} isRerender - If true, resets the list before loading new items.
 * @param {string} searchWord -pas a word for search into the api .
 */
export function infiniteResultSearch(isRerender, searchWord) {
  if (isRerender) document.getElementById(`results-search`).innerHTML = "";

  let isFetching = false;
  let currentPage = 1;
  const loader = document.getElementById("loader");

  const fetchProducts = async () => {
    try {
      loader.classList.add("show");
      isFetching = true;

      // console.log(state.brandSort);
      const products = await getAllPRoducts(
        `?page=${currentPage}&limit=10&search=${searchWord}`
      );

      updateNumberResults(products.total);
      if (products.total === 0) {
        notFoundProduct();
      } else {
        updateCardProducts(products.data);
        currentPage++;
        isFetching = false;
        loader.classList.remove("show");
      }
    } catch (error) {
      console.log(error);
      checkExpireToken(error.response?.request?.status);
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
      if (location.pathname==='/search') {
        await fetchProducts();
      }
    }
  });
  const el = document.getElementById("container-search-page");
  window.scrollTo(0, el.offsetTop);
}
