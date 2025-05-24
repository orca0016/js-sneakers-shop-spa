import gsap from "gsap/all";
import { v4 as uuidv4 } from "uuid";
import { showToast } from "../../../utils/toasts/toast";
import { addressCardRendering } from "./addressPage";
export const getPrevAddress = () => {
  const dataAddress = localStorage.getItem("address-list") || "[]";
  return JSON.parse(dataAddress);
};
let addressData = getPrevAddress();
const handleAnimationDialog = (direction) => {
  if (direction === "hidden") {
    let timelineAnimation = gsap.timeline();
    timelineAnimation
      .to("#box-dialog-add-new-address", {
        duration: 0.3,
        scale: 0,
        opacity: 0,
        display: "block",
      })
      .to("#box-dialog-add-new-address", {
        duration: 0,
        display: "none",
      });
    timelineAnimation.to("#wrapper-dialog-add-new-address", {
      duration: 0,
      display: "none",
    });
  } else {
    let timelineAnimation = gsap.timeline();
    timelineAnimation
      .to("#wrapper-dialog-add-new-address", {
        display: "flex",
        duration: 0,
      })
      .to("#box-dialog-add-new-address", {
        duration: 0,
        scale: 0,
        display: "none",
      })
      .to("#box-dialog-add-new-address", {
        duration: 0.3,
        display: "block",
        opacity: 1,
        scale: 1,
      });
  }
};
export const createNewAddress = () => {
  const wrapperDialog = document.getElementById(
    "wrapper-dialog-add-new-address"
  );
  wrapperDialog.addEventListener("click", (e) => {
    handleAnimationDialog("hidden");
  });
  const boxDialog = document.getElementById("box-dialog-add-new-address");
  boxDialog.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const openAddNew = document.getElementById("open-dialog-add-new-address");
  openAddNew.addEventListener("click", () => {
    handleAnimationDialog("show");
  });

  const formAddNew = document.getElementById("form-dialog-add-new-address");
  formAddNew.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = e.target.children.titleAddress;
    const descriptionInput = e.target.children.descriptionAddress;
    if (!titleInput.value || !descriptionInput.value) {
      showToast("Please enter a value", "warning");
      return;
    }
    const newAddress = {
      id: uuidv4(),
      title: titleInput.value,
      description: descriptionInput.value,
      selected: addressData.length===0?true:false,
    };
    addressData.push(newAddress);
    localStorage.setItem("address-list", JSON.stringify(addressData));
    titleInput.value = "";
    descriptionInput.value = "";
    addressCardRendering()
    handleAnimationDialog('hidden')
    showToast('Address added')
  });
};
