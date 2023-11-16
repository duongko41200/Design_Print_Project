<template>
  <div>
    <router-view />
  </div>
</template>

<script>
const designMappper = createNamespacedHelpers('design');
import { createNamespacedHelpers } from 'vuex';
export default {
  name: 'App',
  components: {

  },
  mounted(){
    this.getAllDesign()
  },
  methods: {
    ...designMappper.mapActions([
			'getAllDesign',

		]),
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
