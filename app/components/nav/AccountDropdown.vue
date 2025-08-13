<script setup lang="ts">
const authStore = useAuthStore()
async function logout() {
  await useAuthStore().logout()
  await useRouter().push('/')
}
</script>

<template>
  <VMenu open-on-hover bottom offset-y>
    <template #activator="{props}">
      <VBtn
        color="white"
        class="text-capitalize ml-6"
        light
        elevation="0"
        outlined
        v-bind="props"
      >
        {{`Hi, ${authStore.user.firstname}`}}
        <VIcon right>mdi-menu-down</VIcon>
      </VBtn>
    </template>

    <VList>
      <VListItem link>
        <NuxtLink to="/account">
          <VListItemTitle class="black--text">
            Account
          </VListItemTitle>
        </NuxtLink>
      </VListItem>

      <VDivider class="mx-4"/>

      <VListItem link @click="logout">
        <VListItemTitle>Logout</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style scoped>

</style>
