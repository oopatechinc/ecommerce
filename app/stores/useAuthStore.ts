import type {User} from "~/types/user.type";
import type {AxiosInstance} from "axios";

export const useAuthStore = defineStore('auth', () => {
    const axios = useNuxtApp().$axios as AxiosInstance
    const indexedDB = useIndexedDB()
    const runtimeConfig = useRuntimeConfig()

    const user = ref<User>()
    const showLoginDialog = ref(false)
    const showRegistrationDialog = ref(false)
    const isLoggingIn = ref(false)
    const isRegistering = ref(false)

    const isLoggedIn = computed(() => {
        return user.value !== undefined && Object.keys(user.value).length > 0
    })

    async function fetchUser() {
        let error = false
        const response = await axios.get('/get-user-by-token?type=user&appendConsultant=true&appendMerchantCustomer=true').catch(() => {
            error = true
        })

        if (!error) {
            user.value = response!.data.data as User
        }

        return response
    }

    // async function socialLogin(data: any) {
    //     let error = false
    //     const response = await axios.post('login/get-social-user?type=user&appendConsultant=true&appendMerchantCustomer=true', data).catch(() => {
    //         error = true
    //     })
    //
    //     if (!error) {
    //         isLoggedIn.value = true
    //         user.value = response!.data.data as User
    //     }
    //
    //     return response!.data.data
    // }

    async function fetchSocialUser(data: any) {
        let error = false
        const response = await axios.post('login/get-social-user?type=user&appendConsultant=true&appendMerchantCustomer=true', data).catch(() => {
            error = true
        })

        if (!error) {
            user.value = response!.data.data as User
        }

        return response!.data.data
    }

    async function registerWithCredentials(payload: User) {
        const params = '?type=user&appendConsultant=true&appendMerchantCustomer=true&appendFavoriteBusinesses'

        let error = false
        isRegistering.value = true
        const response =  await axios.post(`register/${params}`, payload).catch(() => {
            error = true
        })

        isRegistering.value = false

        if (error) throw response

        user.value = response?.data.data as User
    }

    async function registerWithPhoneVerification(data: any) {
        return await axios.post('register/with-phone-verification', data)
    }

    async function verifyRegistrationCode(data: any) {
        return await axios.post('register/confirm-verification-code', data)
    }

    async function login(data: {email: string, password: string}) {
        let error = false
        isLoggingIn.value = true
        const response =  await axios.post('login', data).catch(() => {
            error = true
        })

        if (error) throw response

        user.value = response?.data.data.user as User

        await indexedDB.putRecord(
            runtimeConfig.public.sessionStoreName,
            runtimeConfig.public.sessionTokenKey,
            response?.data.data.token
        )
    }

    async function logout() {
        let error = false
        const response = await axios.post('/logout').catch(() => {
            error = true
        })

        if (!error) {
            user.value = undefined
            isLoggedIn.value = false
        }

        return response
    }

    async function sendVerificationCode(data: {type: string, payload: string}) {
        const response = await axios.post(`auth/send-verification-code`, data)
        return response.data.data;
    }

    return {user, registerWithCredentials, registerWithPhoneVerification, verifyRegistrationCode, login, logout, isLoggedIn, fetchUser, isLoggingIn, isRegistering, showLoginDialog, showRegistrationDialog, fetchSocialUser, sendVerificationCode}
})