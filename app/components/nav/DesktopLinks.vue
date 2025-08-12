<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <div class="d-flex">
    <VHover v-slot="{isHovering, props}">
      <VBtn
        v-bind="props"
        color="white"
        variant="elevated"
        rounded
        class="mr-2"
        :elevation="isHovering ? 4 : 0"
        light
        href="https://join.bookisia.com"
        target="_blank"
      >
        Add Your Business
      </VBtn>
    </VHover>
    <div v-if="!authStore.isLoggedIn">
      <NuxtLink to="/"><VBtn text class="nav-btn">Home</VBtn></NuxtLink>
      <NuxtLink to="/businesses"><VBtn text class="nav-btn">Businesses</VBtn></NuxtLink>
    </div>

    <div v-else class="d-flex">
      <NavBusinessNavLink/>
      <NavMessageNavLink />
      <NavAppointmentNavLink />
      <NavMoreMenuDropdown />
      <NavAccountDropdown />
    </div>
    <div v-if="!authStore.isLoggedIn">
      <NuxtLink to="/about"><v-btn text class="nav-btn">About Us</v-btn></NuxtLink>
      <NuxtLink to="/contact"><v-btn text class="nav-btn">Contact</v-btn></NuxtLink>

      <v-btn text class="nav-btn" @click="authStore.showRegistrationDialog = true">Register</v-btn>
      <v-btn text class="nav-btn" @click="authStore.showLoginDialog = true">Login</v-btn>
    </div>

  </div>
</template>



<style scoped>

</style>

