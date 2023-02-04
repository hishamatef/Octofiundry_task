<template>
    <td>{{ index + 1 }}</td>
    <td>{{ purchase.title }}</td>
    <td>{{ purchase.description }}</td>
    <td class="text-center">
      <strong>{{ purchase.customer }}</strong>
    </td>
    <td class="text-center">
      <router-link
        :to="{ name: 'PurchaseEdit', params: { id: purchase.id } }"
        class="btn btn-primary btn-sm"
        title="Edit Purchase"
        >
        <i class="fa fa-pencil"></i></router-link
      >
      <button class="btn btn-sm btn-danger ml-2" @click="deletePurchaseModal(purchase.id)" title="Delete Purchase">
         <i class="fa fa-trash"></i>
      </button>
    </td>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PurchaseDetail",
  props: {
    purchase: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },

  computed: { ...mapGetters(["purchaseIsDeleting", "purchaseDeletedData"]) },

  methods: {
    ...mapActions(["deletePurchase", "fetchAllPurchases"]),
    deletePurchaseModal(id) {
      this.$swal
        .fire({
          text: "Are you sure to delete the purchase ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // Put delete logic
            this.deletePurchase(id);
            this.fetchAllPurchases({
              page: 1,
            });
            this.$swal.fire({
              text: "Success, Purchase has been deleted.",
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
