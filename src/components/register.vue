<template>
  <div class="container">
    <form @submit.prevent="SubmitForm" class="form-container">
      <el-row>
        <el-col :span="6">
        <el-input placeholder="Nom" v-model="name"></el-input>
        </el-col>
        <el-col :span="6">
        <el-input placeholder="Prénom"  v-model="prenom"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
            <el-input placeholder="Numéro de téléphone" v-model="telephone"></el-input>
        </el-col>
        <el-col :span="6">
            <el-input placeholder="Mot de passe"  v-model="motDePasse"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
            <el-input placeholder="Adresse mail" v-model="email"></el-input>
        </el-col>
        <el-col :span="6">
            <button type="submit">Créer un compte</button>
        </el-col>
      </el-row>
    </form>
    </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
        name: '',
        prenom: '',
        email: '',
        motDePasse: '',
        telephone: '',
    };
  },
  methods:{
    SubmitForm(){
      const data = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password
      })
      let url = "http://localhost:8080/api/users/register";
      fetch(url, {
        method: "POST",
        body: data,
        headers: new Headers({'content-type': 'application/json'}),
      })
          .then((response) => response.json())
          .then((res) => console.log(res))
          .catch(function (err) {
            console.log(err);
          });

    }
  }
}
</script>

<style scoped>
  .form-container {
    width:700px;
  }
  .container {
    width:100%
  }

  .el-input {
    padding: 5%;
  }
</style>