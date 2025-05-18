import { loginPage } from "./pages/login-page";
import "./style.css";
import "toastify-js/src/toastify.css"
import Navigo from "navigo";
import { tokenName } from "./libs/constants";
import { homePage } from "./pages/home/home-page";
import { onboarding } from "./pages/onboarding";
import { signupPage } from "./pages/signup-page";
import { searchPage } from "./pages/search/search";
import { cardPage } from "./pages/cards/cardsPage";
import { renderProduct } from "./pages/showProduct/showProduct";
import { checkoutPage } from "./pages/checkout/checkoutPage";
import { addressPage } from "./pages/checkout/address/addressPage";
import { shippingPage } from "./pages/checkout/shipping/shippinPage";


export const router = new Navigo("/");
// guard
if (!localStorage.getItem("show-onboard")) {
  router.navigate("/");
} else if (!localStorage.getItem(tokenName)) {
  router.navigate("/login");
  vanillaToast.error("you are need to be login ");
}

if (!localStorage.getItem("show-onboard")) {
  router.navigate('welcome')
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
    renderProduct(data)
  })
  .on("/checkout", () => {
    checkoutPage()
  })
  .on("/checkout/address", () => {
    addressPage()
  })
  .on("/checkout/shipping", () => {
    shippingPage()
  });
router.resolve();
