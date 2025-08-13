<script setup lang="ts">
import { VSlickCarousel } from 'v-slick-carousel'

const display = useDisplay()
const businessesStore = useBusinessesStore()

</script>

<template>
  <VCard class="container" :max-width="display.smAndDown.value ? 344 : ''" flat>
    <VCardText>
      <div v-if="businessesStore.popularBusinesses.length > 0">
        <h2 class="py-4">Popular Businesses</h2>
        <VSlickCarousel v-bind="slickOptions">
          <div v-for="(business ,i) in businessesStore.popularBusinesses" :key="i" class="pa-1">
            <HomeBusinessCard :business="business" :index="i"/>
          </div>
        </VSlickCarousel>
      </div>
    </VCardText>
  </VCard>

</template>

<style scoped>

</style>