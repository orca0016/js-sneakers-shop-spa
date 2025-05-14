import { searchIcon } from "../../utils/icons";
import { fetchBrands } from "./brandFilter";
import { footer } from "./footer";
import { header, showUserInformation } from "./heaer";
import { infiniteCardHandling } from "./productList";
import { searchSection } from "./searchSection";

export const homePage = async () => {
  const htmlElement = `
    <div class='bg-white relative'>
    ${header()}
    <div class='py-[6px] px-[24px]'>
    <div class='relative' id='search-container'></div>
    </div>
    <div class='px-[24px]'>
      <div class='flex justify-between mb-[20px]'>
        <h2 class='text-[1.2rem] font-bold'>Most Popular </h2>
        <h2>See All</h2>
      </div>
      <div id='list-brands' class='w-full overflow-auto flex h-[50px]  gap-x-[12px] mb-[24px] '>
      </div>
    </div>
    
    <main class='min-h-[100vh] pb-10'>

    <div id="product-container" class=" grid grid-cols-2 gap-x-[16px] gap-y-[24px] px-[24px]">
    </div>
    <div id="loader" class="loader"></div>
  </main>
   <div id="product-modal" class="fixed w-full h-screen top-0 left-0 bg-white z-50 hidden  overflow-y-scroll">
        <div id="product-modal-content" class="max-w-[450px] mx-auto relative ">
        </div>
    </div>
  ${footer()}
    </div>
    `;
  document.getElementById("app").innerHTML = htmlElement;

  showUserInformation();
  searchSection();
  await fetchBrands();
  infiniteCardHandling();
};
