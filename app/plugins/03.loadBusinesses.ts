import {useBusinessesStore} from "~/stores/useBusinessesStore";

export default defineNuxtPlugin(async() => {
    const businessStore = useBusinessesStore()
    if (import.meta.client) {
         await businessStore.getBusinesses()
    }
})