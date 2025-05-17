import { v4 as uuidv4 } from "uuid";
import { router } from "../../main";
import { closeIcon, searchIcon } from "../../utils/icons";

let reSearch = JSON.parse(localStorage.getItem("history-search")) || [];
export const handleLengthHistory = () => {
  let list = JSON.parse(localStorage.getItem("history-search"));
  if (list.length > 10) {
    list.shift();
    localStorage.setItem("history-search", JSON.stringify(list));
  }
};
const handelLocalSearchHistory = (e) => {
  const newData = {
    id: uuidv4(),
    name: e.target.searchInput.value,
  };
  localStorage.setItem(
    "history-search",
    JSON.stringify(reSearch ? [...reSearch, newData] : [newData])
  );
  handleLengthHistory();

  router.navigate("/search");
};
const createInputSearch = (divHistoryResults) => {
  //   input of search section
  const input = document.createElement("input");
  input.type = "text";
  input.name = "searchInput";
  input.required = "true";
  input.className =
    "cursor-pointer w-full bg-white-input placeholder:text-[#BAB8BC] py-[8px] px-[12px] pl-[30px] rounded-md";
  input.placeholder = "Search";
  input.addEventListener("input", (e) => {
    if (!e.target.value) {
      divHistoryResults.classList.add("hidden");
      divHistoryResults.classList.remove("block");
      document.getElementById("body").style.overflow = "auto";
    } else {
      divHistoryResults.classList.add("block");
      divHistoryResults.classList.remove("hidden");
      document.getElementById("body").style.overflow = "hidden";
    }
  });
  return input;
};
const createSubmitSearch = () => {
  //   btn of search section
  const submitBtn = document.createElement("button");
  submitBtn.innerHTML = searchIcon();
  submitBtn.className = "absolute left-2 inset-y-3";
  submitBtn.type = "submit";
  return submitBtn;
};
export const searchSection = () => {
  const searchContainer = document.getElementById("search-container");

  // handling the form event
  const form = document.createElement("form");
  form.autocomplete = "off";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("body").style.overflow = "auto";
    handelLocalSearchHistory(e);
  });

  const divHistoryResults = document.createElement("div");
  divHistoryResults.className =
    "absolute top-[102%] bg-white w-full  h-[84vh] z-[1000] hidden overflow-y-auto pb-[20px]";
  const headerHistory = `
  <div class='flex justify-between py-[22px] border-b border-gray-line'>
    <h2 class='text-[1.2rem] font-bold'>Recent</h2>
    <span>Clear All</span>
  </div>
  `;
  divHistoryResults.id = "div-history-results";
  divHistoryResults.innerHTML = headerHistory;
  const wrapperList = document.createElement("div");
  wrapperList.id = "wrapper-list-history-search";
  divHistoryResults.appendChild(wrapperList);

  //   add all the element created into the page
  form.appendChild(createInputSearch(divHistoryResults));
  form.appendChild(createSubmitSearch());
  form.appendChild(divHistoryResults);
  searchContainer.appendChild(form);
  renderRowHistory();
};
export const renderRowHistory = () => {
  const wrapperList = document.getElementById("wrapper-list-history-search");
  const searchItem = JSON.parse(localStorage.getItem("history-search")) || [];
  wrapperList.innerHTML = "";
  searchItem.forEach((item) => {
    wrapperList.innerHTML += `
    <div class='flex justify-between text-[#757575]  text-[1.2rem] py-1'>
     <span class='history-items cursor-pointer' >${item.name}</span>
     <button type="button" listId='${
       item.id
     }' class='remove-history-btns cursor-pointer'>${closeIcon()}</button>   
    </div>  
    `;

    const historyItems = document.getElementsByClassName("history-items");
    for (let item of historyItems) {
      item.addEventListener("click", () => {
        const newHistory = {
          name: item.textContent,
          id: uuidv4(),
        };
        const history = JSON.parse(localStorage.getItem("history-search"));
        localStorage.setItem(
          "history-search",
          JSON.stringify([...history, newHistory])
        );
        document.getElementById("body").style.overflow = "auto";
        handleLengthHistory();
        router.navigate("/search");
      });
    }
  });

  const removeBtns = document.getElementsByClassName("remove-history-btns");
  for (let item of removeBtns) {
    item.addEventListener("click", () => {
      reSearch = reSearch.filter(
        (element) => element.id !== item.getAttribute("listId")
      );
      localStorage.setItem("history-search", JSON.stringify(reSearch));
      wrapperList.innerHTML = "";
      document.getElementById("body").style.overflow = "auto";
      renderRowHistory();
    });
  }
};
