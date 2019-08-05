<template>
  <header class="header">
    <div :class="$style['content']">
      <img class="header__logo"
           alt="logo"
           :src="logo"/>
      <router-link to="/" class="header__user">{{ username }}</router-link>
    </div>
  </header>
</template>

<script>
  import logo from "./images/logo.png";
  import {mapState} from "vuex";

    export default {
        name: "MainHeader",
        data() {
            return {
                "logo": logo
            }
        },
        computed: {
            ...mapState("user", {
                username: state => state.username
            })
        }
    }
</script>

<style lang="scss">

</style>

<style module lang="scss">
  .content {
    box-sizing: border-box;
    margin: 0;
    padding: 10px 10px 10px 2%;
  }

  .user {
    float: right;
    padding-right: 5%;
    text-decoration: none;
    color: white;
  }
</style>