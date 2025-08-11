import type {AxiosInstance} from "axios";

export const useMessagesStore = defineStore('messages', () => {
    const axios = useNuxtApp().$axios as AxiosInstance
    const authStore = useAuthStore()

    const unreadMessagesCount = ref(0)

    async function getUnreadMessagesCount() {
        const params = `?receiverable_id=${authStore.user.id}&receiverable_type=${authStore.user.morph_class}&statusRead=0&total=true`
        const response = await axios.get(`messages${params}`);
        unreadMessagesCount.value =  response.data.data
    }

    return {getUnreadMessagesCount, unreadMessagesCount}
})