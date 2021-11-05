<template>
 <div>
  
  <el-col v-if="restaurant" :span="12" :offset="6" class="carré" >
                <el-row >
                    <el-col class="détails">
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
                        <div class="email" >
                          <gmap-map v-if="center.lat !== '' && center.lng !== ''" :center="center" :zoom="10" style="width:100%;  height: 300px;">
                            <gmap-marker :position="center" :label="label"></gmap-marker>
                        </gmap-map>
                          <div class="address">
                            {{restaurant.address.building+' '+restaurant.address.street}} {{restaurant.borough}}
                          </div>
                        </div>
                    </el-col>
                    <el-col class="col">
                        <div class="droite1">Menu</div>
                            <el-row class="menu-row" v-for="item in menu" :key="item.id" style="background-color:white;">
                              <el-col :span="8"><el-image :src="item.url"></el-image></el-col>
                              <el-col :span="8">{{item.nom}}</el-col>
                              <el-col :span="8">{{item.prix}}</el-col>
                            </el-row> 
                    </el-col>
                </el-row>   
            </el-col>
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

.address {
  margin-top:5%;
}

.image{
  width:150px;
}
.menu-row {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 1%;
}
.taille{
  padding: 40px;
  background-color:white;
  height: 133.391px;
}


</style>