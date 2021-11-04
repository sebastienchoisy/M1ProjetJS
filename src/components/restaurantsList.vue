<template>
  <div>
    <form @submit.prevent="ajouterRestaurant($event)">
    <!--<label> Nom </label>
      <input type="text" required v-model="nom" name="nom">
      <label> Cuisine </label>
      <input type="text" required v-model="cuisine" name="cuisine">
    <button type="submit" class="md-raised">Ajouter</button>-->
  </form>
    <!--<label>Rechercher</label>
    <input type="text" v-model="restaurantNameQuery" class="search">
  <button class="md-raised" type="submit">Rechercher</button>
  <button class="md-raised" v-on:click="resetQuery">Reset</button>-->
  <div class="recherche"> 
    <div class="barre">
      <el-input placeholder="Trouver un restaurant" suffix-icon="el-icon-knife-fork" v-model="restaurantNameQuery" class="search">
      </el-input>
      <el-button type="submit" icon="el-icon-search" class="chercher" v-on:click="rechercherRestaurant">Chercher</el-button>
      <el-button type="Submit" icon="el-icon-delete" class="supprimer" v-on:click="resetQuery"></el-button>
    </div>
  </div>
    <el-row :gutter="25">
      <el-col v-for="(r,index) in restaurants" :key="index" :xs="8" :sm="6" :md="4" :lg="3">
        <restaurant :restaurant="r"></restaurant>
      </el-col>
    </el-row>
  <div class="queryselector">
    <input type="range" min="5" max="100" v-model="pageSize" step="5" class="slider">
    <a href="#" class="previous round" :disabled="pageNumber===0" v-on:click="goPrevious">&#8249;</a>
    <a href="#" class="next round" v-on:click="goNext">&#8250;</a>
  </div>
  </div>
</template>

<script>
import restaurant from "./restaurant"
import {RestaurantsService,GoogleMapsService} from "../main";
export default {
  name: "restaurantsList",
  components: {restaurant},
  data:function(){
    return {
      restaurants: [],
      pageSize: 16,
      pageNumber: 0,
      restaurantsNumber: 0,
      restaurantNameQuery: '',
      photo: ''
    }
  },
  methods: {
    supprimerRestaurant(index) {
      RestaurantsService.deleteRestaurant(index);
      this.restaurants = RestaurantsService.getTabRestaurants();
    },
    ajouterRestaurant(event) {
      RestaurantsService.addRestaurant(event);
      this.restaurants = RestaurantsService.getTabRestaurants();
    },
    resetQuery(){
      this.restaurantNameQuery = '';
      this.restaurants = RestaurantsService.getRestaurantsFromServer();
    },
    rechercherRestaurant(){
      RestaurantsService.setRestaurantNameQuery(this.restaurantNameQuery);
      this.restaurants = RestaurantsService.getTabRestaurants();
    },
    goNext(){
      this.pageNumber++;
      RestaurantsService.setPageNumber(this.pageNumber);
      this.restaurants = RestaurantsService.getTabRestaurants();
    },
    getDetails(id){
      GoogleMapsService.getRestaurantDetails(id);
    },
    getPhoto(id){
      this.photo = GoogleMapsService.getRestaurantPhoto(id);
    },
    goPrevious(){
      if(this.pageNumber>0){
        this.pageNumber--;
        RestaurantsService.setPageNumber(this.pageNumber);
        this.restaurants = RestaurantsService.getTabRestaurants();
      }
    },
    
  },
  watch: {
    pageSize: function (val) {
      if (val) {
        RestaurantsService.setPageSize(this.pageSize);
        this.restaurants = RestaurantsService.getTabRestaurants();
      }
    }
  },
  mounted(){

  },
  beforeMount() {
    this.restaurants = RestaurantsService.getTabRestaurants();
  }
}
</script>

<style scoped>

.search {
  margin-bottom: 2%;
}

form {
  margin: 6px 8px;
}

.queryselector{
  margin-top:5%;
}


.el-col-6 {
  padding:0 !important;
}


.recherche{
  margin: auto;
  max-width: 100%;
  height: 235px;
  /*background-repeat: no-repeat;*/
  background-image: url('https://img.le-dictionnaire.com/nourriture-plats.jpg');

}

.barre{
  margin-top: 20px;
} 

.search{
  height : 32px;
  width: 300px;
  margin-right: 10px;
}

.chercher{
  margin-top: 70px;
}
.slidecontainer {
  width: 100%;
}

.slider {
  color: red;
  -webkit-appearance: none;
  width: 100%;
  height: 20px;
  border-radius: 5px;
  background: #083b66;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  background-image: url('~@/assets//glace.png');
  width: 100px;
  height: 100px;
  cursor: pointer;
}

a {
  margin-top: 30px;
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}

.previous {
  background-color: #083b66;
  color: white;
}

.next {
  background-color: #083b66;
  color: white;
}

.round {
  border-radius: 50%;
}


</style>