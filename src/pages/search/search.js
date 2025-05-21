import { v4 as uuidv4 } from "uuid";
import { optionIcon, searchIcon } from "../../utils/icons";
import { footer } from "../home/footer";
import { handleLengthHistory } from "../home/searchSection";
import { infiniteResultSearch } from "./resultsSearch";
import { createInputSearch } from "./searchInput";

export const updateNumberResults = (number) => {
  document.getElementById("results-number").innerHTML = number;
};
export function submitSearch(value) {
  let reSearch = JSON.parse(localStorage.getItem("history-search")) || [];
  const newHistory = {
    name: value  ,
    id: uuidv4(),
  };
  localStorage.setItem(
    "history-search",
    JSON.stringify([...reSearch, newHistory])
  );
}

export const searchPage = () => {
  const searchHistory = JSON.parse(localStorage.getItem("history-search")) || [
    {
      name: "not found",
    },
  ];
  const lastSearch = searchHistory[searchHistory.length - 1];
  const htmlElement = `
<div class='bg-white px-[24px] py-10  pt-6 min-h-[100vh] overflow-y-auto' >
    <form autocomplete='off' id='container-search-page' class='py-[24px] relative'>
    <button class='absolute right-3 top-10'>${optionIcon()}</button>
    <button type="submit" id='search-again' class='absolute left-4 inset-y-5 cursor-pointer'>${searchIcon()}</button>
    </form>
    <div class='flex justify-between'>
        <div class='text-[1.2rem] font-bold'>Results for "<span id='result-search' >
        ${lastSearch.name}
        </span>"</div>
        <div><span id='results-number'>0</span> founds</div>
    </div>
    <div id='results-search' class='grid grid-cols-2 gap-5 pt-6'></div>
    <div id="loader" class="loader"></div>
    <div id="product-modal" class="fixed w-full h-screen top-0 left-0 bg-white z-50 hidden  overflow-y-scroll">
        <div id="product-modal-content" class="max-w-[450px] mx-auto relative ">
        </div>
    </div>
    ${footer()}
</div>
`;

  document.getElementById("app").innerHTML = htmlElement;

  document
    .getElementById("container-search-page")
    .appendChild(createInputSearch(lastSearch.name));

  infiniteResultSearch(false, lastSearch.name);

  document
    .getElementById("container-search-page")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      infiniteResultSearch(true, e.target.searchInput.value);
      document.getElementById("result-search").innerHTML =
        e.target.searchInput.value;
      submitSearch(e.target.searchInput.value);
      handleLengthHistory();
    });
};
