<script setup lang="ts">
</script>

<template>
  <VAppBar elevation="0" height="100" absolute color="transparent">
    <template #prepend>
      <NuxtLink class="logo" to="/public">
        <VImg
            alt="Bookisia Logo"
            class="shrink mr-2"
            contain
            src="/logo.svg"
            transition="scale-transition"
            width="200"
        />
      </NuxtLink>
    </template>

    <template #append>
      <slot />
    </template>
  </VAppBar>
</template>


<style scoped>
</style>
