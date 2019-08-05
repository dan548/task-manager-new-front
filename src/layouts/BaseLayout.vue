<template>
  <fragment>
    <MainHeader></MainHeader>
    <section class="main__content">
      <router-view></router-view>
    </section>
  </fragment>
</template>

<script>
    import { Fragment } from 'vue-fragment';
    import MainHeader from "../components/MainHeader";

    export default {
        name: "BaseLayout",
        components: {
          Fragment, MainHeader
        }
    }
</script>

<style scoped>

</style>