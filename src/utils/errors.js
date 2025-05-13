import { router } from "../main";

export function checkExpireToken (status){
      if (status === 403) {
          setTimeout(() => {
             router.navigate('/login');
             vanillaToast.error("you are need to be login ");
          }, 1000);
        }

  }