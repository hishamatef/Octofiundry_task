<template>
    <div class="wedevs_element_grid_wrapper">
        <div class="wedevs_element_grid">
            <a href="" class="" >
                <img class="fit-image" loading="lazy" :src="customer.image" :alt="customer.title" width="150" >
            </a> 
            <p> {{ customer.description}}</p>
            <span class="element_price"> $ {{ customer.price}}</span>
            <a href="" :title="`See about ${ customer.title }`" class="text-wpuf"> See more →
            </a>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CustomerCard",
  props: {
    customer: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },

  computed: { ...mapGetters(["customerIsDeleting", "customerDeletedData"]) },

  methods: {
    ...mapActions(["deleteCustomer", "fetchAllCustomers"]),
    deleteCustomerModal(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the customer ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.deleteCustomer(id);
            this.fetchAllCustomers({
              page: 1,
            });
            this.$swal.fire({
              text: "Success, Customer has been deleted.",
              icon: "success",
              position: 'top-end',
              timer: 1000,
            });
          }
        });
    },
  },
};
</script>
