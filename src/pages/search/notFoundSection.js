export const notFoundProduct = () => {
  const notFound = `
    <div class='flex justify-center pt-10 col-span-2 text-center  flex-col items-center'>
        <img src='../../../public/images/not-found.png'/>
        <h2 class='font-bold text-3xl'>Not Found </h2>
        <p class='text-[#676767]'>
        Sorry. the keyword you  entered  cannot be found . Please check again or search  with another keyword .
        </p>
    </div>
    `;
  document.getElementById(`results-search`).innerHTML = notFound;
};