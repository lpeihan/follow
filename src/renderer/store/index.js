import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { createPersistedState } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    createLogger()
    // createSharedMutations(),
  ],
  strict: process.env.NODE_ENV !== 'production',
});
