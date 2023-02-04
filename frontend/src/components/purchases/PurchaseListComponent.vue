<template>
  <div class="container">
    <div class="row" v-if="!purchaseIsLoading">
        <div class="col-sm-12">
          <table class="table table-bordered  table-striped " style="width:100%">
              <thead>
                <tr class="text-center">
                  <th>Sl</th>
                  <th>Purchase Title</th>
                  <th>Purchase Description</th>
                  <th>Purchase Customer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in purchasesPaginatedData.data" :key="item.id">
                      <purchase-detail :index="index" :purchase="item" />
                  </tr>
              </tbody>
          </table>
    </div>

      <div v-if="purchaseIsLoading" class="text-center mt-5 mb-5">
        Loading Purchases...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Insert Pagination Part -->
    <div v-if="purchasesPaginatedData !== null" class="vertical-center mt-2 mb-5">
      <v-pagination
        v-model="query.page"
        :pages="purchasesPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PurchaseDetail from "./PurchaseListItemComponent";
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
    PurchaseDetail,
    VPagination,
  },
  computed: { ...mapGetters(["purchaseList", "purchasesPaginatedData", "purchaseIsLoading"]) },

  methods: {
    ...mapActions(["fetchMyPurchases"]),

    getResults() {
      this.fetchMyPurchases(this.query);
    },
  },

  created() {
    this.fetchMyPurchases(this.query);
  },
};
</script>
