// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      stripePubKey: process.env.STRIPE_PUBLISHABLE_KEY,
      baseApiUrl: process.env.API_BASE_URL,
      indexedDBName: process.env.INDEXED_DB_NAME,
      originApiKey: process.env.ORIGIN_API_KEY,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      clientBaseUrl: process.env.CLIENT_BASE_URL,
      sessionStoreName: process.env.SESSION_STORE_NAME,
      sessionTokenKey: process.env.SESSION_TOKEN_KEY,
      contact: {
        phoneNumber: process.env.CONTACT_PHONE_NUMBER,
        email: process.env.CONTACT_EMAIL,
        addressLine1: process.env.CONTACT_ADDRESS_LINE_1,
        addressLine2: process.env.CONTACT_ADDRESS_LINE_2,
        city: process.env.CONTACT_CITY,
        locality: process.env.CONTACT_LOCALITY,
        addressCode: process.env.CONTACT_ADDRESS_CODE,
      }
    }
  },
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module', '@pinia/nuxt', '@nuxtjs/i18n'],
  i18n: {
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en-US",
        iso: "en-US",
        name: "English(US)",
        file: "en-US.json"
      },
      {
        code: "fr-CA",
        iso: "fr-CA",
        name: "French(CA)",
        file: "fr-CA.json"
      }
    ],
    defaultLocale: "en-US"
  }
})