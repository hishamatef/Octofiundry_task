<template>
    <div class="wedevs_element_grid_wrapper">
        <div class="wedevs_element_grid">
            <p> {{ purchase.title}}</p>
            <span class="element_price">  {{ purchase.description}}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PurchaseCard",
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
