<template>
  <v-layout id="loginPage">
    <form class="form-signin">
      <img class="mb-4" src="../assets/logo.png" alt="" width="72" height="72">

      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div v-if="errors" class="alert alert-danger">
        <template v-for="(error, key) in errors">
          <div :key="key">{{key}}: {{error}}</div>
        </template>
      </div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="email"
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="password"
      >
      <button class="btn btn-lg btn-primary btn-block" @click="login()" type="button">Sign in</button>
    </form>
  </v-layout>
</template>

<script>
import VLayout from "@/layouts/Minimal.vue";
import { AUTH_LOGIN_ACTION, AUTH_RESET_ERRORS_MUTATION, AUTH_SET_ERRORS_MUTATION } from "@/store/auth/types";
import { dispatch, commit } from "@/store";
import { mapState } from 'vuex';



export default {
  name: "login",
  components: {
    VLayout
  },
  data: () => ({
    email: 'admin@example.com',
    password: 'admin',
  }),
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
  },
  methods: {
    isValidEmail(email) {
      const val = String(email);
      if (val.length > 255 || val.length < 6) {
        return false;
      }
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w\d-]+\.)*[\w\d-]{1,62})\.([\w\d-]{2,63}?)$/i.test(val.trim());
    },
    validate(email, password){
      const errors = {}
      if (email.length === 0){
        errors['Email'] = 'required!';
      }
      if (!this.isValidEmail(email)) {
        errors['Email'] = 'invalid!';
      }

      if (password.length === 0) {
        errors['Password'] = 'required!';
      }
      if (Object.keys(errors).length) {
        return errors;
      }
      return false;

    },
    login() {
      const { email, password } = this;
      const errors = this.validate(email, password);
      if (errors) {
        return commit(AUTH_SET_ERRORS_MUTATION, errors);
      }
      commit(AUTH_RESET_ERRORS_MUTATION);
      dispatch(AUTH_LOGIN_ACTION, { email, password });
    }
  }
};
</script>

<style>
#loginPage {
  height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
