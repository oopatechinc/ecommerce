<script setup lang="ts">
import type {User} from "~/types/user.type"

const authStore = useAuthStore()
const validationRules = useValidationRules()
const snackbar = useSnackbarStore()


const firstname = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const formValidity = ref(null)

function cancel() {
  firstname.value = '';
  lastname.value = '';
  email.value = '';
  phone.value = '';
  authStore.showRegistrationDialog = false
}

async function register() {
  if (formValidity.value !== true) return

  const payload = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
    phone: phone.value
  }

  let error = false
  await authStore.registerWithCredentials(payload as User).catch(() => {
    error = true
  })

  if (error) {
    return snackbar.displayErrorMessage('Registration error')
  }

  snackbar.displaySuccessMessage('Your registration was successful! You are now logged in')
  cancel()
}
</script>

<template>
  <VCard :loading="authStore.isRegistering">
    <VCardTitle class="d-flex justify-space-between py-4 bg-primary white--text">
      <div><VImg src="/logo.svg" width="150"/></div>

      <div class="mt-3">
        <VIcon @click="cancel">mdi-close</VIcon>
      </div>
    </VCardTitle>
    <div class="px-6"><p class="mt-6 text--primary">Register</p></div>
    <VCardText>
      <VForm v-model="formValidity" validate-on="blur lazy" @submit.prevent="register">
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            v-model="firstname"
            label="Firstname" dense outlined
            :rules="validationRules.genericRequiredRule('First name is required')"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            v-model="lastname"
            label="Lastname" dense outlined
            :rules="validationRules.genericRequiredRule('Last name is required')"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            v-model="email"
            label="Email"
            dense
            outlined
            :rules="validationRules.emailRules"
          />
        </VCol>
        <VCol cols="12" md="6" class="pb-0">
          <VTextField v-model="phone" label="Phone" dense outlined/>
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            v-model="password"
            label="Password" dense outlined
            type="password"
            :rules="validationRules.loginPasswordRules"
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            v-model="confirmPassword"
            label="Confirm Password" dense outlined
            type="password"
            :rules="validationRules.loginPasswordRules"
          />
        </VCol>
      </VRow>
      </VForm>

      <VBtn color="primary" :loading="isRegistering" block class="mt-4" @click="register">Sign Up</VBtn>
      <p class="py-2">
        By signing up on Bookisia, you agree to our <NuxtLink to="/terms-and-conditions">Terms and Conditions</NuxtLink>
        and our <NuxtLink to="privacy-policy"> Privacy Policy</NuxtLink>.
      </p>

    </VCardText>
    <VCardActions class="elevation-2">
      <VSpacer/>
      <span class="member-text pr-0">Already a member?</span>
      <VBtn text color="primary" class="text-capitalize pl-0"  @click="authStore.showLoginDialog = true">Login</VBtn>
    </VCardActions>
  </VCard>
</template>

