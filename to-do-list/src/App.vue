<script setup>
  import SideBar from './components/Sidebar/Sidebar.vue'
</script>

<template>
  <div class="app">
    <SideBar></SideBar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: 12rem auto;
}

main{
    overflow: hidden auto;
}
</style>
