<script setup lang="ts">
import type {AxiosInstance} from "axios"

const utils = useUtils()
const authStore = useAuthStore()
const snackbar = useSnackbarStore()
const axios = useNuxtApp().$axios as AxiosInstance

const props = defineProps({
  business: {
    type:Object,
    required: true
  },
  hover: {
    type: Boolean,
    default: false
  }
})

const isLoading = ref(false)
const model = ref(0)

const isFavoredByUser = computed(() => {
  return authStore.user && authStore.user.favorite_businesses
      && authStore.user.favorite_businesses.filter(fb => fb.business_id === props.business.id && fb.is_active === 1).length > 0
})

const iconColor = computed(() => {
  return isFavoredByUser.value ? 'red'  : ''
})

const reverseIconColor = computed(() => {
  return this.iconColor === 'red' ? '' : 'red'
})

const averageRatings = computed(() => {
  if (props.business.reviews.length === 0) return 0
  const avgRatings = props.business.reviews.reduce((accumulation, currentReview) => {
    accumulation += currentReview.rating
    return accumulation
  }, 0)

  return Number(avgRatings / props.business.reviews.length).toFixed(1)
})

const reviewLength = computed(() => {
  if (props.business.reviews.length === 0) return 0
  return this.business.reviews.length
})

async function toggleLike() {
  if (!authStore.isLoggedIn) {
    snackbar.displayErrorMessage('You must be logged in to like a business. Please login or register now')
    authStore.showLoginDialog = true
    return
  }



  const payload = {
    business_id: props.business.id,
    is_active: isFavoredByUser.value
  }

  let error = false
  isLoading.value = true
  await axios.post(`user/${userId}/toggle-favorite-business`, payload).catch(() => {
    error = false
  })
  isLoading.value = false

  if (error) return

  // update business in store
  // this.updateFavoriteBusinesses(favoriteBusiness)
}
</script>

<template>
  <VCard max-width="400" :loading="isLoading" :elevation="hover ? 12 : 1">
    <VCarousel v-model="model" height="250" hide-delimiter-background>
      <VCarouselItem v-for="(service, i) in business.services" :key="i" :src="service.image_url"/>
    </VCarousel>

    <VCardTitle>
      {{business.name}}
      <VSpacer/>
      <VHover v-slot="{btnHover}">
        <VBtn icon :elevation="btnHover ? 6 : 0" :color="btnHover? reverseIconColor : iconColor" @click="toggleLike">
          <VIcon>mdi-heart</VIcon>
        </VBtn>
      </VHover>
    </VCardTitle>

    <VCardText>
      <VRow
          align="center"
          class="mx-0"
      >
        <VRating
            :value="Number(averageRatings)"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
        />

        <div class="grey--text ms-4">
          {{averageRatings}} ({{reviewLength}})
        </div>
      </VRow>

      <div class="my-4 text-subtitle-1 text-truncate">
        <VIcon>mdi-storefront-check</VIcon> •<span v-for="(service, i) in business.services" :key="i" class="px-1">{{`${service.name}${i+1 >= business.services.length ? '' : ' •'}`}}</span>
      </div>

      <div class="description">{{utils.truncateText(business.long_description)}}</div>
    </VCardText>

    <VCardActions>
      <NuxtLink :to="`/businesses/${props.business.id}?name=${business.name}`">
        <VBtn text color="orange" class="text-capitalize white--text">
          Visit Business
        </VBtn>
      </NuxtLink>

    </VCardActions>
  </VCard>
</template>

<style scoped>
  .description {
    max-height: 60px;
    height: 60px;
  }
</style>
