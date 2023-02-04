
import { createStore, createLogger } from 'vuex';
import customer from './customer';
import purchase from './purchase';
import auth from './auth';

const debug = process.env.NODE_ENV !== 'production'

const Store = createStore({
  modules: {
    auth,
    customer,
    purchase,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default Store;