const routes = {
  general: {
    root: "/",
    ping: "/",
  },
  order: {
    root: "/",
    list: "/orders",
    item: "/order/:id",
    newItem: "/order",
  },
};

export default routes;
