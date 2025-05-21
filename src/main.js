import Navigo from "navigo";
import "toastify-js/src/toastify.css";
import { tokenName } from "./libs/constants";
import { cardPage } from "./pages/cards/cardsPage";
import { addressPage } from "./pages/checkout/address/addressPage";
import { checkoutPage } from "./pages/checkout/checkoutPage";
import { paymentPage } from "./pages/checkout/payment/paymentPage";
import { shippingPage } from "./pages/checkout/shipping/shippinPage";
import { homePage } from "./pages/home/home-page";
import { loginPage } from "./pages/login-page";
import { onboarding } from "./pages/onboarding";
import { searchPage } from "./pages/search/search";
import { renderProduct } from "./pages/showProduct/showProduct";
import { signupPage } from "./pages/signup-page";
import "./style.css";
import { showToast } from "./utils/toasts/toast";

export const router = new Navigo("/");
// guard
if (!localStorage.getItem("show-onboard")) {
  router.navigate("/");
} else if (!localStorage.getItem(tokenName)) {
  router.navigate("/login");
  showToast("you are need to be login", "danger");
}

if (!localStorage.getItem("show-onboard")) {
  router.navigate("welcome");
}
router
  .on("/", () => {
    homePage();
  })
  .on("/login", () => {
    loginPage();
  })
  .on("/signup", () => {
    signupPage();
  })
  .on("/search", () => {
    searchPage();
  })
  .on("/cards", () => {
    cardPage();
  })
  .on("/welcome", () => {
    onboarding();
  })
  .on("/product/:id", ({ data }) => {
    renderProduct(data);
  })
  .on("/checkout", () => {
    checkoutPage();
  })
  .on("/checkout/address", () => {
    addressPage();
  })
  .on("/checkout/shipping", () => {
    shippingPage();
  })
  .on("/checkout/payment", () => {
    paymentPage();
  });
router.resolve();
