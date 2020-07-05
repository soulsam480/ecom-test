<template>
  <div class="featuredProducts">
    <div class="row">
      <div
        class="col-6 col-md-2"
        style="padding:10px;"
        v-for="item in getProducts"
        :key="item.name"
      >
        <div class="heart-wrap">
          <a @click="addToWishlist"> <span class="heart" id="heart"> </span></a>
        </div>
        <div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <router-link :to="{ path: '/product/' + item.id }" v-if="item.featured">
          <div class="prod">
            <div class="prod-img">
              <div
                id="carouselExampleControls"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active" data-interval="1000">
                    <img
                      :src="item.imgUrls[0]"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item" data-interval="1000">
                    <img
                      :src="item.imgUrls[1]"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
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
  methods: {
    addToWishlist() {
      document.getElementById("heart").classList.toggle("red");
    },
  },
  created() {},
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
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
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
.carousel-control-next-icon,
.carousel-control-prev-icon {
  background-color: rgb(124, 124, 124);
  width: 22px;
  height: 30px;
}
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
  font-size: 15px;
}
.prod-title small {
  font-size: 13px;
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
