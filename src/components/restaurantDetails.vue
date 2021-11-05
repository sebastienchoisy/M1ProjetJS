<template>
 <div>
  
  <el-col v-if="restaurant" :span="12" :offset="6" class="carré" >
                <el-row >
                    <el-col class="détails" v-if="restaurant">
                        {{restaurant.name}}
                    </el-col>
                </el-row>
                <el-row >
                    <el-col class="col">
                        <div class="gauche1">{{restaurant.cuisine}}</div>
                        <div class="prénom" ><el-image :src="photo"></el-image></div>
                    </el-col>
                </el-row> 
                <el-row >
                    <el-col class="col">
                        <div class="gauche1">Adresse</div>
                        <div class="email" > {{restaurant.address.building+' '+restaurant.address.street}} {{restaurant.borough}}</div>
                    </el-col>
                    <el-col class="col">
                        <div class="droite1">Menu</div>
                            <el-row style="background-color:white;">
                              <el-col class="col" :span="8">
                                <el-row>
                                  <div class="gauche1">PHOTO</div>
                                  <div class="prénom" v-for="user in menu" :key="user.id"><el-image :src="user.url"></el-image></div>
                                </el-row>
                              </el-col>
                              <el-col class="col" :span="8">
                                <div class="droite1">PLAT</div>
                                <div class="taille"  v-for="user in menu" :key="user.id"> {{user.nom}}  </div>
                              </el-col>
                              <el-col class="col" :span="8">
                                <div class="droite1">PRIX</div>
                                <div class="taille"  v-for="user in menu" :key="user.id"><a class="prix"> {{user.prix}}€ </a></div>
                              </el-col>
                            </el-row> 
                    </el-col>
                </el-row>   
            </el-col>
   <!--<el-main>
     <el-row>-->
       <!--<el-col v-if="restaurant" :span="12" :offset="6">
         <el-row class="blue-container">
           <el-col :span="12"><el-image :src="photo"></el-image></el-col>
           <el-col :span="12"> <div class="details-container">
             <h1> {{this.restaurant.name}}</h1>
             <span> {{this.restaurant.cuisine}}</span>
             <span> {{this.restaurant.address.building+' '+this.restaurant.address.street}}</span>
             <span> {{this.restaurant.borough}}</span>
             <li v-for="user in menu" :key="user.id">
               {{user.nom}}
             </li >
             <gmap-map v-if="center.lat !== '' && center.lng !== ''"
                 :center="center"
                 :zoom="10"
                 style="width:400px;  height: 400px;"><gmap-marker :position="center" :label="label"></gmap-marker>
             </gmap-map>
           </div></el-col>
         </el-row>
       </el-col>-->
    <!-- </el-row>
   </el-main>-->
    <gmap-map v-if="center.lat !== '' && center.lng !== ''"
                 :center="center"
                 :zoom="10"
                 style="width:350px;  height: 400px;"><gmap-marker :position="center" :label="label"></gmap-marker>
             </gmap-map>
 </div>
</template>

<script>
import {GoogleMapsService, RestaurantsService} from "@/main";
import menusData from "../assets/menus.json";

export default {
  name: "restaurantDetails",
  data: function() {
    return {
      restaurant: '',
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
      RestaurantsService.getRestaurantFromId(this.$route.params.id).then((res) =>{
        this.restaurant = res.restaurant;
        this.center.lat = this.restaurant.address.coord[1];
        this.center.lng = this.restaurant.address.coord[0];
        this.label = {'text': this.restaurant.name, 'color': 'white'};
        this.getMenu();
      });
      GoogleMapsService.getRestaurantPhoto(this.$route.params.id).then((res) => this.photo = res);
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

.image{
  width:150px;
}

.taille{
  padding: 40px;
  background-color:white;
  height: 133.391px;
}


</style>