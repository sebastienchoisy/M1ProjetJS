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
  <table>
    <tr>
      <th>Nom</th>
      <th>Cuisine </th>
    </tr>
    <tbody>
    <tr v-for="(r,index) in restaurants" :key="index" v-bind:style="{backgroundColor:getColor(index)}"
                  v-bind:class="{bordureRouge:(index === 2)}">
      <td>{{r.nom}}</td>
      <td> {{r.cuisine}}</td>
      <td><button v-on:click="supprimerRestaurant(r.id)">Delete</button></td>
    </tr>
    </tbody>
  </table>
  <div class="queryselector">
    <input type="range" min="5" max="100" v-model="pageSize" step="5" id="slider">
    <button class="md-raised" :disabled="pageNumber===0" v-on:click="goPrevious">Précèdent</button>
    <button class="md-raised" v-on:click="goNext">Suivant</button>
  </div>
  </div>
</template>

<script>

import TopMenu from "./TopMenu";
import {restRestaurantsService} from "../main";
export default {
  name: "restaurantsList",
  components: {TopMenu},
  data:function(){
    return {
      restaurants: restRestaurantsService.getTabRestaurants(),
      nom: '',
      cuisine: '',
      id: '',
      pageSize: 5,
      pageNumber: 0,
      restaurantsNumber: 0,
      restaurantNameQuery: ''
    }
  },
  methods: {
    supprimerRestaurant(index) {
      restRestaurantsService.deleteRestaurant(index);
    },
    ajouterRestaurant(event) {
      restRestaurantsService.addRestaurant(event);
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
      restRestaurantsService.setPageNumber(this.pageNumber)
      console.log(this.restaurants)
    },
    goPrevious(){
      if(this.pageNumber>0){
        this.pageNumber--;
        restRestaurantsService.setPageNumber(this.pageNumber)
      }
    },
  },
  watch: {
    pageSize: function (val) {
      if (val) {
        restRestaurantsService.setPageSize(this.pageSize)
      }
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
table {
  border: 1px solid black;
  width: 100%;
  border-collapse: collapse;
}

tr,
td {
  border: 1px solid black;
}

td {
  padding: 5px;
}

tr:hover {
  background-color: yellow;
}

input:invalid {
  background-color: pink;
}

input:valid {
  background-color: lightGreen;
}

.bordureRouge {
  border: 2px dashed red;
}
.search {
  margin-bottom: 2%;
}

form {
  margin: 6px 8px;
}

.md-field {
  width:30%;
  margin-left:1%;
}

.queryselector{
  margin-top:5%;
}
</style>