<template>
  <div>
    <TopMenu></TopMenu>
  <form @submit.prevent="ajouterRestaurant($event)">
    <label> Nom </label>
      <input type="text" required v-model="nom" name="nom">
      <label> Cuisine </label>
      <input type="text" required v-model="cuisine" name="cuisine">
    <button type="submit" class="md-raised">Ajouter</button>
  </form>
    <label>Rechercher</label>
    <input type="text" v-model="restaurantNameQuery" class="search">
  <button class="md-raised" type="submit">Rechercher</button>
  <button class="md-raised" v-on:click="resetQuery">Reset</button>
    <el-row :gutter="25">
      <el-col v-for="(r,index) in restaurants" :key="index"  :span="6">
        <restaurant :restaurant="r"></restaurant>
      </el-col>
    </el-row>
  <div class="queryselector">
    <input type="range" min="5" max="100" v-model="pageSize" step="5" id="slider">
    <button class="md-raised" :disabled="pageNumber===0" v-on:click="goPrevious">Précèdent</button>
    <button class="md-raised" v-on:click="goNext">Suivant</button>
  </div>
  </div>
</template>

<script>
import TopMenu from "./TopMenu";
import restaurant from "./restaurant"
import {restRestaurantsService,restGoogleMapsService} from "../main";
export default {
  name: "restaurantsList",
  components: {TopMenu,restaurant},
  data:function(){
    return {
      restaurants: restRestaurantsService.getTabRestaurants(),
      nom: '',
      cuisine: '',
      id: '',
      address: '',
      coord: '',
      pageSize: 12,
      pageNumber: 0,
      restaurantsNumber: 0,
      restaurantNameQuery: '',
      photo: ''
    }
  },
  methods: {
    supprimerRestaurant(index) {
      restRestaurantsService.deleteRestaurant(index);
      this.restaurants = restRestaurantsService.getTabRestaurants();
    },
    ajouterRestaurant(event) {
      restRestaurantsService.addRestaurant(event);
      this.restaurants = restRestaurantsService.getTabRestaurants();
    },
    getColor(index) {
      return (index % 2) ? 'lightBlue' : 'pink';
    },
    resetQuery(){
      this.restaurantNameQuery = '';
      this.restaurants = restRestaurantsService.getRestaurantsFromServer();
    },
    goNext(){
      this.pageNumber++;
      restRestaurantsService.setPageNumber(this.pageNumber);
      this.restaurants = restRestaurantsService.getTabRestaurants();
    },
    getDetails(id){
      restGoogleMapsService.getRestaurantDetails(id);
    },
    getPhoto(id){
      this.photo = restGoogleMapsService.getRestaurantPhoto(id);
    },
    goPrevious(){
      if(this.pageNumber>0){
        this.pageNumber--;
        restRestaurantsService.setPageNumber(this.pageNumber);
        this.restaurants = restRestaurantsService.getTabRestaurants();
      }
    },
  },
  watch: {
    pageSize: function (val) {
      if (val) {
        restRestaurantsService.setPageSize(this.pageSize);
        this.restaurants = restRestaurantsService.getTabRestaurants();
      }
    }
  },
  mounted(){
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-col-6 {
  padding:0 !important;
}
</style>