<script setup lang="ts">
const authStore = useAuthStore()
// export default {
//   name: "NavigationDrawer",
//   data() {
//     return {
//       group: null
//     }
//   },
//   computed: {
//     showSideMenu: {
//       get() {
//         return this.$store.getters['app/showSideMenu']
//       },
//       set(val) {
//         if (val === this.showSideMenu) return
//         this.setState({key: 'showSideMenu', value: val})
//       }
//     },
//     joinWebsite() {
//       return process.env.VUE_APP_JOIN_URL
//     }
//   },
//   methods: {
//     ...mapMutations('app', {
//       setState: 'setState'
//     }),
//     async logout() {
//       await this.$auth.logout()
//     }
//   }
// }
</script>

<template>
  <VNavigationDrawer v-model="showSideMenu" absolute temporary color="primary" dark>
    <v-list-item>
      <v-list-item-title class="text-h6">
        <a class="logo d-flex align-center" @click="$router.push('/')">
          <v-img
              alt="Bookisia Logo"
              class="shrink mr-2"
              src="/logo.svg"
              transition="scale-transition"
              width="140"
          />
        </a>
      </v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item v-if="authStore.isLoggedIn" two-line>
      <v-list-item-action start>
        <v-img :src="authStore.user.image_url" />
      </v-list-item-action>

      <v-list-item-action end>
        <v-list-item-title>{{authStore.user.full_name}}</v-list-item-title>
        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
      </v-list-item-action>
    </v-list-item>

    <v-divider />

<!--    <v-list nav dense>-->
<!--      <v-list-item-group-->
<!--          v-model="group"-->
<!--          active-class="grey lighten-1"-->
<!--      >-->
<!--        <div v-if="!$auth.loggedIn">-->
<!--          <v-btn :href="$config.joinUrl" rounded class="mb-2" elevation="2" light>Add Your Business</v-btn>-->

<!--          <NuxtLink to="/">-->
<!--            <v-list-item href="/">-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-home</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title>Home</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </NuxtLink>-->

<!--          <NuxtLink to="/businesses">-->
<!--            <v-list-item>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-store-marker</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title>Businesses</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </NuxtLink>-->
<!--        </div>-->

<!--        <div v-else>-->
<!--          <NuxtLink to="/messages">-->
<!--            <v-list-item>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-email</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title>My Messages</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </NuxtLink>-->

<!--          <NuxtLink to="/appointments">-->
<!--            <v-list-item>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-calendar-check</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title>My Appointments</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </NuxtLink>-->

<!--          <NuxtLink to="/account">-->
<!--            <v-list-item>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-account</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title>Account</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </NuxtLink>-->
<!--        </div>-->

<!--        <div>-->
<!--          <NuxtLink to="/about">-->
<!--            <v-list-item>-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-information</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title>About Us</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </NuxtLink>-->

<!--          <NuxtLink to="/contact">-->
<!--            <v-list-item href="/contact">-->
<!--              <v-list-item-icon>-->
<!--                <v-icon>mdi-email</v-icon>-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title>Contact</v-list-item-title>-->
<!--            </v-list-item>-->
<!--          </NuxtLink>-->
<!--        </div>-->
<!--        <v-divider></v-divider>-->

<!--        <div v-if="!$auth.loggedIn">-->
<!--          <v-list-item @click="setState({key: 'showRegistrationDialog', value: true})">-->
<!--            <v-list-item-icon>-->
<!--              <v-icon>mdi-account-plus</v-icon>-->
<!--            </v-list-item-icon>-->
<!--            <v-list-item-title>Register</v-list-item-title>-->
<!--          </v-list-item>-->

<!--          <v-list-item @click="setState({key: 'showLoginDialog', value: true})">-->
<!--            <v-list-item-icon>-->
<!--              <v-icon>mdi-login</v-icon>-->
<!--            </v-list-item-icon>-->
<!--            <v-list-item-title>Login</v-list-item-title>-->
<!--          </v-list-item>-->
<!--        </div>-->

<!--        <div v-else class="error lighten-1 rounded mt-2 theme&#45;&#45;dark">-->
<!--          <v-list-item @click="logout">-->
<!--            <v-list-item-icon>-->
<!--              <v-icon>mdi-logout</v-icon>-->
<!--            </v-list-item-icon>-->
<!--            <v-list-item-title>Logout</v-list-item-title>-->
<!--          </v-list-item>-->
<!--        </div>-->
<!--      </v-list-item-group>-->
<!--    </v-list>-->

    <template #append>
      <v-divider />
      <div class="pa-2">
        <v-btn block>
          Logout
        </v-btn>
      </div>
    </template>
  </VNavigationDrawer>
</template>

