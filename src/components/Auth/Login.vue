<template>
  <div>
    <form class="form-signin" @submit.prevent="submitLoginForm">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div class="form-group">
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
      </div>
      <div class="form-group">
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
      </div>
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
    submitLoginForm() {
      this.login(this.user)
        .then(() => {
          router.push({ name: "home" });
        })
        .catch(error => {
          this.errors = error.response.data.message;
        });
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
form {
  margin: 0 auto;
  width: 40%;
}
input {
  border-radius: 10px;
}
</style>
