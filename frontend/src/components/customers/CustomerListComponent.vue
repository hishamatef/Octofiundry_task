<template>
  <div class="container">
    <div class="row" v-if="!customerIsLoading">
        <div class="col-sm-12">
          <table class="table table-bordered  table-striped " style="width:100%">
              <thead>
                <tr class="text-center">
                  <th>Sl</th>
                  <th>Item Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in customersPaginatedData.data" :key="item.id">
                      <customer-detail :index="index" :customer="item" />
                  </tr>
              </tbody>
          </table>
    </div>

      <div v-if="customerIsLoading" class="text-center mt-5 mb-5">
        Loading Customers...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Insert Pagination Part -->
    <div v-if="customersPaginatedData !== null" class="vertical-center mt-2 mb-5">
      <v-pagination
        v-model="query.page"
        :pages="customersPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomerDetail from "./CustomerListItemComponent";
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
    CustomerDetail,
    VPagination,
  },
  computed: { ...mapGetters(["customerList", "customersPaginatedData", "customerIsLoading"]) },

  methods: {
    ...mapActions(["fetchMyCustomers"]),

    getResults() {
      this.fetchMyCustomers(this.query);
    },
  },

  created() {
    this.fetchMyCustomers(this.query);
  },
};
</script>
