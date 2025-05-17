import debounce from "debounce";
import { handleLengthHistory, renderRowHistory } from "../home/searchSection";
import { infiniteResultSearch } from "./resultsSearch";
import { submitSearch } from "./search";

export const createInputSearch = (defaultValue) => {
  //   input of search section
  const input = document.createElement("input");
  input.type = "text";
  input.name = "searchInput";
  input.required = "true";
  input.value = defaultValue;
  input.name = "searchInput";
  input.className =
    "cursor-pointer w-full bg-[#F5F5F5] placeholder:text-[#BAB8BC] py-[16px] px-[16px] pl-[40px] rounded-xl";
  input.placeholder = "Search";
  const showToastDebounced = debounce((value) => {
    infiniteResultSearch(true, value);
  }, 1000);
  input.addEventListener("input", (e) => {
    showToastDebounced(e.target.value);
  });
  return input;
};
