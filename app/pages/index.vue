<script setup lang="ts">

</script>

<template>
  <HomeHero />
  <HomePopularBusinesses/>

  <v-card>
    <v-row v-if="isLoadingTags">
      <v-col v-for="i in columns" :key="i">
        <v-skeleton-loader
            class="mx-auto"
            type="image, card-heading, list-item-three-line, button"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <div v-if="!isLoadingTags && usedByBusinessesTags && usedByBusinessesTags.length > 0">
      <h2 class="py-6">Popular Services</h2>

      <VueSlickCarousel v-bind="slickOptions">
        <div v-for="(tag ,i) in usedByBusinessesTags" :key="i" class="pa-1">
          <TagCard :tag="tag"></TagCard>
        </div>
        <template #prevArrow>
          <div class="custom-arrow">
            <v-icon color="primary lighten-2">mdi-arrow-left-circle</v-icon>
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-arrow">
            <v-icon color="primary lighten-2">mdi-arrow-right-circle</v-icon>
          </div>
        </template>
      </VueSlickCarousel>
    </div>
  </v-card>
</template>

<style scoped>

</style>