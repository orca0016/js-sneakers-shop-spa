import { router } from "../main";
import { showToast } from "./toasts/toast";

export function checkExpireToken (status){
      if (status === 403) {
          setTimeout(() => {
             router.navigate('/login');
              showToast("Forbidden access. You should login again.", "danger");
          }, 1000);
        }

  }