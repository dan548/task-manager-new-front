<template>
  <main class="main">
    <div class="main__logo plain-logo logo"></div>
    <section class="main__content plain-content">
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
    export default {
        name: "PlainLayout"
    }
</script>

<style>
  .logo {
    background: url("../assets/logo.png") no-repeat;
    background-size: contain;
  }
  .plain-logo {
    height: 30vh;
    background-position: left calc(50% - 30px);
    margin-left: 5vw;
  }
  .main__logo {
    flex-basis: 25%;
  }
</style>

<style scoped>
  .main {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    background: linear-gradient(to right, #EEAABA, #99EFED);
  }
</style>