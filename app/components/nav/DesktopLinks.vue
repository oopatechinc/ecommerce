<script setup lang="ts">
const authStore = useAuthStore()
const messageStore = useMessagesStore()
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
    <div class="d-flex">
      <div>
        <NuxtLink to="/"><VBtn text class="nav-btn">Home</VBtn></NuxtLink>
        <NuxtLink to="/businesses">
          <VBtn text class="nav-btn">
            Businesses
            <VIcon v-if="authStore.isLoggedIn">mdi-store</VIcon>
          </VBtn>
        </NuxtLink>
      </div>

      <template v-if="!authStore.isLoggedIn">
        <NuxtLink to="/about"><v-btn text class="nav-btn">About Us</v-btn></NuxtLink>
        <NuxtLink to="/contact"><v-btn text class="nav-btn">Contact</v-btn></NuxtLink>
        <VBtn text class="nav-btn" @click="authStore.showRegistrationDialog = true">Register</VBtn>
        <VBtn text class="nav-btn" @click="authStore.showLoginDialog = true">Login</VBtn>
      </template>
      <template v-else>
        <NuxtLink to="/messages">
          <VBtn text class="nav-btn">
            My Messages
            <VBadge
                v-if="messageStore.unreadMessagesCount > 0"
                :content="messageStore.unreadMessagesCount"
                color="success"
                overlap
            >
              <VIcon>mdi-email</VIcon>
            </VBadge>
            <v-icon v-else>mdi-email</v-icon>
          </VBtn>
        </NuxtLink>

        <NuxtLink to="/appointments">
          <VBtn text class="nav-btn">
            My Appointments
            <VIcon>mdi-calendar-check</VIcon>
          </VBtn>
        </NuxtLink>

        <NavMoreMenuDropdown />
        <NavAccountDropdown />
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>

