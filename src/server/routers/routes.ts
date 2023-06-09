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
  email: {
    root: "/",
    thanks: "/thank-you",
  },
};

export default routes;
