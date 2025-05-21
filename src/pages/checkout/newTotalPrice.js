export const newTotalPrice = (name, newCost) => {
  let prevPrices = JSON.parse(localStorage.getItem("total-prices")) || {};
  prevPrices = {
    ...prevPrices,
    [name]: newCost,
  };

  localStorage.setItem("total-prices", JSON.stringify(prevPrices));
};