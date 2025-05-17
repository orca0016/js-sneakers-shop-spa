import Toastify from "toastify-js";
/**
 * Show a notification
 * @param {string} message - The message for  displayed in screen .
 * @param {string} type - Can be -success- -danger- -warning- for type of toast notification.
 * @param {number} duration - By default is 3 seconde and optional.
 */
export function showToast(message, type = "success", duration = 3000) {
  const backgrounds = {
    success: "linear-gradient(to right, #00b09b, #96c93d)",
    danger: " #FF2A04",
    warning: " #FFB302",
  };
  Toastify({
    text: message,
    duration: duration,
    close: true,
    oldestFirst:true , 
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "test",
    style: {
      background: backgrounds[type],
    },
  }).showToast();
}
