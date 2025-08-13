<script setup lang="ts">
import SnackbarNotification from "~/components/SnackbarNotification.vue";

const authStore = useAuthStore()

defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  scrollClass: {
    type: String,
    default: 'transparent'
  }
})

const emit = defineEmits(['updateScrollClass'])

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true

  if (authStore.isLoggedIn) {
    // registerWebsocketUser()
    // getUnreadMessagesCount()
  }

  // set the scroller action
  window.onscroll = () => {
    changeColor();
  }
})

function changeColor() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    emit('updateScrollClass', 'primary app-bar-opacity')
  } else {
    emit('updateScrollClass', 'transparent')
  }
}
</script>

<template>
  <VApp class="app-container-width">
    <NavAppBar>
      <NavDesktopLinks/>
    </NavAppBar>

    <VMain>
      <NuxtPage/>
    </VMain>

    <!---Footer------->
    <NavPageFooter/>

    <!---Snackbar for ---->
    <SnackbarNotification/>

    <VDialog v-if="authStore.showLoginDialog" v-model="authStore.showLoginDialog" width="500" scrollable>
      <AuthLogin/>
    </VDialog>

    <VDialog v-model="authStore.showRegistrationDialog" width="500" scrollable>
      <AuthRegister/>
    </VDialog>

    <!--    <v-dialog v-model="showForgotPasswordDialog" width="450" scrollable>-->
    <!--      <ForgotPassword/>-->
    <!--    </v-dialog>-->
  </VApp>
</template>


<style>
body, .v-application, .v-main {
  font-family: 'Poppins', sans-serif !important;
  background-color: white;
}

.v-main {
  --v-layout-top: 0 !important;
}

.nav-btn {
  color: #FFFFFF;
}

.app-container-width {
  max-width: 1920px !important;
  margin: auto;
}

a {
  text-decoration: none;
}

.app-bar-opacity {
  opacity: 0.9;
}

.title-text {
  font-size: 100px;
  font-weight: bold;
}

.title-text-2 {
  font-size: 40px;
  font-weight: bold;
}

@media only screen and (max-width: 425px) {
  .title-text {
    font-size: 40px;
    font-weight: bold;
  }
}
</style>
