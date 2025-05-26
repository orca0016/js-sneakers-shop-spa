import { footer } from "../home/footer";

export const notFoundPage = () => {
  const htmlElement = `
    <div class='flex flex-col gap-8 items-center justify-center w-full h-screen  '>
        <img src="../../../public/images/not-found.png" alt="not found">

        <h1 class='text-4xl font-semibold text-slate-900'>Page not found</h1>
        ${footer()}
    </div>
    
    `;

  document.getElementById("app").innerHTML = htmlElement;
};
