import axios from 'axios';

const state = () => ({
    purchases                : [],
    purchasesPaginatedData   : null,
    purchase                 : null,
    isLoading               : false,
    isCreating              : false,
    createdData             : null,
    isUpdating              : false,
    updatedData             : null,
    isDeleting              : false,
    deletedData             : null
})

const getters = {
    purchaseList             : state => state.purchases,
    purchasesPaginatedData   : state => state.purchasesPaginatedData,
    purchase                 : state => state.purchase,
    purchaseIsLoading        : state => state.isLoading,
    purchaseIsCreating       : state => state.isCreating,
    purchaseIsUpdating       : state => state.isUpdating,
    purchaseCreatedData      : state => state.createdData,
    purchaseUpdatedData      : state => state.updatedData,
    purchaseIsDeleting       : state => state.isDeleting,
    purchaseDeletedData      : state => state.deletedData
};

const actions = {
    async fetchAllPurchases({ commit }, query = null) {
        let page    = (query !== null)?query.page:'',
            baseApi = process.env.VUE_APP_API_ENDPOINT;

        commit('purchase_loading', true);
        let url = `${baseApi}purchase/list?page=${page}`;

        await axios.get(url)
            .then(res => {
                const purchases = res.data.data.data;
                commit('setPurchases', purchases);
                const pagination = {
                    total: res.data.data.total,  
                    per_page: res.data.data.per_page, 
                    current_page: res.data.data.current_page, 
                    total_pages: res.data.data.last_page 
                }
                res.data.data.pagination = pagination;
                commit('setPurchasesPaginated', res.data.data);
                commit('purchase_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('purchase_loading', false);
            });
    },

    async fetchMyPurchases({ commit }, query = null) {
        let page    = (query !== null)?query.page:'',
            baseApi = process.env.VUE_APP_API_ENDPOINT;

        commit('purchase_loading', true);
        let url = `${baseApi}purchase/list?page=${page}`;

        await axios.get(url)
            .then(res => {
                const purchases = res.data.data.data;
                commit('setPurchases', purchases);
                const pagination = {
                    total: res.data.data.total,  
                    per_page: res.data.data.per_page, 
                    current_page: res.data.data.current_page, 
                    total_pages: res.data.data.last_page 
                }
                res.data.data.pagination = pagination;
                commit('setPurchasesPaginated', res.data.data);
                commit('purchase_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('purchase_loading', false);
            });
    },

    async fetchDetailPurchase({ commit }, id) {
        commit('purchase_loading', true);
        await axios.get(`${process.env.VUE_APP_API_ENDPOINT}purchase/show/${id}`)
            .then(res => {
                commit('setPurchaseDetail', res.data.data);
                commit('purchase_loading', false);
            }).catch(err => {
                console.log('error', err);
                commit('purchase_loading', false);
            });
    },

    // store image
    async storePurchase({ commit }, purchase) {
        const data = new FormData();
        if(purchase.image){
            data.append('image', purchase.image);
        }
        data.append('description', purchase.description);
        data.append('title', purchase.title);
        data.append('customer_id', purchase.customer);
        commit('purchase_creating', true);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}purchase/add`, data)
            .then(res => {
                commit('save_new_purchase', res.data.data);
                commit('purchase_creating', false);
            }).catch(err => {
                console.log('error', err);
                commit('purchase_creating', false);
            });
    },

    async updatePurchase({ commit }, purchase) {
        const data = new FormData();
        data.append('description', purchase.description);
        data.append('title', purchase.title);
        data.append('customer_id', purchase.customer);
        commit('purchase_updating', true);
        await axios.post(`${process.env.VUE_APP_API_ENDPOINT}purchase/update/${purchase.id}`, data)
            .then(res => {
                commit('update_purchase', res.data.data);
                commit('purchase_updating', false);
            }).catch(err => {
                console.log('error', err);
                commit('purchase_updating', false);
            });
    },        


    async deletePurchase({ commit }, id) {
        commit('purchase_deleting', true);
        await axios.delete(`${process.env.VUE_APP_API_ENDPOINT}purchase/delete/${id}`)
            .then(res => {
                commit('setDeletePurchase', res.data.data.id);
                commit('purchase_deleting', false);
            }).catch(err => {
                console.log('error', err);
                commit('purchase_deleting', false);
        });
    },

    updatePurchaseInput({ commit }, e) {
        commit('purchase_entry', e);
    }
}

// mutations
const mutations = {
    setPurchases: (state, purchases) => {
        state.purchases = purchases
    },

    setPurchasesPaginated: (state, purchasesPaginatedData) => {
        state.purchasesPaginatedData = purchasesPaginatedData
    },

    setPurchaseDetail: (state, purchase) => {
        state.purchase = purchase
    },

    setDeletePurchase: (state, id) => {
        state.purchasesPaginatedData.data.filter(x => x.id !== id);
    },

    purchase_entry: (state, e) => {
        let purchase = state.purchase;
        purchase[e.target.name] = e.target.value;
        state.purchase = purchase
    },

    save_new_purchase: (state, purchase) => {
        state.purchases.unshift(purchase)
        state.createdData = purchase;
    },

    update_purchase: (state, purchase) => {
        state.purchases.unshift(purchase)
        state.updatedData = purchase;
    },

    purchase_loading(state, isLoading) {
        state.isLoading = isLoading
    },

    purchase_creating(state, isCreating) {
        state.isCreating = isCreating
    },

    purchase_updating(state, isUpdating) {
        state.isUpdating = isUpdating
    },

    purchase_deleting(state, isDeleting) {
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