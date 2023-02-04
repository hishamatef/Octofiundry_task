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
                    <h4 class="vue-card-title ">Add Purchase</h4>
                    <div class="form-group">

                      <label>Purchase Name:</label>
                      <Field
                        id="title"
                        name="title"
                        type="text"
                        class="form-control"
                        v-model="purchase.title"
                      />
                      <ErrorMessage name="title" class="text-danger" />
                    </div>
                    <div class="form-group">

                      <label>Purchase Customer:</label>
                      <Field
                        name="customer"
                        type="number"
                        class="form-control"
                        v-model="purchase.customer"
                      />
                      <ErrorMessage name="customer" class="text-danger" />
                    </div>
                    <div class="form-group">

                      <label>Description:</label>
                      <Field
                        name="description"
                        as="textarea"
                        class="form-control"
                        v-model="purchase.description"
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
                          value="Add Purchase"
                          v-if="!purchaseIsCreating"
                        />
                        <button class="btn btn-primary" type="button" disabled v-if="purchaseIsCreating">
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
      purchase: {},
      temp_image: ''
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },

  computed: { ...mapGetters(["purchaseIsCreating", "purchaseCreatedData"]) },

  methods: {
    ...mapActions(["storePurchase"]),
    onSubmit() {
        const { title, customer, description } = this.purchase;

        this.storePurchase({
            title: title,
          customer: customer,
            description: description
        });
    }
  },

  watch: {
    purchaseCreatedData: function () {
      if (this.purchaseCreatedData !== null && !this.purchaseIsCreating) {
        this.$swal.fire({
          text: "Success, Purchase has been added.",
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
      schema
    };
  },
};
</script>
