export default defineNuxtPlugin(async() => {
    const auth = useAuthStore()
    if (import.meta.client && !auth.isLoggedIn) {
         await auth.fetchUser()
    }
})