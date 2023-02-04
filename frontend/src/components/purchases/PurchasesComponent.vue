<template>
  <div class="container">
    <div class="">
      <div class="row elements_grid" v-if="!purchaseIsLoading">

        <div class="col-sm-4" v-for="(item, index) in purchasesPaginatedData.data" :key="item.id">
          <purchase-card :index="index" :purchase="item" />
        </div>
      </div>

      <div v-if="purchaseIsLoading" class="text-center mt-5 mb-5">
        Loading Purchases...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
       <div v-if="purchasesPaginatedData !== null" class="mt-2 mb-5">
            <v-pagination
              v-model="query.page"
              :pages="purchasesPaginatedData.pagination.total_pages"
              :range-size="2"
              active-color="#DCEDFF"
              @update:modelValue="getResults"
            />
        </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PurchaseCard from "./PurchaseCardComponent";
import VPagination from "vue3-pagination";

export default {
  data() {
    return {
      query: {
        page: 1,
      },
    };
  },
  components: {
    PurchaseCard,
    VPagination,
  },
  computed: { ...mapGetters(["purchaseList", "purchasesPaginatedData", "purchaseIsLoading"]) },

  methods: {
    ...mapActions(["fetchAllPurchases"]),

    getResults() {
      this.fetchAllPurchases(this.query);
    },
  },

  created() {
    this.fetchAllPurchases(this.query);
  },
};
</script>
