<template>
  <section>
    <div class="shopping">
      <h5 :class="{ active: cartUIStatus === 'idle' && cartCount === 0 }">
        01
      </h5>
      <h6>Shopping Cart</h6>
    </div>
    <div class="checkout">
      <h5 :class="{ active: cartUIStatus === 'idle' && cartCount > 0 }">02</h5>
      <h6>Check out</h6>
    </div>
    <div class="checkout">
      <h5 :class="{ active: cartUIStatus === 'payment' && cartCount > 0 }">03</h5>
      <h6>Payments</h6>
    </div>
    <div class="order">
      <h5 :class="{ active: cartUIStatus === 'success' }">04</h5>
      <h6>Order Complete</h6>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["cartUIStatus"]),
    ...mapGetters(["cartCount"]),
  },
};
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 70px;
  grid-row-gap: 0px;
  text-align: center;
  margin: 20px auto 0;
}
section div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h5 {
  line-height: 40px;
  width: 40px;
  height: 40px;
  border-radius: 1000px;
  border: 1px solid #ccc;
  color: #555;
}
h5.active {
  background: #CE93D8;
  border: 1px solid #CE93D8;
  color: white;
}
h4 {
  margin-top: 20px;
  color: #555;
}
@media screen and (max-width: 768px) {
  section {
    grid-column-gap: 30px !important;
  }
}
</style>
