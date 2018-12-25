<template>
  <div>
    <form class="form-signin" @submit.prevent="submitForm">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail">Email address</label>
      <input
        type="text"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autocomplete="email"
        autofocus
        v-model="user.email"
      >
      <label for="inputPassword">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        autocomplete="current-password"
        v-model="user.password"
      >
      <button class="btn btn-dark" type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: Object
    };
  },
  methods: {
    ...mapActions(["login"]),
    submitForm() {
      this.login(this.user);
    }
  },
  computed: {
    ...mapGetters({
      errors: "getErrors"
    })
  }
};
</script>

<style scoped>
h1 {
  color: black;
}
</style>
