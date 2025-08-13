<script setup lang="ts">
import type {User} from "~/types/user.type";
import  type {AxiosInstance} from "axios";

const axios = useNuxtApp().$axios as AxiosInstance
const {emailRules, loginPasswordRules} = useValidationRules()
const indexedDB = useIndexedDB()
const runtimeConfig = useRuntimeConfig()
const router = useRouter()


const authStore = useAuthStore()
const snackbar = useSnackbarStore()

const email = ref('')
const password = ref('')
const formValidity = ref(null)

async function login() {
  if (formValidity.value !== true) return

  let error = false
  authStore.login({email: email.value, password: password.value}).catch(() => {
    error = true
  })

  if (error) {
    return snackbar.displayErrorMessage('Login error')
  }

  //registerWebsocketUser()

  reset()
}

function reset() {
  email.value = ''
  password.value = ''
  authStore.showLoginDialog = false
}

async function socialLogin(provider: string) {
  // store url for redirect after login
  indexedDB.putRecord(runtimeConfig.public.sessionStoreName, 'preLoginUrl', router.currentRoute.value.fullPath)

  const response = await axios.get(`login/${provider}`)
  window.location.href = response.data
}
</script>

<template>
  <VCard :loading="authStore.isLoggingIn" rounded>
    <VCardTitle class="py-4 bg-primary white--text">
      <div class="d-flex justify-space-between">
        <div>
          <VImg src="/logo.svg" width="150" />
        </div>

        <div class="mt-2">
          <VIcon @click="reset">mdi-close</VIcon>
        </div>
      </div>
    </VCardTitle>
    <VCardText>
      <div class="my-4">
<!--        <div class="mb-2">-->
<!--          <v-btn color="primary" block @click="socialLogin('facebook')">-->
<!--            <v-icon class="pr-4">mdi-facebook</v-icon>-->
<!--            Login with Facebook-->
<!--          </v-btn>-->
<!--        </div>-->
        <div>
          <VBtn color="error" block @click="socialLogin('google')">
            <VIcon class="pr-8">mdi-google</VIcon>
            Login with Google
          </VBtn>
        </div>
      </div>

      <div class="separator">or</div>

      <VForm v-model="formValidity" validate-on="blur lazy" @submit.prevent="login">
      <VRow>
        <VCol cols="12" class="pb-0 pt-6">
          <VTextField
            v-model="email"
            label="Email"
            dense
            outlined
            :rules="emailRules"
          />
        </VCol>
        <VCol cols="12" class="py-0">
          <VTextField
            v-model="password"
            label="Password"
            dense
            outlined
            type="password"
            :rules="loginPasswordRules"
          />
        </VCol>
      </VRow>
      </VForm>

      <VRow>
       <VCol class="d-flex justify-space-between pt-0">
         <v-spacer></v-spacer>
        <a @click.prevent="showForgotPasswordDialog">Forgot Password?</a>
       </VCol>
      </VRow>

      <VBtn
        block
        color="primary"
        class="mt-4 mb-2"
        :loading="authStore.isLoggingIn" @click="login"
      >Login</VBtn>
    </VCardText>
    <VCardActions class="elevation-2">
      <v-spacer></v-spacer>
      <span class="member-text">Not a member?</span>
      <VBtn text color="primary" class="px-0 text-capitalize"  @click="showRegistrationDialog">Sign Up</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped>
.member-text {
  font-size: medium;
  font-weight: normal;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  margin: 20px 0;
}

.separator:not(:empty)::before {
  margin-right: .25em;
}

.separator:not(:empty)::after {
  margin-left: .25em;
}
</style>
