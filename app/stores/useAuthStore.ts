import type {User} from "~/types/user.type";
import type {AxiosInstance} from "axios";

export const useAuthStore = defineStore('auth', () => {
    const axios = useNuxtApp().$axios as AxiosInstance

    const user = ref<User>()
    const isLoggedIn = ref(false)

    const showLoginDialog = ref(false)
    const showRegistrationDialog = ref(false)
    const isLoggingIn = ref(false)

    function setUser(user: User) {
        user.value = user
    }

    function getUser() {
        return user.value
    }

    async function fetchUser() {
        let error = false
        const response = await axios.get('/get-user-by-token?type=user&appendConsultant=true&appendMerchantCustomer=true').catch(() => {
            error = true
        })

        if (!error) {
            isLoggedIn.value = true
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
            isLoggedIn.value = true
            user.value = response!.data.data as User
        }

        return response!.data.data
    }

    async function registerWithCredentials(data) {
        const params = '?type=user&appendConsultant=true&appendMerchantCustomer=true&appendFavoriteBusinesses'
        return await axios.post(`register/${params}`, data)
    }

    async function registerWithPhoneVerification(data: any) {
        return await axios.post('register/with-phone-verification', data)
    }

    async function verifyRegistrationCode(data: any) {
        return await axios.post('register/confirm-verification-code', data)
    }

    async function login(data: {email: string, password: string}) {
        return await axios.post('login', data)
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

    return {setUser, getUser, registerWithCredentials, registerWithPhoneVerification, verifyRegistrationCode, login, logout, isLoggedIn, fetchUser, isLoggingIn, showLoginDialog, showRegistrationDialog, fetchSocialUser, sendVerificationCode}
})