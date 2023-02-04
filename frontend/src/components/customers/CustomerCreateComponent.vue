<template>
  <div class="container">
        <!-- <form v-on:submit.prevent="onSaveProduct" :validation-schema="schema"> -->
        <Form @submit="onSubmit" :validation-schema="schema">
          <!-- <Form @submit="onSaveProduct" :validation-schema="schema"> -->
          <div class="row">
            <div class="col-6 ">
                <div class="form-group">
                    <div v-if="!temp_image">
                        <img src="/images/select_product.png" class="element-image-display"  />
                        
                    </div>
                </div>
            </div>
            <div class="col-6 ">
                <div class="element-form-card">
                    <h4 class="vue-card-title ">Add Customer</h4>
                    <div class="form-group">

                      <label>Customer Name:</label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="customer.name"
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
                          value="Add Customer"
                          v-if="!customerIsCreating"
                        />
                        <button class="btn btn-primary" type="button" disabled v-if="customerIsCreating">
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
      customer: {},
      temp_image: ''
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },

  computed: { ...mapGetters(["customerIsCreating", "customerCreatedData"]) },

  methods: {
    ...mapActions(["storeCustomer"]),
    onSubmit() {
        const { name } = this.customer;

        this.storeCustomer({
          name: name,
        });
    }
  },

  watch: {
    customerCreatedData: function () {
      if (this.customerCreatedData !== null && !this.customerIsCreating) {
        this.$swal.fire({
          text: "Success, Customer has been added.",
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
      name: yup.string().required().min(5),
    });

    return {
      schema
    };
  },
};
</script>
