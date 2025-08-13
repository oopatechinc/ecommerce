<script setup lang="ts">
const coreValues = [
  {
    title: 'Transparency',
    icon: 'mdi-shield',
    text: 'We will always be transparent in our dealings with our users. This applies to payment charges, user data information provided to us. We value your trust.'
  },
  {
    title: 'Reliability',
    icon: 'mdi-handshake',
    text: 'Our users place their trust in our platform and as such it\'s reliability is important to us. We are constantly working to create the best user experience for our users'
  },
  {
    title: 'Empowerment',
    icon: 'mdi-weight-lifter',
    text: 'We believe in empowering small businesses to achieve their full potential. Here at Bookisia, we are dedicated to building tools and providing resources that will help small businesses grow.'
  },
]
</script>

<template>
<div>
  <VImg
    src="/images/about.jpg"
    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
    max-height="calc(50vh)"
    class="img-container"
  >
    <div class="text-center content">
      <div class="text-container"><h2 class="title-text white--text">About Us</h2></div>
    </div>
  </VImg>

  <div class="section">
    <div class="text-center">
      <h1 class="mb-10 grey--text">Our Core Values</h1>
    </div>

    <VRow>
      <VCol v-for="(value, i) in coreValues" :key="i" cols="12" md="4">
        <VCard min-height="150">
          <VCardText>
            <div class="d-flex py-2">
              <h3 class="pr-2">{{value.title}}</h3>
              <v-icon class="pb-2">{{value.icon}}</v-icon>
            </div>
            <p>{{value.text}}</p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <div class="section bottom">
    <div>
      <VRow>
        <VCol cols="12" md="6">
          <div class="mb-8">
            <h1 class="mb-4">The Business of Great Services</h1>
            <p class="subtitle-text">Here at Bookisia, we take pride in offering outstanding services to all our users. It is our promise to provide the smoothest process of booking a service with any our partner businesses. We want to become the default place to go and find any business in any area of your choice. Our promise is to never compromise in providing the best platforms for our users and businesses.</p>
          </div>
          <div>
            <h1 class="mb-4">Our Vision for the Future</h1>
            <p class="subtitle-text">We envision a world where any kind of service is available at the click of a button. We work in partnership with unique small businesses to bring unique services to our users. Our passion is enhancing the experiences of our users through the services our businesses provide.</p>

          </div>
        </VCol>
        <VCol cols="12" md="6">
          <VImg
            src="/images/about-bottom.jpg"
            max-height="450"
            top
          />
        </VCol>
      </VRow>
    </div>
  </div>
</div>
</template>

<style scoped>
  .section {
    padding: 100px calc(100vw - 90vw);
  }

  .bottom {
    background-color: #faf6f6;
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
