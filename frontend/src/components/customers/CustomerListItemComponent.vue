<template>
    <td>{{ index + 1 }}</td>
    <td>{{ customer.name }}</td>
    <td class="text-center">
      <router-link
        :to="{ name: 'CustomerEdit', params: { id: customer.id } }"
        class="btn btn-primary btn-sm"
        title="Edit Customer"
        >
        <i class="fa fa-pencil"></i></router-link
      >
      <button class="btn btn-sm btn-danger ml-2" @click="deleteCustomerModal(customer.id)" title="Delete Customer">
         <i class="fa fa-trash"></i>
      </button>
    </td>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CustomerDetail",
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
