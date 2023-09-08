<template>
  <HomeView></HomeView>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

button {
  border: none;
  padding: 0;
  cursor: pointer;
  background: none;
}
</style>

<script>
import HomeView from "./views/HomeView.vue";

export default {
  components: { HomeView },
};
</script>
