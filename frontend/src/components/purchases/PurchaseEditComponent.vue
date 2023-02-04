<template>
    <div class="container">
        <Form @submit="onSubmit" :validation-schema="schema">
            <div v-if="purchaseIsLoading">
                <div class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <br />
                  Fetching purchase
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <div v-if="!temp_image && purchase !== null && !purchaseIsLoading">

                            <img v-if="purchase.image" :src="purchase.image" class="element-image-display"  />
                            <img  src="/images/select_product.png" class="element-image-display" v-else />
                            
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="element-form-card">
                        <h4 class="vue-card-title ">Add Purchase</h4>
                        <div v-if="purchase !== null && !purchaseIsLoading">
                            <input type="hidden" name="id" :value="purchase.id">
                            <div class="form-group">
                                <label>Purchase Name:</label>
                                <Field
                                  id="title"
                                  name="title"
                                  type="text"
                                  class="form-control"
                                  :value="purchase.title"
                                  @input="updatePurchaseInputAction"
                                />
                                <ErrorMessage name="title" class="text-danger" />
                              </div>
                              <div class="form-group">
                                <label>Purchase Customer:</label>
                                <Field
                                  name="customer"
                                  type="number"
                                  class="form-control"
                                  :value="purchase.customer_id"
                                  @input="updatePurchaseInputAction"
                                />
                                <ErrorMessage name="customer" class="text-danger" />
                              </div>
                            <div class="form-group">
                                <label>Description:</label>
                                <Field
                                  name="description"
                                  as="textarea"
                                  class="form-control"
                                  :value="purchase.description"
                                  @input="updatePurchaseInputAction"
                                />
                                <ErrorMessage name="description" class="text-danger" />
                            </div>
                            <div class="form-group">
                              <router-link to="/purchases" class="btn btn-secondary mr-2"
                                >Cancel</router-link
                              >
                              <input
                                type="submit"
                                class="btn btn-primary"
                                value="Update"
                                v-if="!purchaseIsUpdating"
                              />
                              <button class="btn btn-primary" type="button" disabled v-if="purchaseIsUpdating">
                                <span
                                  class="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Saving...
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      id: null,
      temp_image: null,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  created: function () {
    this.id = this.$route.params.id;
    this.fetchDetailPurchase(this.id);
    
  },

  computed: { ...mapGetters(["purchaseIsUpdating", "purchaseUpdatedData", "purchase", "purchaseIsLoading"]) },

  methods: {
    ...mapActions(["updatePurchase", "updatePurchaseInput", "fetchDetailPurchase"]),
    onSubmit() {
      const { id, title, customer, description } = this.purchase;

        this.updatePurchase({
            id: id,
            title: title,
            customer: customer,
            description: description
        });
    },
    updatePurchaseInputAction(e) {
      this.updatePurchaseInput(e);
    }
  },

  watch: {
    purchaseUpdatedData: function () {
      if (this.purchaseUpdatedData !== null && !this.purchaseIsUpdating) {
        this.$swal.fire({
          text: "Success, Purchase has been updated successfully !",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Purchases" });
      }
    },
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
      customer: yup.string().required(),
      description: yup.string().required().min(5),
    });

    return {
      schema,
    };
  },
};
</script>
