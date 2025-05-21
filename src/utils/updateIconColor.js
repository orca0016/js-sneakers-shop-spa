export const updateIconColor = (iconDiv, iconFn, value) => {
  iconDiv.innerHTML = iconFn(value === "" ? "#6C757D" : "#000000");
};