<template>
  <div class="form-container">
    <el-form :model="registerForm" :rules="rules" label-width="10px" ref="registerForm">
      <el-row>
        <el-col :span="10"> <el-form-item prop="username"><el-input placeholder="Pseudo" v-model="registerForm.username"></el-input></el-form-item></el-col>
        <el-col :offset="4" :span="10"><el-form-item prop="password"><el-input placeholder="Mot de passe" v-model="registerForm.password" show-password></el-input></el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="10"><el-form-item prop="name"><el-input placeholder="Prénom" v-model="registerForm.name"></el-input></el-form-item></el-col>
        <el-col :offset="4" :span="10"><el-form-item prop="lastname"><el-input placeholder="Nom" v-model="registerForm.lastname"></el-input></el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="10"><el-form-item prop="phoneNumber"><el-input placeholder="Téléphone" v-model="registerForm.phoneNumber"></el-input></el-form-item></el-col>
        <el-col :offset="4" :span="10"><el-form-item prop="email"><el-input placeholder="Email" v-model="registerForm.email"></el-input></el-form-item></el-col>
      </el-row>
      <el-form-item prop="role"> <el-radio-group v-model="registerForm.role">
          <el-radio label="Restaurateur"></el-radio>
          <el-radio label="Client"></el-radio>
        </el-radio-group></el-form-item>
        <el-form-item prop="address"><el-input placeholder="Adresse" type="textarea" v-model="registerForm.address"></el-input></el-form-item>
      <el-form-item>
        <el-button @click="SubmitForm" type="primary" >Créer</el-button>
      </el-form-item>
      <span v-if="isRegistered"> <h1>Inscription réussie !</h1></span>
    </el-form>
    </div>
</template>

<script>
import {User} from "@/models/user.model";

export default {
  name: "register",
  data() {
    return {
      registerForm: {
        username: '',
        name: '',
        lastname: '',
        password: '',
        phoneNumber: '' ,
        email: '',
        role: '',
        address: ''
      },
       isRegistered: false,
      rules: {
        username: [
          { required: true, message: 'Veuillez renseigner un pseudo', trigger: 'blur' },
          { min: 3, message: 'Votre pseudo doit avoir au minimum 3 caractères', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Veuillez renseigner un prénom', trigger: 'change' }
        ],
        lastname: [
          { required: true, message: 'Veuillez renseigner un nom', trigger: 'change' }
        ],
        password: [
          { required: true, message: 'Veuillez renseigner un mot de passe', trigger: 'change' },
          { min: 6, message: 'Votre mot de passe doit avoir au minimum 6 caractères', trigger: 'blur' }
        ],
        phoneNumber: [
          { min: 10, max: 10, message: 'Votre numéro doit avoir 10 caractères', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Veuillez renseigner une adresse mail', trigger: 'change' },
          {type: 'email', message: `adresse mail non valide`, trigger: 'change'}
        ],
        role: [
          { required: true, message: 'Veuillez choisir un rôle', trigger: 'blur' }
        ],
        address: [
          { required: true, message: 'Veuillez donner une adresse', trigger: 'blur' }
        ]
      }
    };
  },
  methods:{
    SubmitForm(){
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          let user = new User(
              this.registerForm.username,
              this.registerForm.name,
              this.registerForm.lastname,
              this.registerForm.phoneNumber,
              this.registerForm.address,
              this.registerForm.email,
              this.registerForm.password,
              this.registerForm.role
          )
          this.$store.dispatch('auth/register',user)
              .then( () => {
                this.isRegistered = true;
              });
        } else {
          console.log('problème formulaire');
        }
      })
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