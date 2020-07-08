import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "Product",
    props: true,
    component: Product,
    meta: { scrollToTop: true },
  },
  {
    path: "/men",
    name: "Men",
    component: () => import(/* webpackChunkName: "about" */ "../views/Men.vue"),
    meta: { scrollToTop: true },
  },
  {
    path: "/women",
    name: "Women",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Women.vue"),
    meta: { scrollToTop: true },
  },
  {
    path: "/fu*ktheadmin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
  },
  {
    path: "/login",
    name: "Login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cart.vue"),
  },
  {
    path: "/wishlist",
    name: "WishPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Wishlist.vue"),
  },
];

const router = new VueRouter({
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior: (to, from, savedPosition) => {
    const position = {};
    if (to.matched.some((m) => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }
  },
});

export default router;
