import { login } from "../../apis/auth";
import { tokenName } from "../libs/constants";
import {
  backIcon,
  emailIcon,
  eyesCloseIcon,
  eyesOpenIcon,
  lockIcon,
  logoIcon,
} from "../utils/icons";

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

  input.addEventListener("input", (e) => {
    updateIconColor(iconDiv, iconFn, e.target.value);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(iconDiv);

  if (type === "password") {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className =
      "absolute right-[12px] top-[10px] text-[4rem] bottom-[10px]";
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
  form.className = "w-full mt-[48px] flex flex-col gap-[21px]";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const data = { username, password };
    try {
      const resBody = await login(data);
      localStorage.setItem(tokenName, resBody.token);
      location.href = "/";
    } catch (error) {      
      console.log(error);
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
  submitBtn.innerText = "Signup";
  submitBtn.className =
    "w-full bg-dark-gray rounded-3xl h-[47px] text-white text-[14px] mt-[288px] cursor-pointer disabled:bg-disable-btn";
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

  const signinLink = document.createElement("a");
  signinLink.href = "/Login";
  signinLink.setAttribute("data-navigo", true);
  signinLink.className = "text-center text-[14px] font-[500]";
  signinLink.innerText = "Login";

  form.append(usernameWrapper, passwordWrapper, signinLink, submitBtn);

  return form;
};

export function signupPage() {
  const htmlLogin = `
    <div class="min-h-screen bg-white-card flex items-center flex-col relative px-[24px] pb-[32px]">
      <button class="absolute left-[12px] top-[12px]">
        ${backIcon()}
      </button>
      <div class="mt-[132px]">
        ${logoIcon()}
      </div>
      <h2 class="text-[32px] font-[600] mt-[118px] text-[#152536]">Signup to Your Account</h2>
      <div id="form-login" class="w-full"></div>
    </div>
  `;

  document.getElementById("app").innerHTML = htmlLogin;
  document.getElementById("form-login").appendChild(customForm());
}
