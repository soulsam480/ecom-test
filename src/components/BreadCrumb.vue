<template>
  <div>
    <span class="crumb">
      <router-link v-if="!route.meta.dynamic" :to="{ name: route.name }">
        {{ $route.meta.breadCrumb }}
      </router-link>
      <router-link
        v-if="route.meta.dynamic"
        :to="{ name: route.name, params: { id: $route.params.id } }"
      >
        {{ $route.name }}/{{ $route.params.name }}
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: ["route"],
  datata(){
    return{
      routeData: []
    }
  },
  computed: {

    formattedValue() {
      return this.$route.meta.breadCrumb(this.$route.params.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.crumb {

  font-size: 18px;
}
</style>
