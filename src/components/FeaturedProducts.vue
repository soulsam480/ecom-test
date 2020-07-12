<template>
  <div class="featuredProducts">
    <div class="row">
      <div
        class="col-6 col-md-3"
        style="padding:10px;"
        v-for="item in getProducts"
        :key="item.name"
      >
        <router-link :to="{ path: '/product/' + item.id }" v-if="item.featured">
          <div class="prod">
            <div class="prod-img">
              <img v-lazy="item.imgUrls[0]" alt="" />
            </div>
            <div class="prod-title">
              <p>{{ item.name }}</p>
              <small> ₹ {{ item.price }}</small>
            </div>
            <div style="padding-top:10px">
              <button class="prod-btn">Buy</button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FeaturedProducts",
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(["getProducts"]),
  },
  methods: {},
  created() {},
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
  padding: 7px 10px;
}
.prod-btn:hover {
  background-color: #d29eda;
}
.prod {
  border-radius: 2px;
  /*   border: 1px solid black;
 */
}
.prod:hover {
  transform: scale(1.01)
}
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
