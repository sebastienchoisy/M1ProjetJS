<template>
 <div>
   <el-menu
       :default-active="activeIndex2"
       class="el-menu-demo top-menu"
       mode="horizontal"
       @select="handleSelect"
       background-color="#FFFFFF"
       text-color="#00cca3"
       active-text-color="#008066">
     <el-menu-item index="1">Accueil</el-menu-item>
     <el-menu-item index="2">Mon Compte</el-menu-item>
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
.top-menu {
  display: flex;
  justify-content: center;
}
</style>