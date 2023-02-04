<template>
  <div class="container">

    <div class="">
      <div class="row elements_grid" v-if="!customerIsLoading">

        <div class="col-sm-4" v-for="(item, index) in customersPaginatedData.data" :key="item.id">
          <customer-card :index="index" :customer="item" />
        </div>
      </div>

      <div v-if="customerIsLoading" class="text-center mt-5 mb-5">
        Loading Customers...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
       <div v-if="customersPaginatedData !== null" class="mt-2 mb-5">
            <v-pagination
              v-model="query.page"
              :pages="customersPaginatedData.pagination.total_pages"
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
import CustomerCard from "./CustomerCardComponent";
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
    CustomerCard,
    VPagination,
  },
  computed: { ...mapGetters(["customerList", "customersPaginatedData", "customerIsLoading"]) },

  methods: {
    ...mapActions(["fetchAllCustomers"]),

    getResults() {
      this.fetchAllCustomers(this.query);
    },
  },

  created() {
    this.fetchAllCustomers(this.query);
  },
};
</script>
