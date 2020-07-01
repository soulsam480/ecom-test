<template>
  <div class="featuredProducts">
      <div class="row">
          <div class="col-sm-4" v-for="item in getProducts" :key="item.id">
              <p> {{item.body}} </p>
              
          </div>
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'FeaturedProducts',
    data: function(){
        return {
        }
    },
    computed:{
    ...mapGetters(['getProducts'])
    },
    methods:{
    },
    created(){
    }
};
</script>

<style scoped></style>
