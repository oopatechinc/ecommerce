<script setup lang="ts">

const display = useDisplay()
//
// const show = ref(false)
// const model =  ref('tab-1')
// const select = ref('')
// function columns() {
//   if (display.smAndDown.value) {
//     return 1
//   } else if (display.mdAndDown.value) {
//     return 2
//   } else if (display.lgAndDown.value) {
//     return 2
//   } else {
//     return 4
//   }
// }
</script>

<template>
  <div>
    <VTabs
        v-model="model"
        centered
        slider-color="primary"
        height="60"
        class="elevation-1"
    >
      <VRow v-if="display.mdAndUp.value">
        <VCol cols="12" sm="5" md="3">
          <VSelect
              v-model="tagFilter"
              :items="tags"
              label="Filter By Services"
              item-text="name"
              item-value="id"
              multiple
              outlined
              dense
              class="mt-4"
              @change="getPagination"
          >
            <template #selection="{ item, index }">
              <span v-if="index === 0">{{ item.name }}</span>
              <span
                  v-if="index === 1"
                  class="grey--text text-caption pl-2"
              >
                  (+{{ tagFilter.length - 1 }} others)
                </span>
            </template>
          </VSelect>
        </VCol>
        <!--          <v-col cols="12" sm="5" md="3" xl="2">-->
        <!--            <v-combobox-->
        <!--                v-model="select"-->
        <!--                :items="cities"-->
        <!--                label="Filter By City"-->
        <!--                multiple-->
        <!--                chips-->
        <!--                outlined-->
        <!--                dense-->
        <!--                class="mt-4"-->
        <!--            ></v-combobox>-->
        <!--          </v-col>-->
      </VRow>
      <v-tab href="#tab-1">
        All Businesses
      </v-tab>
      <v-tab href="#tab-2">
        Favorites
      </v-tab>
    </VTabs>
  </div>

<!--  <v-tabs-items v-model="model" class="mt-4">-->
<!--    <v-tab-item value="tab-1">-->
<!--      <v-card light tile>-->
<!--        <v-card-text class="card-body px-1">-->
<!--          <div v-if="isLoadingPagination">-->
<!--            <v-row v-for="i in 2" :key="i" class="mb-4">-->
<!--              <v-col v-for="j in columns" :key="j">-->
<!--                <v-skeleton-loader-->
<!--                    class="mx-auto"-->
<!--                    type="image, card-heading, list-item-three-line, button"-->
<!--                ></v-skeleton-loader>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </div>-->

<!--          <v-row v-else>-->
<!--            <v-col v-for="(business, i) in businesses" :key="i" cols="12" sm="6" md="4" lg="3">-->
<!--              <v-hover v-slot="{hover}" open-delay="200" class="mx-auto">-->
<!--                <HomeBusinessCard :business="business" :index="i" :hover="hover"/>-->
<!--              </v-hover>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-card-text>-->
<!--        <v-card-actions class="elevation-2 pa-4">-->
<!--          &lt;!&ndash;            <Paginator store="businesses" />&ndash;&gt;-->
<!--        </v-card-actions>-->
<!--      </v-card>-->
<!--    </v-tab-item>-->

<!--    <v-tab-item value="tab-2">-->
<!--      <v-card>-->
<!--        <v-card-text class="card-body">-->
<!--          <p v-if="!$auth.loggedIn" class="no-fav-text">You are currently not signed in. Login now to view your favorite businesses </p>-->
<!--          <p v-else-if="$auth.user.favorite_businesses.length === 0" class="no-fav-text">You do not currently have any favorite businesses.</p>-->

<!--          <v-row v-else>-->
<!--            <v-col v-for="(favorite, i) in $auth.user.favorite_businesses" :key="i" cols="12" sm="6" md="4" lg="3">-->
<!--              <HomeBusinessCard :business="getBusinessById(favorite.business.id)" :index="i"/>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
<!--    </v-tab-item>-->
<!--  </v-tabs-items>-->
</template>

<style scoped>
.page-container {
  margin-top: 100px;
  background-color: white;
}
.card-body {
  height: calc(100vh - 250px);
  overflow-y: auto;
}

.no-fav-text {
  font-size: 15px;
}
</style>
