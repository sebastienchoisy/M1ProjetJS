<template>
    <div>
    <el-button type="primary" class="md-raised" >Ajouter un restaurant</el-button>
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
        <el-row class="espace"></el-row>  
    </div>
</template>


<script>
import {User} from "@/models/user.model";
export default {
  name: "compte",
  data() {
    return {
      user : new User(),
    };
  },
  computed: {
    User(){
      return this.$store.state.auth.user;
    }
  },
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

.adr{
  border-bottom: solid black 0.01px;
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
