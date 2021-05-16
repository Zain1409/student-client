<template>
  <div id="app">
    <div class="nav">
      <navbar />
    </div>
    <div class="content">
      <router-view />
    </div>

    <!-- <TestApi /> -->
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'

// import TestApi from './components/TestApi.vue'

export default {
  name: 'App',
  components: {
    Navbar

    // TestApi
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.nav{
  width: 1280px;
    height: 50px;
    background: #F6F8F9 0% 0% no-repeat padding-box;
    box-shadow: 30px 3px 6px #00000029;
    border: 0.5px solid #ACABAB;
    opacity: 1;
    margin: auto;
}
.content{
  margin: auto;
  width: 1280px;
  height: auto;
  padding-top: 20px;
  background-color: rgb(162, 221, 148);
}
</style>
