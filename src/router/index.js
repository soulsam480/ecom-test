import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import NProgress from "f:/MY CODEBASE/ecom-test/node_modules/nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  easing: "ease",
  speed: 500,
});

import "nprogress/nprogress.css";
/* import store from "../store/index";
 */ Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      breadCrumb: "Home",
    },
  },
  {
    path: "/p/:_slug",
    name: "Product",
    props: true,
    component: Product,
    meta: { scrollToTop: true, dynamic: true, breadCrumb: "Product" },
  },
  {
    path: "/category/men",
    name: "Men",
    component: () => import("../views/Men.vue"),
    meta: { scrollToTop: true, breadCrumb: "Men" },
  },
  {
    path: "/category/women",
    name: "Women",

    component: () => import("../views/Women.vue"),
    meta: { scrollToTop: true, breadCrumb: "Women" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      breadCrumb: "Login",
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      breadCrumb: "User",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    mwt: {
      breadCrumb: "Cart",
    },
  },
  {
    path: "/wishlist",
    name: "WishPage",
    component: () => import("../views/Wishlist.vue"),
    meta: {
      breadCrumb: "Wishlist",
    },
  },
  {
    path: "*",
    component: () => import("../views/404.vue"),
    name: "Fof",
  },
  {
    path: "/search",
    component: () => import("../views/Search.vue"),
    name: "Search",
    /*     props:true,
     */
  },
  {
    path: "/order",
    component: () => import("../views/Order.vue"),
    name: "Order",
    /*     props:true,
     */
  },
];

const router = new VueRouter({
  /* base: process.env.BASE_URL,
  mode: "history", */
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  NProgress.set(0.1);
  NProgress.inc(0.2);
  next();
});
router.afterEach(() => {
  setTimeout(() => NProgress.done(), 2000);
});

export default router;
