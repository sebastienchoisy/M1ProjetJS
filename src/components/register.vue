<template>
  <div class="form-container">
    <el-form label-width="120px">
      <el-row>
        <el-col :span="10"><el-input placeholder="Pseudo" v-model="user.username"></el-input></el-col>
        <el-col :offset="4" :span="10"><el-input placeholder="Mot de passe" v-model="user.password" show-password></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="10"><el-input placeholder="Prénom" v-model="user.name"></el-input></el-col>
        <el-col :offset="4" :span="10"><el-input placeholder="Nom" v-model="user.lastname"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="10"><el-input placeholder="Téléphone" v-model="user.phoneNumber"></el-input></el-col>
        <el-col :offset="4" :span="10"><el-input placeholder="Email" v-model="user.email"></el-input></el-col>
      </el-row>
          <el-radio-group v-model="user.role">
          <el-radio label="Restaurateur"></el-radio>
          <el-radio label="Client"></el-radio>
        </el-radio-group>
        <el-input placeholder="Adresse" type="textarea" v-model="user.address"></el-input>
      <el-form-item>
        <el-button @click="SubmitForm" type="primary" >Créer</el-button>
        <el-button>Annuler</el-button>
      </el-form-item>
      <span v-if="!isRegistered"> <h1>Inscription réussie !</h1></span>
    </el-form>
    </div>
</template>

<script>
import {User} from "@/models/user.model";

export default {
  name: "register",
  data() {
    return {
       user: new User(),
       isRegistered: false,
    };
  },
  methods:{
    SubmitForm(){
      this.$store.dispatch('auth/register',this.user)
          .then( () => {
              this.isRegistered = true;
          });
    }
  }
}
</script>

<style scoped>
  .form-container {
    display: flex;
    justify-content: space-around;
  }
  .el-form {
    width:50%;
  }
  .el-input,.el-textarea,.el-radio-group {
    margin-top: 10%;
  }

</style>