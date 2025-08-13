<script setup lang="ts">

const authStore = useAuthStore()
const snackbarStore = useSnackbarStore()
const validationRules = useValidationRules()
const runtimeConfig = useRuntimeConfig()


const isLoading = ref(false)
const message = ref({
  name: '',
  email: '',
  phone: '',
  body: ''
})

const formValidity = ref(null)

async function sendMessage() {
  if (formValidity.value !== true) return


  // update message object
  message.value.auth_level  = 'admin'
  message.value.type = 'contact';

  if (authStore.isLoggedIn) {
    message.value.senderable_id = authStore.user.id
    message.value.senderable_type = 'user'
  } else {
    message.value.senderable_type = 'guest'
  }

  let error = false
  isLoading.value = true
  await (BusinessService($axios)).sendMessage(message).catch(() => {
    error = true
  })
  isLoading.value = false

  if (error) {
    return snackbarStore.displayErrorMessage('Sorry we were unable to process your request. Please try again or give us a call')
  }

  snackbarStore.displaySuccessMessage('Thanks for contacting us! We will respond to your message as soon as possible!')

  // init()
}

</script>

<template>
<div>
  <v-img
    src="/images/contact.jpg"
    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
    max-height="calc(50vh)"
    class="img-container"
  >
    <div class="text-center content">
      <div class="text-container"><h2 class="title-text white--text">Contact Us</h2></div>
    </div>
  </v-img>

  <div class="section">
    <VRow>
      <VCol cols="12" md="6">
        <div class="top-row">
          <div class="top-column">
            <VAvatar color="grey lighten-3" size="100" class="mr-10">
              <VIcon size="50">mdi-map-marker</VIcon>
            </VAvatar>
            <div>
              <h3 class="py-4">Address</h3>
              {{runtimeConfig.public.contact.addressLine1}}<br>
              {{runtimeConfig.public.contact.addressLine2}}<br>
              {{runtimeConfig.public.contact.city}}, {{runtimeConfig.public.contact.locality}}, {{runtimeConfig.public.contact.addressCode}}
            </div>
          </div>
          <div class="top-column">
            <VAvatar color="grey lighten-3" size="100" class="mr-10">
              <VIcon size="50">mdi-phone</VIcon>
            </VAvatar>
            <div>
              <h3 class="py-4">Phone</h3>
              <a class="text--black" :href="`tel:${runtimeConfig.public.contact.phoneNumber}`">{{runtimeConfig.public.contact.phoneNumber}}</a>
            </div>
          </div>
          <div class="top-column">
            <VAvatar color="grey lighten-3" size="100" class="mr-10">
              <VIcon size="50">mdi-email</VIcon>
            </VAvatar>
            <div>
              <h3 class="py-4">Email</h3>
              <a class="text--black" :href="`mailto:${runtimeConfig.public.contact.email}`">{{runtimeConfig.public.contact.email}}</a>
            </div>
          </div>
        </div>
      </VCol>
      <VCol cols="12" md="6">
        <VCard elevation="1">
          <VCardTitle class="title-text-2 mb-4">Message Us</VCardTitle>

          <VCardText>
            <p>
              Ask us any questions or concerns you have. Our customer happiness team is prompt to respond!
            </p>

            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="message.name"
                  outlined label="Your Name"
                  dense
                  :rules="validationRules.genericRequiredRule('Name is required')"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="message.email"
                  outlined
                  label="Your Email"
                  dense
                  :rules="validationRules.genericRequiredRule('Email is required')"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="message.phone"
                  outlined
                  label="Your Phone Number"
                  dense
                  :rules="validationRules.genericRequiredRule('Phone number is required')"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea
                  v-model="message.body"
                  outlined
                  rows="4"
                  label="Your Message"
                  dense
                  :rules="validationRules.genericRequiredRule('Message is required')"
                />
              </VCol>
              <VCol>
                <VBtn color="primary" :loading="isLoading" @click="sendMessage">Submit</VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</div>
</template>



<style scoped>
  .section {
    padding: 100px calc(100vw - 90vw);
    background-color: #FAF6F6;
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: none;
    object-position: center top
  }

  .top-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .top-column {
    display: flex;
    flex-wrap: wrap;
    padding: 0 80px 100px;
  }

  a {
    color: black
  }
</style>
