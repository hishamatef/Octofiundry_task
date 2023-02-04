<template>
    <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="d-flex container justify-content-between pl-4 pr-4">
            <router-link to="/purchases" class="navbar-brand">
                <img :src="`/images/weDevs-color-logo.png`" height="35"> | Purchases
            </router-link>
            <router-link to="/customers" class="navbar-brand">
                <img :src="`/images/weDevs-color-logo.png`" height="35"> | Customers
            </router-link>
            <div class="navbar-nav">
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link  to="/purchases" class="nav-link">
                        Purchases
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link  to="/customers" class="nav-link">
                        Customers
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/purchases/create" class="nav-link">
                        Add Purchase
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/customers/create" class="nav-link">
                        Add Customer
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn" >
                    <router-link to="/login" class="nav-link">
                        Login
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link to="/register" class="nav-link">
                        Register
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/logout" class="nav-link">
                        Logout
                    </router-link>
                </li>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",
    computed : {
        isLoggedIn : function(){ 
            return this.$store.getters.isLoggedIn
        }
    }
};
</script>
