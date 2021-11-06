<template>
    <div>
    <el-button v-if="isRestaurateur" @click="dialogVisible = true" type="primary" class="md-raised" >Ajouter un restaurant</el-button>
    <br>
        <div class="information">
            <el-col :span="12" :offset="6" class="carré" >
                <el-row >
                    <el-col class="détails">
                        Détails
                    </el-col>
                </el-row>
                <el-row >
                    <el-col class="col" :span="12">
                        <div class="gauche1">Prénom</div>
                        <div class="prénom" ><a> {{ User.name }} </a></div>
                    </el-col>
                    <el-col class="col" :span="12">
                        <div class="droite1">Nom</div>
                        <div class="nom" > {{ User.lastname }} </div>
                    </el-col>
                </el-row> 
                <el-row >
                    <el-col class="col" :span="12">
                        <div class="gauche1">Email</div>
                        <div class="email" > {{ User.email }} </div>
                    </el-col>
                    <el-col class="col" :span="12">
                        <div class="droite1">Téléphone Mobile</div>
                        <div class="télephone" > {{ User.phoneNumber }} </div>
                    </el-col>
                </el-row>   
            </el-col>
        </div>
        <el-row class="espace"></el-row>
        <div>
            <el-col :span="12" :offset="6" class="carré" >
                <el-row >
                    <el-col class="adresse">
                      Adresse
                    </el-col>
                </el-row>
                <el-row >
                    <el-col class="col">
                        <div class="adr" ><a>{{ User.address }}</a></div>
                    </el-col>
                </el-row> 
            </el-col>
        </div>
      <el-col :span="12" :offset="6" class="carré" >
        <el-row >
          <el-col class="adresse">
            Vos restaurants
          </el-col>
        </el-row>
        <el-row v-for="restaurant in User.restaurants" :key="restaurant.id">
            <div class="restaurant-name"><a>{{ restaurant}}</a></div>
        </el-row>
      </el-col>
      <el-dialog custom-class="login-dialog"
                 title="Ajouter un restaurant"
                 :visible.sync="dialogVisible"
      >
        <el-form :model="restaurantForm" :rules="restaurantRules" label-width="20px"  ref="restaurantForm" >
            <div class="flex-row-sp-btw">
              <el-form-item prop="restaurantName"><el-input type="text" placeholder="Nom du restaurant" v-model="restaurantForm.restaurantName"></el-input></el-form-item>
              <el-form-item prop="restaurantBuilding"><el-input type="text" placeholder="Bâtiment" v-model="restaurantForm.restaurantBuilding" ></el-input></el-form-item>
            </div>
            <div class="flex-row-sp-btw">
              <el-form-item prop="restaurantStreet"><el-input type="text" placeholder="Rue" v-model="restaurantForm.restaurantStreet" ></el-input></el-form-item>
              <el-form-item prop="restaurantZipcode"><el-input type="text" placeholder="Code Postal" v-model="restaurantForm.restaurantZipcode" ></el-input></el-form-item>
            </div>
            <div class="flex-row-sp-btw">
              <el-form-item prop="restaurantLg"><el-input type="text" placeholder="Longitude" v-model="restaurantForm.restaurantLg" ></el-input></el-form-item>
              <el-form-item prop="restaurantLt"><el-input type="text" placeholder="Latitude" v-model="restaurantForm.restaurantLt" ></el-input></el-form-item>
            </div>
            <div class="flex-row-sp-btw">
              <el-form-item prop="restaurantBorough"><el-input type="text" placeholder="Région" v-model="restaurantForm.restaurantBorough" ></el-input></el-form-item>
              <el-form-item prop="restaurantCuisine"><el-input type="text" placeholder="Cuisine" v-model="restaurantForm.restaurantCuisine" ></el-input></el-form-item>
            </div>

          <div class="flex-row-sp-evenly">
            <el-button type="primary" @click="CreateRestaurant()">Créer le restaurant</el-button>
            <el-button @click="dialogVisible=false,resetRestaurantFields()" >Annuler </el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
</template>


<script>
import {User} from "@/models/user.model";
import {Restaurant} from "@/models/restaurant.model";
import restaurantService from '@/services/restaurant.service';
export default {
  name: "compte",
  data() {
    return {
      user : new User(),
      dialogVisible: false,
      restaurantForm: {
        restaurantName: '',
        restaurantBuilding: '',
        restaurantLg: '',
        restaurantLt: '',
        restaurantStreet: '',
        restaurantZipcode: '',
        restaurantBorough: '',
        restaurantCuisine: '',
      },
      restaurantRules: {
        restaurantName: [
          { required: true, message: 'Veuillez renseigner un nom', trigger: 'blur' }
        ],
        restaurantBuilding: [
          { required: true, message: 'Veuillez renseigner un bâtiment', trigger: 'change' }
        ],
        restaurantStreet: [
          { required: true, message: 'Veuillez renseigner une rue', trigger: 'change' }
        ],
        restaurantZipcode: [
          { required: true, message: 'Veuillez renseigner un code postal', trigger: 'change' },
          { type: 'integer', required: true, message: 'Veuillez renseigner des chiffres', trigger: 'change' }
        ],
        restaurantLg: [
          { required: true, message: 'Veuillez renseigner une longitude', trigger: 'change' },
          { type: 'integer',message: 'Veuillez renseigner des chiffres', trigger: 'change' }
        ],
        restaurantLt: [
          { required: true, message: 'Veuillez renseigner une latitude', trigger: 'change' },
          { type: 'integer',message: 'Veuillez renseigner des chiffres', trigger: 'change' },
        ],
        restaurantBorough: [
          { required: true, message: 'Veuillez renseigner une région', trigger: 'change' },
        ],
        restaurantCuisine: [
          { required: true, message: 'Veuillez renseigner une cuisine', trigger: 'change' },
        ]
      }
    };
  },
  computed: {
    User(){
      return this.$store.state.auth.user;
    }
  },
  methods: {
    isRestaurateur(){
      return this.User.role === 'Restaurateur';
    },
    CreateRestaurant(){
      this.$refs['restaurantForm'].validate((valid) => {
        if (valid) {
          let coord = [];
          coord.push(this.restaurantForm.restaurantLg);
          coord.push(this.restaurantForm.restaurantLt);
          let restaurant = new Restaurant(
              this.restaurantForm.restaurantName,
              this.restaurantForm.restaurantBuilding,
              coord,
              this.restaurantForm.restaurantStreet,
              this.restaurantForm.restaurantZipcode,
              this.restaurantForm.restaurantCuisine,
              this.restaurantForm.restaurantBorough);
          restaurantService.addRestaurant(this.User.username,restaurant);
          this.$store.dispatch('auth/addRestaurant',restaurant.name)
        } else {
          console.log('problème formulaire');
        }
      })
    },
    resetRestaurantFields(){
      this.restaurantForm.restaurantName = '';
      this.restaurantForm.restaurantBuilding = '';
      this.restaurantForm.restaurantLg = '';
      this.restaurantForm.restaurantLt = '';
      this.restaurantForm.restaurantStreet = '';
      this.restaurantForm.restaurantZipcode = '';
      this.restaurantForm.restaurantBorough = '';
      this.restaurantForm.restaurantCuisine = '';
    }
  }
}
</script>

<style>
.carré{
    border:solid #2c3e50 2px;
    margin-top:30px;
    border-radius: 10px;
}

.espace{
    padding: 80px;
}

.détails, .adresse{
  background: linear-gradient(30deg, #2c3e50, #87140D);
  color:white;
  padding:1%;
  font-size:25px;
  border: solid white 1px;
  border-radius: 10px 10px 0  0;
}

.col{
  background-color: #2c3e50 ;  
  border-radius:  0  0 10px 10px;
}

.flex-row-sp-btw {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-row-sp-evenly {
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2%;
}

.adr{
  border-bottom: solid black 0.01px;
}

.restaurant-name {
  padding:2%;
}

.gauche1, .droite1{
    font-size: 16px;
    color:white;
    border: solid white 2px;
    padding: 7px; 
}

.prénom,.nom, .email, .télephone, .adr{
    padding: 20px;
    background-color:white;
}

.adr{
     border-radius:  0  0 10px 10px;
}

.email{
     border-radius:  0  0 0 10px;
}

.télephone{
    border-radius:  0  0 10px 0;
}

.md-raised{
    background-color:#2c3e50 ;
    border-color:#2c3e50 ;
}
</style>
