export default defineNuxtPlugin(async(nuxtApp) => {
    const auth = useAuthStore()
    if (import.meta.client && !auth.isLoggedIn) {
         await auth.fetchUser()
    }
})