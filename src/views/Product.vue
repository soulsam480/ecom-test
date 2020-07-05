<template>
  <div class="product container-fluid">
    <div class="row">
      <div class="col-sm-7">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" data-interval="1500">
              <img :src="product.imgUrls[0]" class="d-block p-img" alt="..." />
            </div>
            <div class="carousel-item" data-interval="1500">
              <img :src="product.imgUrls[1]" class="d-block p-img" alt="..." />
            </div>
          </div>
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
      </div>
      <div class="col-sm-5">
        <div class="p-spec">
          <p class="p-spec-name">{{ product.name }}</p>
          <h6 class="text-muted" v-html="product.desc">{{ product.desc }}</h6>
          <h4>₹ {{ product.price }}</h4>
          <label for="sizes">Size</label>
          <div v-if="product.sizes" id="sizes" class="size">
            <select v-model="size" class="size-picker">
              <option :value="null" disabled hidden>Size</option>
              <option
                v-for="(size, key) in product.sizes"
                :key="key"
                :value="size"
                >{{ size }}</option
              >
            </select>
          </div>
          <!-- <div v-if="product.sizes" id="sizes" class="size">
            <select v-model="size" class="size-picker">
              <option :value="null" disabled hidden>Size</option>
              <option
                v-for="(size, key) in product.sizes"
                :key="key"
                :value="size"
                >{{ size }}</option
              >
            </select>
          </div> -->
        </div>
        <br />
        <div class="heart-wrap">
          <a @click="addToWishlist(product.id)">
            <span class="heart" :class="{ red: getWishlist }" id="heart"></span>
            <span style="font-size:18px;" v-if="getWishlist">In Wishlist</span>
            <span style="font-size:18px;" v-else> Add to wishlist</span>
          </a>
        </div>
        <small v-if="getWishlist">Remove from wishlist currenty not supported.</small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  name: "Product",
  data() {
    return {
      id: this.$route.params.id,
      size: "",
    };
  },
  computed: {
    product() {
      return this.$store.getters.product(this.id);
    },
    ...mapGetters({
      user: "user",
    }),
    getWishlist() {
      return this.$store.getters.getWishlist(this.id);
    },
    getWishlistLoc() {
      return this.$store.getters.getWishlistLoc(this.id);
    },
  },
  methods: {
    getSize: function(event) {
      var si = event.srcElement.id;
      console.log(si);
      this.size = toString(si);
    },
    addToWishlist(Id) {
      var wishlist = [Id];
      if (this.getWishlist) {
        console.log("working");
        firebase
          .database()
          .ref(
            `/Users/${this.user.data.userId}/wishlist/${[this.getWishlistLoc]}`
          )
          .remove()
          .then(() => {
            console.log("success");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        firebase
          .database()
          .ref(`/Users/${this.user.data.userId}`)
          .set({
            wishlist: wishlist,
          })
          .then(() => {
            window.alert("success");
          })
          .catch((err) => {
            console.log(err);
          });
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
.carousel-control-next,
.carousel-control-prev {
  z-index: 100 !important;
  /* top: 39%;
  bottom: 50%; */
}
.carousel-control-next-icon,
.carousel-control-prev-icon {
  background-color: rgb(124, 124, 124);
  width: 22px;
  height: 30px;
}
@media only screen and (min-width: 768px) {
  .carousel-control-next {
    right: 80px;
  }
  .carousel-control-prev {
    left: 80px;
  }
}
.p-spec-name {
  font-size: 30px;
}
.size-picker {
  width: 130px;
  font-size: 20px;
  height: 100%;
  border: 0;
  background-color: white;
  outline: 1px solid #ccc;
  outline-offset: -1px;
}

.col-sm-7,
.col-sm-5 {
  padding-top: 20px;
}
.p-img {
  max-width: 100%;
  display: block;
  margin: auto;
}
@media only screen and (min-width: 768px) {
  .p-img {
    max-width: 75%;
  }
}
</style>
