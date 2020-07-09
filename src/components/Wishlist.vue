<template>
  <div>
    <div class="heart-wrap">
      <a @click="addToWishlist(product)">
        <span
          class="heart"
          id="heart"
          :class="{ red: wish.find((el)=> el.id === product.id)}"
        ></span>
        <span style="font-size:18px;" v-if="wish.find((el)=> el.id === product.id)"
          >In Wishlist</span
        >
        <span style="font-size:18px;" v-else> Add to wishlist</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["product"],
  name: "Wishlist",
  computed: {
    ...mapGetters({
      user: "user",
      wish: "getWishlist"
    }),
  },
  methods: {
    addToWishlist(product) {
      if(this.wish.find((el)=> el.id === product.id)){
        this.$store.commit("removeFromWishlist",product)
      }else{
        this.$store.commit("addToWishlist",product)
      }
    },
  },
};
</script>

<style scoped>
.red {
  background-color: red !important;
}
.red:before,
.red:after {
  background-color: red !important;
}
.heart-wrap {
  padding: 10px 13px 6px 13px;
  cursor: pointer;
  width: 170px;
  background-color: #ce93d8;
  border-radius: 5px;
}
.heart {
  background-color: #fa8080;
  display: inline-block;
  height: 13px;
  margin: 0 10px;
  position: relative;
  top: 0;
  transform: rotate(-45deg);
  width: 13px;
}

.heart:before,
.heart:after {
  content: "";
  background-color: #fa8080;
  border-radius: 50%;
  height: 13px;
  position: absolute;
  width: 13px;
}

.heart:before {
  top: -6.5px;
  left: 0;
}

.heart:after {
  left: 6.5px;
  top: 0;
}
</style>
