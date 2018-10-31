<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { AUTH_GET_USER_ACTION } from '@/store/auth/types';
import { dispatch } from '@/store';
import { transitionTo } from '@/router';
import { setToken } from '@/utils';
export default {
  async mounted() {
    setToken(null);
    const user = await dispatch(AUTH_GET_USER_ACTION);
    if (user && user.token) {
      transitionTo('home');
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
