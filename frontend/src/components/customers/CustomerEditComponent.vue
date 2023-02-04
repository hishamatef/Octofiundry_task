<template>
    <div class="container">
        <Form @submit="onSubmit" :validation-schema="schema">
            <div v-if="customerIsLoading">
                <div class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <br />
                  Fetching customer
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <div v-if="!temp_image && customer !== null && !customerIsLoading">

                            <img v-if="customer.image" :src="customer.image" class="element-image-display"  />
                            <img  src="/images/select_product.png" class="element-image-display" v-else />
                            
                        </div>
                                        
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="element-form-card">
                        <h4 class="vue-card-title ">Edit Customer</h4>
                        <div v-if="customer !== null && !customerIsLoading">
                            <input type="hidden" name="id" :value="customer.id">
                            <div class="form-group">
                                <label>Customer Name:</label>
                                <Field
                                  id="name"
                                  name="name"
                                  type="text"
                                  class="form-control"
                                  :value="customer.name"
                                  @input="updateCustomerInputAction"
                                />
                                <ErrorMessage name="name" class="text-danger" />
                              </div>
                            <div class="form-group">
                              <router-link to="/customers" class="btn btn-secondary mr-2"
                                >Cancel</router-link
                              >
                              <input
                                type="submit"
                                class="btn btn-primary"
                                value="Update"
                                v-if="!customerIsUpdating"
                              />
                              <button class="btn btn-primary" type="button" disabled v-if="customerIsUpdating">
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
    this.fetchDetailCustomer(this.id);
    
  },

  computed: { ...mapGetters(["customerIsUpdating", "customerUpdatedData", "customer", "customerIsLoading"]) },

  methods: {
    ...mapActions(["updateCustomer", "updateCustomerInput", "fetchDetailCustomer"]),
    onSubmit() {
      const { id, name } = this.customer;

        this.updateCustomer({
            id: id,
          name: name,
        });
    },
    updateCustomerInputAction(e) {
      this.updateCustomerInput(e);
    }
  },

  watch: {
    customerUpdatedData: function () {
      if (this.customerUpdatedData !== null && !this.customerIsUpdating) {
        this.$swal.fire({
          text: "Success, Customer has been updated successfully !",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Customers" });
      }
    },
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
    });

    return {
      schema,
    };
  },
};
</script>
