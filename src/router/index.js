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
 */Vue.use(VueRouter);
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
    component: () => import("../views/Men.vue"),
    meta: { scrollToTop: true },
  },
  {
    path: "/women",
    name: "Women",

    component: () => import("../views/Women.vue"),
    meta: { scrollToTop: true },
  },
  {
    path: "/fu*ktheadmin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/wishlist",
    name: "WishPage",
    component: () => import("../views/Wishlist.vue"),
  },
  {
    path: "*",
    component: () => import("../views/404.vue"),
    name: "Fof",
  },
  {
    path:'/search/:query',
    component: () => import("../views/Search.vue"),
    name: 'Search'
  }
];

const router = new VueRouter({
/*   mode: "history",
 */  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
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
