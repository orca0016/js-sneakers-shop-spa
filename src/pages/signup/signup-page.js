import { backIcon, logoIcon } from "../../utils/icons";
import { customFormSignUp } from "./customFormSignup";

export function signupPage() {
  const htmlLogin = `
    <div class="min-h-screen bg-white-card flex items-center flex-col relative px-[24px] pb-[32px]">
      <a data-navigo href='/welcome' class="absolute left-[12px] top-[12px]">
        ${backIcon()}
      </a>
      <div class="mt-[132px]">
        ${logoIcon()}
      </div>
      <h2 class="text-[32px] font-[600] mt-[118px] text-[#152536]">Signup to Your Account</h2>
      <div id="form-login" class="w-full"></div>
    </div>
  `;

  document.getElementById("app").innerHTML = htmlLogin;
  document.getElementById("form-login").appendChild(customFormSignUp());
}
