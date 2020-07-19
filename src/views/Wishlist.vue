<template>
  <div class="wishpage container">
    <br />
    <h5 class="d-inline"><span v-if="user.data !== null">{{ user.data.displayName.split(' ')[0] }}'s </span><h2 class="d-inline"> Wishlist</h2></h5>
    <hr />
    <div v-if="count>0">
        <ProductGrid :products="wishes"/>

    </div>
    <div v-else>
      <h5> It's empty. Let's add something !</h5>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from '@/components/ProductGrid.vue'
export default {
  name: "WishPage",
  computed: {
    ...mapGetters({ user: "user",count: "wishCount" }),
    ...mapGetters({ wishes: "getWishlist" }),
  },
  methods: {
    remove(wish) {
      this.$store.commit("removeFromWishlist", wish);
    },
  },
  components:{
    ProductGrid
  }
};
</script>

<style scoped>
a {
  color: unset !important;
  text-decoration: none !important;
}
button:focus {
  outline: none;
}
.prod-btn {
  width: 100%;
  background: #ce93d8;
  border-radius: 2px;
  font-size: 14px;
  border: none;
  padding: 5px 10px;
}
.prod-btn:hover {
  opacity: 0.9;
}
.prod {
  border-radius: 2px;
  /*   border: 1px solid black;
 */
}
/* .prod:hover {
  box-shadow: 0 0 20px 0.1px rgba(173, 173, 173, 0.438);
} */
.prod-title {
  padding: 5px 10px;
}
.prod-title p {
  font-size: 18px;
}
.prod-title small {
  font-size: 16px;
}
p {
  margin: 0;
}
.prod-img img {
  vertical-align: middle;
  max-width: 100%;
  border-radius: 0px 0px 2px 2px;
}
</style>
