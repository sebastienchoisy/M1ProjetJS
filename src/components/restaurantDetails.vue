<template>
 <div><span>{{ this.restaurant.name }}</span></div>
</template>

<script>
import {restRestaurantsService} from "@/main";

export default {
  name: "restaurantDetails",
  data: function() {
    return {
      restaurant: {
        type: Object
      }
    }
  },
  methods: {
    getDetails() {
      restRestaurantsService.getRestaurantFromId(this.$route.params.id).then((res) => this.restaurant = res.restaurant);
    }
  },
    mounted: function () {
      this.getDetails();
    }
}
</script>

<style scoped>

</style>