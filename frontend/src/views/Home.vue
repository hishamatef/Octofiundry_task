<template>
  <div class="home">
      <purchase-list-component></purchase-list-component>
      <customer-list-component></customer-list-component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomerListComponent from '../components/customers/CustomersComponent.vue';
import PurchaseListComponent from '../components/purchases/PurchasesComponent.vue';
export default {
  components: { PurchaseListComponent,CustomerListComponent },
  name: "Home",

  computed: { ...mapGetters(["purchasesPaginatedData","customersPaginatedData"]) },

  methods: {
    ...mapActions(["fetchAllPurchases","fetchAllCustomers"]),
  },

  created() {
    this.fetchAllPurchases(1);
    this.fetchAllCustomers(1);
  },
};
</script>
