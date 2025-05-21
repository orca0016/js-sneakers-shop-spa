import { login } from "../../apis/auth";
import { tokenName } from "../libs/constants";
import { router } from "../main";
import { checkExpireToken } from "../utils/errors";
import {
  backIcon,
  emailIcon,
  eyesCloseIcon,
  eyesOpenIcon,
  lockIcon,
  logoIcon,
} from "../utils/icons";
import { showToast } from "../utils/toasts/toast";

const updateIconColor = (iconDiv, iconFn, value) => {
  iconDiv.innerHTML = iconFn(value === "" ? "#6C757D" : "#000000");
};

const createInputField = (type, name, placeholder, iconFn) => {
  const wrapper = document.createElement("div");
  wrapper.className = "relative min-w-full";
  
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.className =
    "w-full bg-white-input pl-[32px] h-[37px] borer-0 rounded-md shadow-xs focus:outline-2";

  const iconDiv = document.createElement("div");
  iconDiv.className =
    "absolute left-[12px] top-[10px] bottom-[10px] text-placeholder-text";
  iconDiv.innerHTML = iconFn("#6C757D");

  wrapper.appendChild(input);
//message wrapper
  const messageInput = document.createElement("p");
  messageInput.className='text-red-400 text-sm mt-3 opacity-0'
  messageInput.id=`message-login-${name}`
  messageInput.innerText =
    name === "username"
      ? "Username must be longer than 5"
      : "Min 8 character with  at insert  one capital letter  , a number and special character  .";
      wrapper.appendChild(messageInput);

  
  input.addEventListener("input", (e) => {
    updateIconColor(iconDiv, iconFn, e.target.value);
    if (name==='username' && input.value.length<5) {
      messageInput.classList.add('opacity-[100%]')    
    }else if(name==='password'&& !isPasswordValid(input.value)){
      messageInput.classList.add('opacity-[100%]')   
    }else{
      messageInput.classList.remove('opacity-[100%]')   
    }
  });

      wrapper.appendChild(iconDiv);
  if (type === "password") {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className =
      "absolute right-[12px] top-[10px] text-[4rem] ";
    toggleBtn.innerHTML = eyesCloseIcon();

    toggleBtn.addEventListener("click", () => {
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      toggleBtn.innerHTML = isPassword ? eyesOpenIcon() : eyesCloseIcon();
    });

    wrapper.appendChild(toggleBtn);
  }

  return wrapper;
};

const isPasswordValid = (value) => {
  const hasSpecial = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  return hasSpecial && hasNumber && hasUpper && hasLower && value.length >= 8;
};

export const customForm = () => {
  const form = document.createElement("form");
  form.autocomplete = "off";
  form.className = "w-full mt-[48px] flex flex-col gap-[21px]";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const data = { username, password };
    try {
      const resBody = await login(data);
      localStorage.setItem(tokenName, resBody.token);
      showToast("welcome " + resBody.user.username);
      // vanillaToast.success("welcome "+ resBody.user.username);
      router.navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      showToast(error.response.data.message, "danger");
      checkExpireToken(error.response.status);
      e.target.username.value = "";
      e.target.password.value = "";
      form.getElementsByTagName("button")[1].setAttribute("disabled", "true");
    }
  });
  const usernameWrapper = createInputField(
    "text",
    "username",
    "Username",
    emailIcon
  );
  const passwordWrapper = createInputField(
    "password",
    "password",
    "Password",
    lockIcon
  );

  const usernameInput = usernameWrapper.querySelector("input");
  const passwordInput = passwordWrapper.querySelector("input");

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.innerText = "Login";
  submitBtn.className =
    "w-full bg-dark-gray rounded-3xl h-[47px] text-white text-[14px] mt-[200px] cursor-pointer disabled:bg-disable-btn";
  submitBtn.setAttribute("disabled", "true");

  const validateForm = () => {
    const isUsernameValid = usernameInput.value.length >= 5;
    const isPassValid = isPasswordValid(passwordInput.value);

    usernameInput.classList.toggle(
      "outline-red-400",
      !isUsernameValid && usernameInput.value !== ""
    );
    passwordInput.classList.toggle(
      "outline-red-400",
      !isPassValid && passwordInput.value !== ""
    );

    if (isUsernameValid && isPassValid) {
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.setAttribute("disabled", "true");
    }
  };

  usernameInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);

  const signupLink = document.createElement("a");
  signupLink.href = "/signup";
  signupLink.setAttribute("data-navigo", true);
  signupLink.className = "text-center text-[14px] font-[500]";
  signupLink.innerText = "Signup";

  form.append(usernameWrapper, passwordWrapper, signupLink, submitBtn);

  return form;
};

export function loginPage() {
  const htmlLogin = `
    <div class="min-h-screen bg-white-card flex items-center flex-col relative px-[24px] pb-[32px]">
      <a data-navigo href='/welcome' class="absolute left-[12px] top-[12px]">
        ${backIcon()}
      </a>
      <div class="mt-[132px]">
        ${logoIcon()}
      </div>
      <h2 class="text-[32px] font-[600] mt-[118px] text-[#152536]">Login to Your Account</h2>
      <div id="form-login" class="w-full"></div>
    </div>
  `;

  document.getElementById("app").innerHTML = htmlLogin;
  document.getElementById("form-login").appendChild(customForm());
}
