<template>
  <v-menu open-on-hover bottom offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        color="white"
        class="text-capitalize ml-6"
        light v-bind="attrs"
        elevation="0"
        outlined
        v-on="on"
      >
        {{`Hi, ${$auth.user.firstname}`}}
        <v-icon right>mdi-menu-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item link>
        <NuxtLink to="/account">
          <v-list-item-title class="black--text">
            Account
          </v-list-item-title>
        </NuxtLink>
      </v-list-item>

      <v-divider class="mx-4"></v-divider>

      <v-list-item link @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: "AccountDropdown",
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
