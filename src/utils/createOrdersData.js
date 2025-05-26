export const createOrdersData = () => {
  const prevOrders = JSON.parse(localStorage.getItem("orders-list") || '[]');
  const address = JSON.parse(localStorage.getItem("address-list") || '[]');
  const shipping = JSON.parse(localStorage.getItem("Shipping-method") || '{}');
  const cardItem = JSON.parse(localStorage.getItem("card-shop") || '[]');
  const totalPrices = JSON.parse(localStorage.getItem("total-prices") || '{}');

  const myCurrentData = {
    orderAddress: address.find((item) => item.selected),
    orderShipping: shipping,
    orderProduct: cardItem,
    prices: totalPrices,
  };
  prevOrders.push(myCurrentData);
  localStorage.setItem('orders-list' , JSON.stringify(prevOrders))

  localStorage.removeItem("card-shop");
  localStorage.removeItem("Shipping-method");
  localStorage.removeItem("total-prices");
  localStorage.removeItem("discount");
};
