<template>
  <div id="app">
    <headerContainer></headerContainer>
    <router-view></router-view>
  </div>
</template>

<script>

import headerContainer from "@/components/headerContainer";

export default {
  name: 'App',
  components: {
    headerContainer,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
