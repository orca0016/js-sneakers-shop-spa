import { loginPage } from "./pages/login-page";
import "./style.css";

import Navigo from "navigo";
import { tokenName } from "./libs/constants";
import { onboarding } from "./pages/onboarding";
import { signupPage } from "./pages/signup-page";

export const router = new Navigo("/");
// guard
if (!localStorage.getItem(tokenName)) {
  router.navigate("/login");
}

router
  .on("/", () => {
    onboarding();
  })
  .on("/login", () => {
    loginPage();
  })
  .on("/signup", () => {
    signupPage();
  });
router.resolve();
