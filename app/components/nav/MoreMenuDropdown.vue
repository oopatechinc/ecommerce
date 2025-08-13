<script setup lang="ts">

</script>

<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn
        color="white"
        class="text-capitalize ml-3 pb-2"
        light
        v-bind="props"
        elevation="0"
        icon
      >
        <VIcon>mdi-dots-vertical</VIcon>
      </VBtn>
    </template>
    <VList>
      <VListItem>
        <template #title>
          Home
        </template>
      </VListItem>

<!--      <VListItem>-->
<!--        <NuxtLink to="/about">-->
<!--          <VListItemTitle class="black&#45;&#45;text">-->
<!--            About-->
<!--          </VListItemTitle>-->
<!--        </NuxtLink>-->
<!--      </VListItem>-->

<!--      <VDivider class="mx-4"/>-->

<!--      <VListItem>-->
<!--        <NuxtLink to="/contact">-->
<!--          <VListItemTitle class="black&#45;&#45;text">-->
<!--            Contact-->
<!--          </VListItemTitle>-->
<!--        </NuxtLink>-->
<!--      </VListItem>-->
    </VList>
  </VMenu>
</template>


<style scoped>

</style>
