<template>
 <div class="container">
  <div id="details">
  <el-col v-if="restaurant" class="carré details-container" >
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
                            <span v-if="!isAuthentified()" style="color:#cf1717">{{message}}</span>
                            <el-row class="menu-row" v-for="item in menu" :key="item.id" style="background-color:white;">
                              <el-col :span="8"><el-image :src="item.url"></el-image></el-col>
                              <el-col :span="8">{{item.nom}}</el-col>
                              <el-col :span="4">{{item.prix}} €</el-col>
                              <el-col :span="4"> <el-button :disabled="!isAuthentified()" icon="el-icon-plus" circle v-on:click="addItemToOrder(item)"></el-button></el-col>
                            </el-row> 
                    </el-col>
                </el-row>   
            </el-col>
 </div>
   <div v-if="order.length" id="commande">
     <el-row>
       <el-col :span="24"><h1>Votre commande</h1></el-col>
     </el-row>
     <el-row class="order-row order-item" v-for="item in order" :key="item.id" style="background-color:white;">
       <el-row>
       <div class="float-left">{{item.nom}}</div>
       <div class="float-right">{{item.prix}} €</div>
       </el-row>
       <el-row class="flex-center">
       <el-col :offset="8" :span="4"> <el-button :disabled="!isAuthentified()" icon="el-icon-plus" circle v-on:click="addItemToOrder(item)"></el-button></el-col>
         <el-col :span="2">{{item.quantity}}</el-col>
       <el-col :span="4"> <el-button :disabled="!isAuthentified()" icon="el-icon-minus" circle v-on:click="removeItemToOrder(item)"></el-button></el-col>
       </el-row>
     </el-row>
     <el-row>
       <el-col><span>Total</span><span class="float-right">{{orderCost}} €</span> </el-col>
     </el-row>
     <el-row>
       <el-col><el-button @click="dialogVisible = true">Valider</el-button><el-button @click="cancelOrder()">Annuler</el-button></el-col>
     </el-row>
   </div>
   <el-dialog
       title="Confirmation commande"
       :visible.sync="dialogVisible"
       width="30%">
     <span>Confirmer la commande de {{orderCost}} €? </span>
     <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Annuler</el-button>
    <el-button type="primary" @click="sendOrder(),dialogVisible = false">Confirmer</el-button>
  </span>
   </el-dialog>
 </div>
</template>



<script>
import restaurantService from "../services/restaurant.service";
import googleService from "../services/google.service";
import menusData from "../assets/menus.json";
import {message} from "@/helpers/message.enum";
import {Order} from "@/models/order.model";

export default {
  name: "restaurantDetails",
  data: function() {
    return {
      order : [],
      orderCost: 0,
      restaurant: '',
      photo:'',
      menu:'',
      center: {
        lat: '',
        lng: '',
      },
      label: '',
      message: message.LOGGINTOORDER,
      dialogVisible: false
    }
  },
  methods: {
    sendOrder(){
      let username = this.$store.state.auth.user.username;
      let order = new Order(this.restaurant.name,username,new Date(),this.order,this.orderCost);
      this.$store.dispatch('order/sendOrder',order);
    },
    getDetails() {
      restaurantService.getRestaurantFromId(this.$route.params.id).then((res) =>{
        this.restaurant = res.restaurant;
        this.center.lat = this.restaurant.address.coord[1];
        this.center.lng = this.restaurant.address.coord[0];
        this.label = {'text': this.restaurant.name, 'color': 'white'};
        this.getMenu();
      });
      googleService.getRestaurantPhoto(this.$route.params.id).then((res) => this.photo = res);
    },
    getMenu(){
      for(let i=0;i<menusData.length;i++){
        if(menusData[i].name === this.restaurant.cuisine) {
          this.menu = menusData[i].items;
        }
      }
    },
    cancelOrder(){
      this.order=[];
    },
    getTotalOrderCost(){
      this.orderCost = 0;
      this.order.forEach((order)=> this.orderCost += order.prix );
    },
    addItemToOrder(item){
      if(this.order.length) {
        let itemExist = this.order.find(storedItem => storedItem.nom == item.nom);
          if (itemExist) {
            let defaultItem = this.menu.find(item => item.nom == itemExist.nom);
            itemExist.quantity++;
            itemExist.prix += defaultItem.prix;
          } else {
            let newItem = Object.assign({}, item);
            newItem.quantity = 1;
            this.order.push(newItem);
          }
      } else {
        let newItem = Object.assign({}, item);
        newItem.quantity = 1;
        this.order.push(newItem);
      }
      this.getTotalOrderCost();
    },
    removeItemToOrder(item){
      if(this.order.length) {
        let itemExist = this.order.find(storedItem => storedItem.nom == item.nom);
        if (itemExist.quantity > 1) {
          let defaultItem = this.menu.find(item => item.nom == itemExist.nom);
          itemExist.quantity--;
          itemExist.prix -= defaultItem.prix;
        } else {
          let index = this.order.indexOf(itemExist);
          if(index !== -1){
            this.order.splice(index,1)
          }
        }
      }
      this.getTotalOrderCost();
    },
    isAuthentified() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
    beforeMount: function () {
      this.getDetails();
    }
}
</script>

<style scoped>

.details-container{

}
h1 {
  color: #083b66;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.flex-center {
  display: flex;
  align-items: center;
}

.float-left {
  float:left;
}

.float-right {
  float:right;
}

.address {
  margin-top:5%;
}

.order-item {
  margin: 10px;
  border: 2px solid #083b66;
  background-color: white;
  border-radius: 6px;
  padding: 4%;
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

#commande {
  width: 25%;
}

#commande .el-col {
  padding:3%;
}

#details {
  width:50%;
}

.order-row {

}


</style>