<template>
  <div>
    <div class="heart-wrap">
      <a @click="addToWishlist(pId)">
        <span
          class="heart"
          id="heart"
          :class="{ red: Wish.includes(this.pId) }"
        ></span>
        <span style="font-size:18px;" v-if="Wish.includes(this.pId)"
          >In Wishlist</span
        >
        <span style="font-size:18px;" v-else> Add to wishlist</span>
      </a>
    </div>
    <small v-if="Wish.includes(this.pId)"
      >Remove from wishlist currenty not supported.</small
    >
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  props: ["pId"],
  name: "Wishlist",
  computed: {
    ...mapGetters({
      Wish: "getWishlist",
    }),
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    addToWishlist() {
      const wRef = firebase.database().ref(`/Users/${this.user.data.userId}`);
      var newWishlist = [];
      var pos = this.Wish.length;
      if (pos === 0) {
        newWishlist.push(this.pId);
        wRef
          .set({
            wishlist: newWishlist,
          })
          .then(() => {
            this.$store.dispatch("addWishes", this.user.data.userId);

            /*             this.$store.dispatch("changeOnWishlist", this.pId);
             */ console.log("success");
            newWishlist = [];
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.Wish.includes(this.pId)) {
        newWishlist = this.Wish.slice();
        var remPos = newWishlist.indexOf(this.pId);
        newWishlist.splice(remPos, 1);
        wRef
          .set({
            wishlist: newWishlist,
          })
          .then(() => {
            this.$store.dispatch("addWishes", this.user.data.userId);
            this.$store.commit("changeWishes", newWishlist);
            /*             this.$store.dispatch("changeOnWishlist", this.pId);
             */ console.log("success");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        newWishlist = this.Wish.slice();
        newWishlist.splice(pos, 0, this.pId);
        wRef
          .set({
            wishlist: newWishlist,
          })
          .then(() => {
            this.$store.dispatch("addWishes", this.user.data.userId);
            newWishlist = [];
            console.log("success");
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
</style>
