<template>
  <div>
    <BusinessTheme1
      v-if="Number(business.theme_id) === 1 || Number(business.theme_id) === 3"
      :theme-images="themeImages"
      :business="business"
    ></BusinessTheme1>
    <BusinessTheme2
      v-if="Number(business.theme_id) === 2"
      :theme-images="themeImages"
      :business="business"
      @sendMessage="onSendMessage"
      @showLoginDialog="onShowLoginDialog"
    ></BusinessTheme2>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex"
import BusinessTheme1 from "@/components/themes/business/BusinessTheme1"
import BusinessTheme2 from "@/components/themes/business/BusinessTheme2"
import BusinessService from "~/services/business.service";

export default {
  name: 'BusinessPage',
  components: {BusinessTheme2, BusinessTheme1},
  layout: 'secondary',
  async asyncData({store, params, $axios}) {
    await store.dispatch('business/getBusiness', params.businessId)
    await store.dispatch('reviews/getPagination', params.businessId)
    const themeImages = await (BusinessService($axios)).getThemeImages(params.businessId)
    return {
      themeImages
    }
  },
  computed: {
    ...mapGetters('business', {
      business: 'business',
    }),
  },
  methods: {
    ...mapActions('business', {
      getBusiness :'getBusiness'
    }),
    ...mapMutations('app', {
      setState: 'setState'
    }),
    async onSendMessage(messageObj) {
      if (!this.$auth.loggedIn) {
        this.$store.commit('snackbar/setSnackbar', {
          show: true,
          message: 'You must be logged in to send a message to a business',
          color: 'red'
        });

        this.onShowLoginDialog()
        return
      }
      // update message object
      messageObj.business_id = this.business.id
      messageObj.auth_level  = 'admin'
      messageObj.type = 'contact'
      messageObj.senderable_id = this.$auth.user.id
      messageObj.senderable_type = this.$auth.user.morph_class

      await (BusinessService(this.$axios)).sendMessage(messageObj)
    },
    onShowLoginDialog() {
      this.setState({key: 'showLoginDialog', value: true})
    }
  }
}
</script>

