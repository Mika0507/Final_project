<template>
  <div class="wrapper-profile">
    <Nav />
    <h1>Name: <span>{{ username }}</span></h1>
    <!-- name. username. website. images -->
    <div class="content-form-profile">
      <form class="form-profile">
        <!-- <label for="">Name</label>
      <input type="text" /> -->
        <label for="">User Name</label>
        <input class="input-profile" type="text" placeholder="Escribe tu nombre de usuario" />
        <label for="">Website</label>
        <input class="input-profile" type="url" placeholder="Escribe tu URL" />
        <label for="">Image Avatar</label>
        <div class="section-choose-avatar">
          <button class="button-add-photo"></button>
          <!-- hay que poner el input para poder cargar las imagenes desde el ordenador a la store de supabase -->
          <!-- <input class="input-select-photo" type="file" /> -->
          <img
            class="image-profile"
            :src="
              avatar_url
                ? avatar_url
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
            "
            alt="Profile picture"
          />
        </div>

        <button class="button-accept-changes">Accept Changes</button>
      </form>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style>
</style>