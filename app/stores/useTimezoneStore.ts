
import type {Timezone} from "~/types/timezone.type";
import type {AxiosInstance} from "axios";

export const useTimezoneStore = defineStore('timezone', () => {
    const axios = useNuxtApp().$axios as AxiosInstance;


    const timezones = ref<Timezone[]>()

    async function getTimezones() {
        if (timezones.value?.length) {
            return
        }

        let error = false
        const response = await axios.get('/timezones').catch(() => {
            error = true
        })

        if (!error) {
            timezones.value = response?.data as Timezone[]
        }
    }

    return {getTimezones, timezones}
})