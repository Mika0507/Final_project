<template>
  <nav>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
    <router-link to="/" class="link-home">
      Home
    </router-link>

  
        <span>
          <router-link to="/">Task Manager</router-link>
        </span>

        <span>
          <router-link to="/account">Your Account</router-link>
        </span>
    

    <div class="nav-button-logout">
      <ul>
        <!-- <li class="log-out-welcome">
          <p class="link-user-profile">User</p>
        </li> -->
        <li  class="li-log-out-button">
          <button  @click="signOut" class="button">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';
// import { PersonalRouter } from './PersonalRouter.vue'

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView

     await useUserStore().signOut();
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
  } catch (error) {}
};



</script>

<style></style>
