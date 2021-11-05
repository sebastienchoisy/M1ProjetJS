<template>
  <div v-if="!isRegistered" class="form-container">
    <el-form label-width="140px">
        <h2>Formulaire</h2>
        <div class="formulaire">
        <el-form-item label="Pseudo" class="pseudo">
          <el-input  v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="Mot de passe" >
          <el-input  v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="Nom">
          <el-input  v-model="user.lastname"></el-input>
        </el-form-item>
        <el-form-item label="Prénom">
          <el-input  v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="Téléphone">
          <el-input  v-model="user.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="Mail">
          <el-input  v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="Rôle">
          <el-radio-group v-model="user.role">
            <el-radio label="Restaurateur"></el-radio>
            <el-radio label="Client"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Adresse">
          <el-input type="textarea" v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="SubmitForm" type="primary">Créer</el-button>
            <el-button>Annuler</el-button>
        </el-form-item>
        </div>
    </el-form>
    </div>
  <div v-else>
    <span>Bienvenu</span>
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
    width:36%;
  }
  /*.el-input,.el-textarea,.el-radio-group {
    margin-top: 10%;
  }*/

.pseudo{
 margin-top:50px;
}

.formulaire{
  border: solid black 1px;
  border-radius:10px;
}

.el-form-item{
  margin-right:50px;
}
</style>