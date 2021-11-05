<template>
  <div>
  <div class="auth-container">
    <el-button v-if="!isAuthentified()" @click="dialogVisible = true">Se connecter</el-button>
    <el-button v-if="isAuthentified()" @click="logOut">Se Déconnecter</el-button>
    <router-link to="/register"><el-button v-if="!isAuthentified()">S'enregistrer</el-button></router-link>

    <el-dialog custom-class="login-dialog"
        title="Connexion"
        :visible.sync="dialogVisible"
    >
      <el-form label-position="left"  status-icon  ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Pseudo" >
          <el-input type="text" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input type="password" v-model="user.password" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="logIn" >Se connecter</el-button>
          <el-button >Annuler</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/register"><el-link v-on:click="dialogVisible=false" :underline="false" icon="el-icon-user"> Inscrivez vous maintenant !</el-link></router-link>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
 <div class="header">
   <img src="~@/assets//eat&joyLogo.png" alt="">
   <el-menu
       :default-active="activeIndex2"
       class="el-menu-demo top-menu"
       mode="horizontal"
       @select="handleSelect"
       background-color="#FFFFFF"
       text-color="#083b66"
       active-text-color="#cf1717">
     <el-menu-item index="1"><router-link to="/restaurants">Accueil</router-link></el-menu-item>
     <el-menu-item index="2"><router-link to="/compte">Mon Compte</router-link></el-menu-item>
     <el-menu-item index="3">Historique de commandes</el-menu-item>
     <el-menu-item index="3">Ma commande</el-menu-item>
   </el-menu>
 </div>
  </div>
</template>

<script>

import {User} from "@/models/user.model";

export default {
  name: "headerContainer",
  data() {
    return {
      user : new User(),
      dialogVisible: false,
      activeIndex: '1',
      activeIndex2: '1',
      name:'',
      password:''
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goToRegisterPage() {
      this.$router.push({path:'/register'})
    },
    logIn(){
      this.$store.dispatch('auth/login',this.user)
          .then( () => {
              this.$router.push({path:'/compte'});
              this.dialogVisible = false;
      });
    },
    logOut(){
      this.$store.dispatch('auth/logout');
      if(this.$route.path !== '/restaurants') {
        this.$router.push({path: '/restaurants'})
      }
    },
    isAuthentified(){
      return this.$store.state.auth.status.loggedIn;
    }
  }
}
</script>

<style>

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.login-dialog {
  display:flex ;
  flex-direction: column;
  align-items: center;
  min-width: 420px;
  max-width: 520px;
}
.auth-container {
  display: flex;
  justify-content: flex-end;
}
.router-link-active {
  text-decoration: none;
}
</style>