<template>
  <div class="grid-content restaurant">
    <div class="image">
    <el-image v-if="photo" fit="fill" :src="photo" alt=""></el-image>
    <el-image v-else :src="defaultPhoto" alt=""></el-image>
    </div>
    <span style="color:#cf1717;font-weight: bold ">{{restaurant.nom}}</span>
    <span> {{restaurant.cuisine}}</span>
    <span>{{restaurant.location}}</span>
    <div class="buttons_container">
    <router-link :to="'/restaurant/'+restaurant.id"><el-button type="primary">Commander</el-button></router-link>
    </div>
  </div>
</template>

<script>
import {GoogleMapsService} from "../main";
const defaultPhoto = require('../assets/imgresto.png');
export default {
  name: "restaurant",
  data:function(){
    return {
      photo:'',
      defaultPhoto
    }
  },
  props: {
    restaurant: {
      type: Object
    }
  },
  methods : {
    getDetails(id){
      GoogleMapsService.getRestaurantDetails(id);
    },
    getPhoto(id){
      GoogleMapsService.getRestaurantPhoto(id)
          .then((photo) => {
            if(photo !== 'photo introuvable'){
              this.photo = photo;
            }
          })
    }
  },
  mounted: function(){
    //this.getPhoto(this.restaurant.id);
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
  .el-image {
    border-radius: 40px;
    width: 100%; /* image box size as % of container, see step 1 */
    height: 100%; /* image box size as % of container, see step 1 */
  }
  .image {
    height:140px;
    width:140px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
</style>

