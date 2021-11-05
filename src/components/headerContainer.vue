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
      <el-form label-position="top"  status-icon  ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <el-form-item>
          <el-input type="text" placeholder="Pseudo" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" placeholder="Mot de passe" v-model="user.password" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="logIn" >Se connecter</el-button>
          <el-button @click="closeDialog()" >Annuler</el-button>
        </el-form-item>
        <el-form-item>
          <span>{{message}}</span>
        </el-form-item>
        <el-form-item>
          <router-link to="/register"><el-link v-on:click="closeDialog()" :underline="false" icon="el-icon-user"> Inscrivez vous maintenant !</el-link></router-link>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
 <div class="header">
   <img src="~@/assets//eat&joyLogo.png" alt="">
   <el-menu
       :default-active="activeIndex"
       class="el-menu-demo top-menu"
       mode="horizontal"
       @select="handleSelect"
       background-color="#FFFFFF"
       text-color="#083b66"
       active-text-color="#cf1717">
     <el-menu-item index="1">Accueil</el-menu-item>
     <el-menu-item index="2">Mon Compte</el-menu-item>
     <el-menu-item index="3">Mes commandes</el-menu-item>
   </el-menu>
 </div>
  </div>
</template>

<script>

import {User} from "@/models/user.model";
import {message} from "@/helpers/message.enum";

export default {
  name: "headerContainer",
  data() {
    return {
      user : new User(),
      dialogVisible: false,
      message: '',
      activeIndex: '',
      name:'',
      password:''
    };
  },
  methods: {
    getActiveIndex(){
      switch(this.$route.path){
        case '/restaurants':
          this.activeIndex = '1';
          break;
        case '/compte':
          this.activeIndex = '2';
          break;
        case '/orders':
          this.activeIndex = '3';
          break;
      }
    },
    handleSelect(key) {
      if(key === '1' && this.$route.path !== '/restaurants'){
        this.$router.push({path:'/restaurants'});
        this.activeIndex = key;
      } else if (key === '2' && this.$route.path !== '/compte'){
          if(this.isAuthentified()){
            this.$router.push({path:'/compte'});
            this.activeIndex = key;
          } else {
            this.message = message.LOGGINTOACCESSPROFILE;
            this.dialogVisible = true;
          }
      } else if (key === '3' && this.$route.path !== '/orders'){
        if(this.isAuthentified()){
          this.$router.push({path:'/orders'});
          this.activeIndex = key;
        } else {
          this.message = message.LOGGINTOACCESSORDERS;
          this.dialogVisible = true;
        }
      }
    },
    closeDialog(){
      this.dialogVisible = false;
      this.message = '';
    },
    logIn(){
      this.$store.dispatch('auth/login',this.user)
          .then( () => {
              this.$store.dispatch('order/getOrders',this.user.username);
              this.dialogVisible = false;
              if(this.$route.path === '/register'){
                this.$router.push({path: '/restaurants'});
              }
              this.getActiveIndex();
      });
    },
    logOut(){
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('order/cleanOrders');
      if(this.$route.path === '/orders' || this.$route.path === '/compte') {
        this.$router.push({path: '/restaurants'});
        this.getActiveIndex();
      }
    },
    isAuthentified(){
      return this.$store.state.auth.status.loggedIn;
    }
  },
  beforeMount() {
    this.getActiveIndex();
  }
}
</script>

<style>

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  user-select: none;
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