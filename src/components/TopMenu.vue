<template>
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
</template>

<script>
export default {
  name: "TopMenu",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.router-link-active {
  text-decoration: none;
}
</style>