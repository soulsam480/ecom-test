<template>
  <div class="productgrid col-sm-10">
    <div class="row">
      <div
        class="col-6 col-md-3"
        style="padding:10px;"
        v-for="item in products"
        :key="item.id"
      >
        <router-link :to="{ path: '/product/' + item.id }">
          <div class="prod">
            <div class="prod-img">
              <img :src="item.imgUrls[0]" alt />
            </div>
            <div class="prod-title">
              <p>{{ item.name }}</p>
              <small> ₹ {{ item.price }}</small>
            </div>
            <div style="padding-top:10px">
              <button class="prod-btn">Buy</button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],
  name: "ProductGrid",
};
</script>

<style lang="scss" scoped>
.col-6,.col-md-3{
  padding:4px 3px 4px 3px!important;
}
@media only screen and (max-width:768px){
  .col-sm-10 {
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
}
a {
  color: unset !important;
  text-decoration: none !important;
}
button:focus {
  outline: none;
}
.prod-btn {
  width: 100%;
  background: #ce93d8;
  border-radius: 2px;
  font-size: 14px;
  border: none;
  padding: 5px 10px;
}
.prod-btn:hover {
  opacity: 0.9;
}
.prod {
  border-radius: 2px;
}

.prod-title {
  padding: 5px 10px;
}
.prod-title p {
  font-size: 18px;
}
.prod-title small {
  font-size: 16px;
}
p {
  margin: 0;
}
.prod-img img {
  vertical-align: middle;
  max-width: 100%;
  border-radius: 2px;
}
</style>
