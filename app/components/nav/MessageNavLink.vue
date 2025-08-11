<script setup lang="ts">
const authStore = useAuthStore()
const messageStore = useMessageStore()
</script>

<template>
  <div>
    <NuxtLink v-if="authStore.isLoggedIn" to="/messages">
      <v-btn text>
        My Messages
        <v-badge
          v-if="messageStore.unreadMessagesCount > 0"
          :content="messageStore.unreadMessagesCount"
          color="success"
          overlap
        >
          <v-icon>mdi-email</v-icon>
        </v-badge>
        <v-icon v-else>mdi-email</v-icon>
      </v-btn>
    </NuxtLink>
  </div>
</template>
