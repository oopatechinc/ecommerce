<script setup lang="ts">

</script>

<template>
  <div class="content">
    <div class="container">
      <div class="footer-row">
        <div class="footer-column">
          <h3 class="title-text">Get to Know Us</h3>
          <div class="d-flex flex-column">
            <NuxtLink to="/about">About Us</NuxtLink>
            <NuxtLink to="/careers">Careers</NuxtLink>
            <NuxtLink to="#">Resources</NuxtLink>
          </div>
        </div>
        <div class="footer-column">
          <h3 class="title-text">Quick Links</h3>
          <div class="d-flex flex-column">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="businesses">Businesses</NuxtLink>
            <NuxtLink to="/about">About Us</NuxtLink>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </div>
        </div>
        <div class="footer-column">
          <h3 class="title-text white--text">Follow Us</h3>

          <div class="d-flex white--text mb-2">
            <v-icon color="white" class="pr-2" size="30">mdi-facebook</v-icon><span><a class="anchor link-text" href="https://facebook.com/bookisia" target="_blank">Facebook</a></span>
          </div>
          <div class="d-flex white--text mb-2">
            <v-icon color="white" class="pr-2" size="30">mdi-twitter</v-icon><span><a class="anchor link-text" href="https://twitter.com/bookisia" target="_blank">Twitter</a></span>
          </div>
          <div class="d-flex white--text mb-2">
            <v-icon color="white" class="pr-2" size="30">mdi-instagram</v-icon><span><a class="anchor link-text" href="https://www.instagram.com/bookisia" target="_blank">Instagram</a></span>
          </div>
        </div>
      </div>

      <v-divider class="divider"></v-divider>

      <div class="footer-row">
        <div class="d-flex footer-column">
          <NuxtLink to="/terms-and-conditions" class="pr-6"><p>Terms & Conditions</p></NuxtLink>
          <NuxtLink to="/privacy-policy" class="pr-8"><p>Privacy</p></NuxtLink>
        </div>
        <div class="footer-column">
          <p class="mt-3">Bookisia.com &copy; {{(new Date).getFullYear()}}. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content {
    background-color: #151515;
    color: #FFFFFF;
    padding: 60px;
  }

  ul {
    list-style-type: none;
  }

  a {
    color: #FFFFFF;
    padding: 10px 0;
  }

  a:hover {
    color: #6FABDC;
  }
  .footer-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .footer-column {
    padding: 0 40px;
  }

  .v-divider {
    background-color: #FFFFFF;
    margin: 20px 0;
  }

  .title-text {
    padding-bottom: 20px;
    font-size: 30px;
  }

  @media only screen and (max-width: 768px) {
    .footer-column {
      width: 100%;
    }
  }


</style>
