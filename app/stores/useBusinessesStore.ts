import type {AxiosInstance} from "axios";

export const useBusinessesStore = defineStore('businesses', () => {
    const axios = useNuxtApp().$axios as AxiosInstance
    const authStore = useAuthStore()

    const businesses = ref<Business[]>([])
    const popularBusinesses = ref<Business[]>([])

    async function getBusinesses() {
        if (businesses.value?.length > 0) return

        const params = '?limit=4&appendUserFavorite&appendServices&setupCompleted&appendReviews'

        let error = false
        let response = {}
        if (authStore.isLoggedIn) {
             response =  await axios.get(`auth-businesses${params}`).catch(() => {
                error = true
            });
        } else {
            response = await axios.get(`businesses/${params}`).catch(() => {
                error = true
            })
        }

        if (error) throw response

        popularBusinesses.value = response.data.data
    }

    return {getBusinesses, businesses, popularBusinesses}
})