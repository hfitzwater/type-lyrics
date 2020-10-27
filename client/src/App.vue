<template>
  <div id="app">
    <div style="text-align: left; margin-bottom: 2em;">
      <h1><strong>TYPE</strong>LYRICS</h1>
      <h3>Improve speed and accuracy</h3>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: auto;
  margin-top: 60px;
}
</style>
