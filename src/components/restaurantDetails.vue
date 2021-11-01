<template>
 <div>
   <el-main>
     <el-row>
       <el-col v-if="restaurant" :span="12" :offset="6">
         <el-row class="blue-container">
           <el-col :span="12"><el-image :src="photo"></el-image></el-col>
           <el-col :span="12"> <div class="details-container">
             <h1> {{this.restaurant.name}}</h1>
             <span> {{this.restaurant.cuisine}}</span>
             <span> {{this.restaurant.address.building+' '+this.restaurant.address.street}}</span>
             <span> {{this.restaurant.borough}}</span>
             <li v-for="user in menu" :key="user.id">
               {{user.nom}}
             </li>
             <gmap-map v-if="center.lat !== '' && center.lng !== ''"
                 :center="center"
                 :zoom="10"
                 style="width:400px;  height: 400px;"><gmap-marker :position="center" :label="label"></gmap-marker>
             </gmap-map>
           </div></el-col>
         </el-row>
       </el-col>
     </el-row>
   </el-main>
 </div>
</template>

<script>
import {restGoogleMapsService, restRestaurantsService} from "@/main";
import menusData from "../assets/menus.json";

export default {
  name: "restaurantDetails",
  data: function() {
    return {
      restaurant: null,
      photo:'',
      menu:'',
      center: {
        lat: '',
        lng: '',
      },
      label: '',
    }
  },
  methods: {
    getDetails() {
      restRestaurantsService.getRestaurantFromId(this.$route.params.id).then((res) =>{
        this.restaurant = res.restaurant;
        this.center.lat = this.restaurant.address.coord[1];
        this.center.lng = this.restaurant.address.coord[0];
        this.label = {'text': this.restaurant.name, 'color': 'white'};
        this.getMenu();
      });
      restGoogleMapsService.getRestaurantPhoto(this.$route.params.id).then((res) => this.photo = res);
    },
    getMenu(){
      for(let i=0;i<menusData.length;i++){
        if(menusData[i].name === this.restaurant.cuisine) {
          this.menu = menusData[i].items;
        }
      }
    },
  },
    beforeMount: function () {
      this.getDetails();
    }
}
</script>

<style scoped>

.blue-container {
  background-color: #2c3e50 ;
  color:white;
  padding:2%;
  border-radius: 40px;
  font-size:26px;
  max-height: 300px;
}
h1 {
  color: #cf1717;
}
.details-container {
  display:flex;
  flex-direction: column;
  padding:1%;
}
.el-image {
  height:100%;
  width:100%;
  border-radius: 40px;
  border: solid 3px #cf1717;
  max-height:260px;
}
</style>