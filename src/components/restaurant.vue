<template>
  <div class="grid-content bg-purple">
    <span>{{photo}}</span>
    <span>{{restaurant.nom}}</span>
    <span> {{restaurant.cuisine}}</span>
    <span> {{restaurant.coord}}</span>
    <button v-on:click="getPhoto(restaurant.id)">Delete</button>
    <button v-on:click="getDetails(restaurant.id)" >Details</button>
  </div>
</template>

<script>
import {restGoogleMapsService} from "../main";
export default {
  name: "restaurant",
  data:function(){
    return {
  photo:'pitié'
    }
  },
  props: {
    restaurant: {
      type: Object
    }
  },
  methods : {
    getDetails(id){
      restGoogleMapsService.getRestaurantDetails(id);
    },
    getPhoto(id){
      restGoogleMapsService.getRestaurantPhoto(id)
          .then((photo) => this.photo = photo)
    }
  }
}
</script>

<style scoped>

</style>

