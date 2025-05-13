import { getAllPRoducts } from "../../apis/products";
import { getUserInfo } from "../../apis/user";
import { showProduct } from "../layouts/showProduct";
import { checkExpireToken } from "../utils/errors";
import {
  bagIcon,
  bellIcon,
  cardShopIcon,
  heartHeaderIcon,
  heartIcon,
  homeIcon,
  personIcon,
  walletIcon,
} from "../utils/icons";

const showUserInformation = async () => {
  let infoData;
  try {
    infoData = await getUserInfo();
    document.getElementById("username-header").innerText = infoData.username;
  } catch (error) {
    checkExpireToken(error.response.status);
    console.log(error);
  }
  return infoData;
};
function infiniteCardHandling() {
  let isFetching = false;
  let currentPage = 1;
  let currentCol = 1;

  const loader = document.getElementById("loader");

  // Functions
  const fetchImages = async () => {
    loader.classList.add("show");
    isFetching = true;
    const images = await getAllPRoducts(`?page=${currentPage}&limit=10`);
    updateDom(images.data);
    currentPage++;
    isFetching = false;
    loader.classList.remove("show");
  };
  fetchImages();

  const updateDom = (images) => {
    images.forEach((item) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-wrapper");
      imageContainer.classList.add("loading");
      const divWrapper = document.createElement("div");
      divWrapper.addEventListener("click", () => {
        showProduct(item);

        // change color of like button in product Page
        let flag =true
        document.getElementById("like-product").onclick = () => {
            if (flag) {
                document.getElementById("like-product").innerHTML = heartIcon("red");
                
                flag=false
            }else{
                document.getElementById("like-product").innerHTML = heartIcon();
                flag=true
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
      imageContainer.appendChild(divWrapper);

      if (currentCol === 5) {
        currentCol = 1;
      }

      document.getElementById(`images-container`).appendChild(imageContainer);

      currentCol++;

      setTimeout(() => {
        imageContainer.classList.remove("loading");
      }, 500);
    });
  };

  window.addEventListener("scroll", async () => {
    // Do not run if currently fetching
    if (isFetching) return;

    // Scrolled to bottom
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      await fetchImages();
    }
  });
  const el = document.getElementById("username-header");
  window.scrollTo(0, el.offsetTop);
}
const showMessageTime = () => {
  const day = new Date();
  const hr = day.getHours();
  console.log(hr);

  if (hr >= 6 && hr <= 11) {
    return "Good morning";
  } else if (hr >= 12 && hr <= 14) {
    return "Good afternoon";
  } else if (hr >= 15 && hr <= 19) {
    return "Good evening";
  } else if (hr >= 20 && hr <= 5) {
    return "Good night";
  }
};
const header = () => {
  const headerElement = `
    <header class='px-[24px] py-[16px] flex justify-between items-center '>
        <div class=' flex justify-center flex-col'>
            <p class='text-[#757475] text-[16px] font-[500] flex items-center gap-1'>${showMessageTime()}  <img class='w-[16px] h-[16px]' src='../../public/images/handIcon.png'/></p>
            <p class='text-[#152536] text-[16px] font-[700]' id='username-header'>user</p>
        </div>
        <div class='flex gap-[12px]'>
        <span class='cursor-pointer'>
        ${bellIcon()}
        </span>
        <span class='cursor-pointer'>
        ${heartHeaderIcon()}
        </span>
        </div>
    </header>
    `;
  return headerElement;
};
const footer = () => {
  return `
<footer class='fixed bottom-0 left-0 w-full'>
    <section class='max-w-[450px] mx-auto px-[48px] pt-[12px] pb-[16px] bg-white flex justify-around items-center'>
        <a href='/' data-navigo>
            ${homeIcon()}
            <p class='text-[10px] font-[600] text-[#152536]'>Home</p>
        </a>
        <a href='/' data-navigo>
            ${bagIcon()}
            <p class='text-[10px] font-[600] text-[#152536]'>Cart</p>
        </a>
        <a href='/' data-navigo>
            ${cardShopIcon()}
            <p class='text-[10px] font-[600] text-[#152536]'>Orders</p>
        </a>
        <a href='/' data-navigo>
            ${walletIcon()}
            <p class='text-[10px] font-[600] text-[#152536]'>Wallet</p>
        </a>
        <a href='/' data-navigo>
            ${personIcon()}
            <p class='text-[10px] font-[600] text-[#152536]'>Profile</p>
        </a>
    </section>
</footer>
`;
};
export const homePage = () => {
  const htmlElement = `
    <div class='bg-white relative'>
    ${header()}        
    <main class='min-h-[100vh] pb-10'>

    <div id="images-container" class=" grid grid-cols-2 gap-x-[16px] gap-y-[24px] px-[24px]">
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
  infiniteCardHandling();
};
