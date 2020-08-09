<template>
  <div>
    <div>
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
              .set({
                ...this.order,
                pay_method: "Paytm",
              })
              .then(async () => {
                await axios({
                  method: "post",
                  url:
                    "https://hopeful-mirzakhani-a59182.netlify.app/.netlify/functions/syncOrder",
                  data: {
                    ...this.order,
                    user: {
                      uid: this.user.data.userId,
                      name: this.user.data.displayName,
                      email: this.user.data.email,
                      mobile: this.user.data.pNum,
                    },
                    pay_method: "Paytm",
                  },
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
                    this.response = "Failed";
                    this.$store.commit("clearLocalOrder");
                    this.$store.commit("clearCart");
                  });
              });
          } else {
            this.response = "Failed";
            this.$store.commit("clearLocalOrder");
            this.$store.commit("clearCart");
          }
        });
    }
  },
};
</script>

<style scoped></style>
