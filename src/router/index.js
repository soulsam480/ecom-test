import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import NProgress from 'f:/MY CODEBASE/ecom-test/node_modules/nprogress'

 NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  easing: 'ease', speed: 500,
 })

import 'nprogress/nprogress.css';
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
    beforeEnter: (to, form, next) => {
      console.log(to.path);
      next();
    },
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
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to, from, next) => {
  NProgress.start()
  NProgress.set(0.1)
  NProgress.inc(0.2)
  next()
})
router.afterEach(() => {
  setTimeout(() => NProgress.done(), 2000)
})

export default router;
