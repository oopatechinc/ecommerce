<template>
  <v-menu open-on-hover bottom offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        color="white"
        class="text-capitalize ml-3 pb-2"
        light v-bind="attrs"
        elevation="0"
        icon
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <NuxtLink to="/">
          <v-list-item-title class="black--text">
            Home
          </v-list-item-title>
        </NuxtLink>
      </v-list-item>

      <v-divider class="mx-4"></v-divider>

      <v-list-item>
        <NuxtLink to="/about">
          <v-list-item-title class="black--text">
            About
          </v-list-item-title>
        </NuxtLink>
      </v-list-item>

      <v-divider class="mx-4"></v-divider>

      <v-list-item>
        <NuxtLink to="/contact">
          <v-list-item-title class="black--text">
            Contact
          </v-list-item-title>
        </NuxtLink>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: "MoreMenuDropdown",
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
