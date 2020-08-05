<template>
  <div>
    <div v-if="this.$route.query.paytm_response">
      <p>{{ this.$route.query.paytm_response }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
};
</script>

<style scoped></style>
