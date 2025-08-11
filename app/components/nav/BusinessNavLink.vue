<template>
  <div>
    <NuxtLink v-if="useAuthStore().isLoggedIn" to="/businesses">
      <v-btn text class="nav-btn">
        Businesses
        <v-icon>mdi-store-marker</v-icon>
      </v-btn>
    </NuxtLink>
  </div>
</template>
