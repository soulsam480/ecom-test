<template>
  <div>
    <agile :options="myOptions">
      <div class="slide">
        <img src="../assets/1.jpg" alt="" />
      </div>
      <div class="slide">
        <img src="../assets/2.jpg" alt="" />
      </div>
       <div class="slide">
        <img src="../assets/3.jpg" alt="" />
      </div>
    </agile>
  </div>
</template>

<script>
import { VueAgile } from "vue-agile";

export default {
  name: "Slider",
  methods: {},
  data() {
    return {
      myOptions: {
        navButtons: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    };
  },
  components: {
    agile: VueAgile,
  },
  mounted() {},
};
</script>

<style scoped>
img{
  width: 100%;
}</style>
