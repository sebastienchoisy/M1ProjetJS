<template>
  <div class="grid-content restaurant">
    <div class="image">
    <el-image v-if="photo" fit="fill" :src="photo" alt=""></el-image>
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
import googleService from "../services/google.service";
const defaultPhoto = require('../assets/imgresto.jpg');
export default {
  name: "restaurant",
  data:function(){
    return {
      photo:defaultPhoto,
      defaultPhoto,
      isPhotoLoaded: false,
    }
  },
  props: {
    restaurant: {
      type: Object
    }
  },
  methods : {
    getDetails(id){
      googleService.getRestaurantDetails(id);
    },
    getPhoto(id){
      googleService.getRestaurantPhoto(id)
          .then((photo) => {
            if(photo !== 'photo introuvable'){
              this.photo = photo;
            } else {
              this.photo = defaultPhoto;
            }
            this.isPhotoLoaded = true;
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

