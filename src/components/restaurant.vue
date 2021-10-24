<template>
  <div class="grid-content restaurant">
    <img v-if="photo" :src="photo" alt="">
    <img v-else src="~@/assets//imgresto.png" alt="">
    <span style="color:#cf1717;font-weight: bold ">{{restaurant.nom}}</span>
    <span> {{restaurant.cuisine}}</span>
    <span>{{restaurant.id}}</span>
    <div class="buttons_container">
    <router-link :to="'/restaurant/'+restaurant.id"><el-button type="primary">Commander</el-button></router-link>
    </div>
  </div>
</template>

<script>
import {restGoogleMapsService} from "../main";
export default {
  name: "restaurant",
  data:function(){
    return {
  photo:''
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
          .then((photo) => {
            if(photo !== 'photo introuvable'){
              this.photo = photo;
            }
          })
    }
  },
  mounted: function(){
    this.getPhoto(this.restaurant.id);
  }
}
</script>

<style scoped>
  .restaurant {
    height:300px;
  }
  .buttons_container {
    display:flex;
    flex-direction: row;
  }
  .el-button--primary {
    background-color: #083b66;
  }
  .el-button--primary:hover{
    background-color: #1765a7;
  }
  img {
    border-radius: 40px;
  }
</style>

