<template>
  <div>
    <NuxtLink v-if="useAuthStore().isLoggedIn" to="/appointments">
      <v-btn text>
        My Appointments
        <v-icon>mdi-calendar-check</v-icon>
      </v-btn>
    </NuxtLink>
  </div>
</template>
