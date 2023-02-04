import { createApp } from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const app = createApp()
app.use(Vuex)


export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post(`${process.env.VUE_APP_API_ENDPOINT}auth/login`, user)
                .then(resp => {
                    const token = resp.data.data.access_token
                    const user = resp.data.data.user
                    localStorage.setItem('token', token)
                    // Add the following line:
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('auth_success', token, user)
                    resolve(resp)
                    router.push({name: 'Home'})
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post(`${process.env.VUE_APP_API_ENDPOINT}auth/register`, user)
                .then(resp => {
                    const token = resp.data.data.access_token
                    const user = resp.data.data.user
                    localStorage.setItem('token', token)
                    // Add the following line:
                    axios.defaults.headers.common['Authorization'] = 'bearer' +token;
                    commit('auth_success', token, user)
                    resolve(resp)
                    router.push({name: 'Home'})
                })
                .catch(err => {
                    if(typeof err.response.data.errors  != 'undefined') {
                        commit('auth_error', err.response.data.errors)
                    }
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                console.log(reject)
                console.log('luck')
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
                router.push({name: 'Home'})
            })
        }

    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
}