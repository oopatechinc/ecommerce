<script setup lang="ts">

import 'v-slick-carousel/style.css'
import { VSlickCarousel } from 'v-slick-carousel'
import type { Settings } from 'v-slick-carousel'

const settings: Settings = {
  slidesPerGroup: 1,
  arrows: false,
  autoplay: true,
  pauseOnHover: false,
  autoplaySpeed: 4000
}

const items = [
  {
    image: 'spa.jpg',
    title: 'Welcome to Bookisia',
    subtitle: 'Find a business. Book an appointment. Relax',
    class:'white--text'
  },
  {
    image: 'barber.jpg',
    title: 'As Easy As 1,2,3',
    subtitle: 'We make booking an appointment fun again',
    class: 'orange--text'
  },
  {
    image: 'consultant.jpg',
    title: 'Invested in Community',
    subtitle: 'We believe in helping small businesses grow',
    class: 'white--text'
  },
  {
    image: 'cooking.jpg',
    title: 'Family Time is Back',
    subtitle: 'Find a fun activity to book',
    class: 'orange--text'
  },
  {

    image: 'dance.jpg',
    title: 'Book a Fitness Class',
    subtitle: 'It\'s always a good time to get fit',
    class: 'white--text'
  },
  {
    image: 'salon.jpg',
    title: 'Look Your Best',
    subtitle: 'Treat yourself. Because you\'re worth it',
    class: 'orange--text'
  },
  {
    image: 'smile.jpg',
    title: 'A Reason to Smile',
    subtitle: 'Find a reason to smile again',
    class: 'white--text'
  },
]

</script>

<template>
  <VSlickCarousel v-bind="settings">
    <div v-for="(item,i) in items" :key="i">
      <v-img
        :src="`images/${item.image}`"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        max-height="750"
        class="img-container"
        cover
      >
        <div class="text-center content">
          <div class="text-container"><h2 class="title-text" :class="item.class">{{item.title}}</h2></div>
          <p class="sub-title-text mb-10">{{item.subtitle}}.</p>
        </div>
      </v-img>
    </div>
  </VSlickCarousel>
</template>

<style scoped>
  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    margin-top: 80px;
  }

  .title-text {
    font-size: 100px;
    font-weight: bold;
    color: #FFFFFF;
  }

  .sub-title-text {
    font-weight: bold;
    font-size: 30px;
    color: #FFFFFF;
  }

  @media only screen and (max-width: 1024px) {
    .title-text {
      font-size: 80px;
    }

    .sub-title-text {
      font-weight: bold;
      font-size: 25px;
      color: #FFFFFF;
    }
  }

  @media only screen and (max-width: 768px) {
    .content {
      margin-top: 70px;
    }
    .title-text {
      font-size: 60px;
    }
  }

  @media only screen and (max-width: 425px) {
    .content {
      margin-top: 80px;
    }

    .title-text {
      font-size: 50px;
    }
  }
</style>
