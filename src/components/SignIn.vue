<!-- COMPONENTE BOILERPLATE -->
 
  <template>
  <div class="container">
    <h3 class="header-title">Welcome back! </h3>
    <p class="header-subtitle">Please enter your details</p>

     <form @submit.prevent="signIn" class="form-component">
      <!-- Email -->
      <div class="parent-container-regular-input">
        <label for="email" class="input-field-label">Email</label>
        <input class="input-regular-type" type="email" id="email" v-model="email">
      </div>
      <!-- Password -->
      <div class="parent-container-input-rigt-button">
        <label class="input-field-label" for="password">Password</label>
        
        <lottie-player v-if="showPassword" src="https://assets6.lottiefiles.com/packages/lf20_4yofoa5q.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;"  loop autoplay></lottie-player>
        <div class="input-button-right-container">
          <input
            :type="showPassword ? 'text' : 'password'"
            class="input-button-right"
            placeholder="**************"
            required
            id="password"
            v-model="password"
          />
          <button @click.prevent="toggleShowPassword" class="input-button">show</button>
        </div>
      </div>
     <button class="button" type="submit">Log In</button>
     <div v-show="errorMsg">{{ errorMsg }}</div>
    </form>

    <!-- <form class="sign-in-form" @submit.prevent="signIn">
      <label class="input-field-label">E-mail</label>
      <input
        type="email"
        class="input-field"
        placeholder="example@gmail.com"
        id="email"
        v-model="email"
        required
      />
      <br />
      <label class="input-field-label">Password</label>
      <div class="input-password">
        <input
          :type="showPassword ? 'text' : 'password'"
          class="input-field"
          placeholder="**********"
          id="password"
          v-model="password"
          required
        />
        <button class="button-password" @click.prevent="toggleShowPassword">Show</button>
      </div>
      <div class="input-regular-type"></div>
      <div class="input-button-right-container">
        <input 
        :type="showPassword ? 'text' : 'password'"
        class="input-button-right"
        placeholder="**************"
        required
        v-model="password"
        >
        <button class="input-button">show</button>
      </div>
      
      <button class="button" type="submit">Log In</button>
    </form> -->

    <p>
      Dont have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Error Message
const errorMsg = ref("");

// Arrow function to Signin user to supaBase
const signIn = async () => {
  if (password.value === password.value) {
    try {
      console.log("click");
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signIn(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/" });
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
  errorMsg.value = "Contraseña incorrecta, vuelve a intentarlo";
};

const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
  setTimeout(() => {
    showPassword.value = !showPassword.value
  }, 3000)
}
</script>

<style></style>
