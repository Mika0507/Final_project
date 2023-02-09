<template>
  <div class="container">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Create an account</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div>

    <form @submit.prevent="signUp" class="form-component">
      <!-- Email -->
      <div class="parent-container-regular-input">
        <label for="email" class="input-field-label">Email</label>
        <input type="email" id="email" v-model="email" placeholder="example@gmail.com">
      </div>
      <!-- Password -->
      <div class="parent-container-input-rigt-button">
        <label class="input-field-label" for="password">Password</label>
        <div class="input-button-right-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="input-button-right"
            placeholder="**************"
            required
            id="password"
            v-model="password"
          />
          <button class="input-button">show</button>
        </div>
      </div>
      <!-- Confirm password -->
      <div class="parent-container-input-rigt-button">
        <label class="input-field-label" for="confirm-password">Confirm Password</label>
        <div class="input-button-right-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="input-button-right"
            placeholder="**************"
            required
            id="confirm-password"
            v-model="confirmPassword"
          />
          <button class="input-button">show</button>
        </div>
        <button class="button" type="submit">Sign Up</button>
        <p>
          Have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>

    <!-- <form @submit.prevent="signUp" class="form-sign-in">
      <div class="form">
        <div class="form-input-email">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input-password">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
          <button class="button-password-singup" @click.prevent="toggleShowPassword">Show</button>
        </div>
        <div class="form-input-confirmpassword">
          <label class="input-field-label">Confirm password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
          <button class="button-password-singup" @click.prevent="toggleShowPassword">Show</button>
        </div>
        
        <button class="button" type="submit">Sign Up</button>
        <p>
          Have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form> -->

    <div v-show="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
