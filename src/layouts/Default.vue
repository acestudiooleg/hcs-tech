<template>
 <div>
   <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">HCS Tech</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <span class="p-2 text-dark">{{user.firstname}} {{user.lastname}}</span>
      </nav>
      <button @click="logout" class="btn btn-outline-primary">Sign out</button>
    </div>
    <slot></slot>
 </div>
</template>

<script>
import { mapState } from 'vuex';
import { dispatch } from '@/store';
import { AUTH_LOGOUT_ACTION } from '@/store/auth/types';

export default {
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    logout() {
      dispatch(AUTH_LOGOUT_ACTION);
    },
  },
};
</script>
