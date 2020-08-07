<template>
  <div>
    <div v-if="altResponse !== ''">
      <p>{{ altResponse }}</p>
    </div>
    <div v-else>
      {{ response }}
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "Order",
  data() {
    return {
      altResponse: " ",
      response: "",
    };
  },
  computed: {
    order() {
      return this.$store.getters.getLocalOrder;
    },
    ...mapGetters({ user: "user" }),
  },
  created() {
    if (this.$route.query.paytm_response === "TXN_SUCCESS") {
      const date = `${Date().slice(11, 15)}_${Date().slice(
        4,
        7
      )}_${Date().slice(8, 10)}`;
      firebase
        .database()
        .ref(`/Orders/${date}`)
        .on("value", async (res) => {
          const orders = Object.values(res.val());
          if (orders.find((el) => el.orderId === this.order.orderId)) {
            await firebase
              .database()
              .ref(
                `/Users/${this.user.data.userId}/orders/${this.order.orderId}`
              )
              .set(this.order)
              .then(async () => {
                await axios({
                  method: "post",
                  url: "http://localhost:9000/.netlify/functions/syncOrder",
                  data: this.order,
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then(() => {
                    this.response = "Order was placed successfully !";
                    this.$store.commit("clearLocalOrder");
                    this.$store.commit("clearCart");
                  })
                  .catch(() => {
                    this.altResponse = "Failed";
                    this.$store.commit("clearLocalOrder");
                    this.$store.commit("clearCart");
                  });
              });
          }
        });
    } else {
      this.altResponse = "Failed";
      this.$store.commit("clearLocalOrder");
    }
  },
};
</script>

<style scoped></style>
