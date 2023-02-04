<template>
    <div class="wedevs_element_grid_wrapper">
        <div class="wedevs_element_grid">
            <p> {{ customer.name}}</p>
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
