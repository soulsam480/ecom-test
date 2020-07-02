<template>
  <div class="product container-fluid">
    <div class="row">
      <div class="col-sm-7">
        <img :src="product.imgUrl" class="p-img " alt="" />
      </div>
      <div class="col-sm-5">
        <div class="p-spec">
          <p class="p-spec-name">{{ product.name }}</p>
          <small class="lead" v-html="product.desc">{{ product.desc }}</small>
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
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    getSize: function(event) {
      var si = event.srcElement.id;
      console.log(si);
      this.size = toString(si);
    },
  },
};
</script>

<style scoped>
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
