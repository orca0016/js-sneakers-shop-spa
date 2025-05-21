import { getUserInfo } from "../../../apis/user";
import { router } from "../../main";
import { checkExpireToken } from "../../utils/errors";
import { bellIcon, heartHeaderIcon, logOutIcon } from "../../utils/icons";

// Display a specific time of day based on the system clock.
const showMessageTime = () => {
  const day = new Date();
  const hr = day.getHours();

  if (hr >= 6 && hr < 12) {
    return "Good morning";
  } else if (hr >= 12 && hr < 15) {
    return "Good afternoon";
  } else if (hr >= 15 && hr < 20) {
    return "Good evening";
  } else if (hr >= 20 && hr < 24) {
    return "Good night";
  } else {
    return "have a good time";
  }
};
export const showUserInformation = async () => {
  let infoData;
  try {
    infoData = await getUserInfo();
    document.getElementById("username-header").innerText = infoData.username;
  } catch (error) {
    checkExpireToken(error.response?.request?.status);
    console.log(error);
  }
  return infoData;
};
export const handleLogOutBtn =()=>{
  const logOutBtn = document.getElementById('log-out-btn')
  logOutBtn.addEventListener('click' , ()=>{
    localStorage.removeItem('app-token')
    router.navigate('/login')
  })
}
export const header = () => {
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
            
            <span id='log-out-btn' class='cursor-pointer'>
            ${logOutIcon()}
            </span>
            </div>
        </header>
        `;
  return headerElement;
};
