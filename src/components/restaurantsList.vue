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
      <el-button type="submit" icon="el-icon-search" class="chercher">Chercher</el-button>
      <el-button type="Submit" icon="el-icon-delete" class="supprimer"></el-button>
    </div>
  </div>
    <el-row :gutter="25">
      <el-col v-for="(r,index) in restaurants" :key="index" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
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
import restaurant from "./restaurant"
import {restRestaurantsService,restGoogleMapsService} from "../main";
export default {
  name: "restaurantsList",
  components: {restaurant},
  data:function(){
    return {
      restaurants: restRestaurantsService.getTabRestaurants(),
      nom: '',
      cuisine: '',
      id: '',
      address: '',
      coord: '',
      pageSize: 16,
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


.el-col-6 {
  padding:0 !important;
}


.recherche{
  margin: auto;
  /*max-width: 40%;*/
  max-width: 100%;
  height: 235px;
  background-repeat: no-repeat;
  /*background-image: url('https://i-sam.unimedias.fr/2018/04/02/istock-865306026.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=crop&h=591&w=1050');
*/
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

</style>