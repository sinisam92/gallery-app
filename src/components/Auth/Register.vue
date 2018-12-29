<template>
  <div>
    <form @submit.prevent="submitRegisterForm">
      <div class="form-group">
        <label>First Name</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter First Name"
          required
          autocomplete
          v-model="user.first_name"
        >
        <div v-if="errors">
          <error-handler v-if="errors.first_name">{{errors.first_name[0] }}</error-handler>
        </div>
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter Last Name"
          required
          autocomplete
          v-model="user.last_name"
        >
        <div v-if="errors">
          <error-handler v-if="errors.last_name">{{ errors.last_name[0] }}</error-handler>
        </div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
          autocomplete
          v-model="user.email"
        >
        <div v-if="errors">
          <error-handler v-if="errors.email">{{ errors.email[0] }}</error-handler>
        </div>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          required
          minlength="8"
          v-model="user.password"
        >
        <div v-if="errors">
          <error-handler v-if="errors.password">{{ errors.password[0] }}</error-handler>
        </div>
        <small class="form-text text-muted">We'll never share your password with anyone else.</small>
      </div>
      <div class="form-group">
        <label>Password Confirm</label>
        <input
          type="password"
          class="form-control"
          placeholder="Confirm Password"
          required
          v-model="user.password_confirmation"
        >
        <div v-if="errors">
          <error-handler v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</error-handler>
        </div>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          class="form-check-input"
          required
          v-model="user.terms_and_conditions"
        >
        <label class="form-check-label" for="exampleCheck1">Accepted terms and conditions</label>
        <div v-if="errors">
          <error-handler v-if="errors.terms_and_conditions">{{ errors.terms_and_conditions[0] }}</error-handler>
        </div>
      </div>
      <button type="submit" class="btn btn-outline-dark">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorHandler from "./../partials/ErrorHandler";
export default {
  name: "Register",
  components: {
    ErrorHandler
  },
  data() {
    return {
      user: {
        terms_and_conditions: false
      }
    };
  },
  methods: {
    ...mapActions(["register"]),
    submitRegisterForm() {
      this.register(this.user);
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
.form-text {
  color: black !important;
}
</style>
