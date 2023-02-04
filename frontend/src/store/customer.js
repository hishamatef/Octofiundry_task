import axios from 'axios';

const state = () => ({
    customers                : [],
    customersPaginatedData   : null,
    customer                 : null,
    isLoading               : false,
    isCreating              : false,
    createdData             : null,
    isUpdating              : false,
    updatedData             : null,
    isDeleting              : false,
    deletedData             : null
})

const getters = {
    customerList             : state => state.customers,
    customersPaginatedData   : state => state.customersPaginatedData,
    customer                 : state => state.customer,
    customerIsLoading        : state => state.isLoading,
    customerIsCreating       : state => state.isCreating,
    customerIsUpdating       : state => state.isUpdating,
    customerCreatedData      : state => state.createdData,
    customerUpdatedData      : state => state.updatedData,
    customerIsDeleting       : state => state.isDeleting,
    customerDeletedData      : state => state.deletedData
};

const actions = {
    async fetchAllCustomers({ commit }, query = null) {
        let page    = (query !== null)?query.page:'',
            baseApi = process.env.VUE_APP_API_ENDPOINT;

        commit('customer_loading', true);
        let url = `${baseApi}customer/list?page=${page}`;

        await axios.get(url)
            .then(res => {
                const customers = res.data.data.data;
                commit('setCustomers', customers);
                const pagination = {
                    total: res.data.data.total,  
                    per_page: res.data.data.per_page, 
                    current_page: res.data.data.current_page, 
                    total_pages: res.data.data.last_page 
                }
                res.data.data.pagination = pagination;
                commit('setCustomersPaginated', res.data.data);
                commit('customer_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('customer_loading', false);
            });
    },

    async fetchMyCustomers({ commit }, query = null) {
        let page    = (query !== null)?query.page:'',
            baseApi = process.env.VUE_APP_API_ENDPOINT;

        commit('customer_loading', true);
        let url = `${baseApi}customer/list?page=${page}`;

        await axios.get(url)
            .then(res => {
                const customers = res.data.data.data;
                commit('setCustomers', customers);
                const pagination = {
                    total: res.data.data.total,  
                    per_page: res.data.data.per_page, 
                    current_page: res.data.data.current_page, 
                    total_pages: res.data.data.last_page 
                }
                res.data.data.pagination = pagination;
                commit('setCustomersPaginated', res.data.data);
                commit('customer_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('customer_loading', false);
            });
    },

    async fetchDetailCustomer({ commit }, id) {
        commit('customer_loading', true);
        await axios.get(`${process.env.VUE_APP_API_ENDPOINT}customer/show/${id}`)
            .then(res => {
                commit('setCustomerDetail', res.data.data);
                commit('customer_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('customer_loading', false);
            });
    },

    // store image
    async storeCustomer({ commit }, customer) {
        const data = new FormData();
        data.append('name', customer.name);
        commit('customer_creating', true);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}customer/add`, data)
            .then(res => {
                commit('save_new_customer', res.data.data);
                commit('customer_creating', false);
            }).catch(err => {
                console.log('error', err);
                commit('customer_creating', false);
            });
    },

    async updateCustomer({ commit }, customer) {
        const data = new FormData();
        data.append('name', customer.name);
        commit('customer_updating', true);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}customer/update/${customer.id}`, data)
            .then(res => {
                commit('update_customer', res.data.data);
                commit('customer_updating', false);
            }).catch(err => {
                console.log('error', err);
                commit('customer_updating', false);
            });
    },        


    async deleteCustomer({ commit }, id) {
        commit('customer_deleting', true);
        await axios.delete(`${process.env.VUE_APP_API_ENDPOINT}customer/delete/${id}`)
            .then(res => {
                commit('setDeleteCustomer', res.data.data.id);
                commit('customer_deleting', false);
            }).catch(err => {
                console.log('error', err);
                commit('customer_deleting', false);
        });
    },

    updateCustomerInput({ commit }, e) {
        commit('customer_entry', e);
    }
}

// mutations
const mutations = {
    setCustomers: (state, customers) => {
        state.customers = customers
    },

    setCustomersPaginated: (state, customersPaginatedData) => {
        state.customersPaginatedData = customersPaginatedData
    },

    setCustomerDetail: (state, customer) => {
        state.customer = customer
    },

    setDeleteCustomer: (state, id) => {
        state.customersPaginatedData.data.filter(x => x.id !== id);
    },

    customer_entry: (state, e) => {
        let customer = state.customer;
        customer[e.target.name] = e.target.value;
        state.customer = customer
    },

    save_new_customer: (state, customer) => {
        state.customers.unshift(customer)
        state.createdData = customer;
    },

    update_customer: (state, customer) => {
        state.customers.unshift(customer)
        state.updatedData = customer;
    },

    customer_loading(state, isLoading) {
        state.isLoading = isLoading
    },

    customer_creating(state, isCreating) {
        state.isCreating = isCreating
    },

    customer_updating(state, isUpdating) {
        state.isUpdating = isUpdating
    },

    customer_deleting(state, isDeleting) {
        state.isDeleting = isDeleting
    },

}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}