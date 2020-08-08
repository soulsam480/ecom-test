<template>
  <div class="featuredProducts">
    <div class="row">
      <div class="col-6 col-md-3" v-for="item in products" :key="item.name">
        <router-link
          :to="{
            name: 'Product',
            params: {
              _slug: item.name
                .toLowerCase()
                .split(' ')
                .join('-'),
            },
          }"
        >
          <div class="prod">
            <div class="prod-img">
              <img v-lazy="item.imgUrls[0]" alt="" />
            </div>
            <div class="prod-title">
              <p>{{ item.name }}</p>
              <h6>₹ {{ item.price }}</h6>
              <small>Colors</small>
              <div class="color-picker" id="color">
                <div v-if="item.colors.includes('black')" class="black"></div>
                <div v-if="item.colors.includes('white')" class="white"></div>
                <div v-if="item.colors.includes('yellow')" class="yellow"></div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturedProducts",
  props: ["products"],
  data: function() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
};
</script>

<style scoped>
.black {
  background-color: black;
}
.white {
  background-color: white;
}
.yellow {
  background-color: yellow;
}
.color-picker div {
  padding: 6px;
  border: 0.5px solid black !important;
  margin: 2px;
  cursor: pointer;
  border-radius: 2px;
}
.color-picker {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}
.col-6,
.col-md-3 {
  padding: 2px !important;
}
a {
  color: unset !important;
  text-decoration: none !important;
}
button:focus {
  outline: none;
}

.prod {
  border-radius: 2px;
  /*   border: 1px solid black;
 */
}
.prod:hover {
  transform: scale(1.01);
}
.prod-title {
  padding: 5px 10px;
}
.prod-title p {
  font-size: 18px;
}
.prod-title h6 {
  margin-bottom: 2px;
}
p {
  margin: 0;
}
.prod-img img {
  vertical-align: middle;
  width: 100%;

  max-width: 100%;
  border-radius: 0px 0px 2px 2px;
}
</style>
