<template>
  <div>
  <div class="auth-container">
    <el-button v-if="!isAuthentified()" @click="dialogVisible = true">Se connecter</el-button>
    <span v-if="isAuthentified()" style="margin-right:1%">Connecté(e) en tant que <span style="color:dodgerblue;font-weight: bold">{{getUserName()}}</span></span>
    <el-button v-if="isAuthentified()" @click="logOut">Se Déconnecter</el-button>
    <router-link to="/register"><el-button v-if="!isAuthentified()">S'enregistrer</el-button></router-link>

    <el-dialog custom-class="login-dialog"
        title="Connexion"
        :visible.sync="dialogVisible"
    >
      <el-form :model="loginForm" :rules="loginRules" label-position="top"  status-icon  ref="loginForm" label-width="70px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" placeholder="Pseudo" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="Mot de passe" v-model="loginForm.password" ></el-input>
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
      dialogVisible: false,
      message: '',
      activeIndex: '',
      name:'',
      password:'',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: 'Veuillez renseigner un pseudo', trigger: 'blur' },
          { min: 3, message: 'Votre pseudo doit avoir au minimum 3 caractères', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Veuillez renseigner un mot de passe', trigger: 'change' },
          { min: 6, message: 'Votre mot de passe doit avoir au minimum 6 caractères', trigger: 'blur' }
        ],
      }
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
      let user;
      this.message = '';
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          user = new User();
          user.username = this.loginForm.username;
          user.password = this.loginForm.password;
          this.$store.dispatch('auth/login',user)
              .then( (res) => {
                if(res !== 'error') {
                  this.$store.dispatch('order/getOrders', user.username);
                  this.dialogVisible = false;
                  if (this.$route.path === '/register') {
                    this.$router.push({path: '/restaurants'});
                  }
                  this.getActiveIndex();
                } else {
                  this.message = 'Mauvais pseudo ou mauvais mot de passe'
                }
              });
        } else {
          console.log('problème formulaire');
        }
      })
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
    },
    getUserName(){
      return this.$store.state.auth.user.username;
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
  align-items: center;
}
.router-link-active {
  text-decoration: none;
}
</style>