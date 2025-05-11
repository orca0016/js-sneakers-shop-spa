import { loginPage } from "./pages/login-page";
import "./style.css";

import Navigo from "navigo";
import { signupPage } from "./pages/signup-page";

export const router = new Navigo("/");
router
  .on("/login", () => {
    loginPage();
  })
  .on("/signup", () => {
    signupPage();
  });
router.resolve();
