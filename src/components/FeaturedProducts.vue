<template>
  <div class="featuredProducts">
    <div class="row">
      <div class="col-sm-2 prod " v-for="item in getProducts" :key="item.id">
        <div class="prod-img">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="prod-title">
          <p>{{ item.title }}</p>
          <small> {{ item.desc }} </small>
        </div>
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
  methods: {},
  created() {},
};
</script>

<style scoped>
.prod {
  border-radius: 2px;
}
.prod:hover {
  box-shadow: 0 0 20px 0.1px rgba(173, 173, 173, 0.438);
}
.prod-title {
  width: 100%;
  padding: 1rem 0.5rem;
  font-size: 13px;
}
p {
  margin: 0;
}
.prod-img img {
  vertical-align: middle;
  max-width: 100%;
}
</style>
