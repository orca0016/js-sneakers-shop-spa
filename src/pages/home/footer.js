import { bagIcon, cardShopIcon, homeIcon, personIcon, walletIcon } from "../../utils/icons";

 export const footer = () => {
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