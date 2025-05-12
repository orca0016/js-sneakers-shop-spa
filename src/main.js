import { loginPage } from "./pages/login-page";
import "./style.css";

import Navigo from "navigo";
import { tokenName } from "./libs/constants";
import { homePage } from "./pages/home-page";
import { onboarding } from "./pages/onboarding";
import { signupPage } from "./pages/signup-page";

export const router = new Navigo("/");
// guard
if (!localStorage.getItem("show-onboard")) {
  router.navigate("/");
} else if (!localStorage.getItem(tokenName)) {
  router.navigate("/login");
}

router
  .on("/", () => {
    if (!localStorage.getItem("show-onboard")) {
      onboarding();
    } else {
      homePage();
    }
  })
  .on("/login", () => {
    loginPage();
  })
  .on("/signup", () => {
    signupPage();
  });
router.resolve();
