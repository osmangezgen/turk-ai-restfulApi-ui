import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
    state: {
        user: null,
        settings: {
            verticalMenu: true,
            darkMode: false,
        },
    },
    mutations: {
        setUser(state, user){
            state.user = user;
        },
        logoutUser(state){
            state.user = null;
        },
        verticalMenuToggle(state){
            state.settings.verticalMenu = !state.settings.verticalMenu;
        },
    },
    getters: {
        _isAuthenticated: state => state.user !== null,
        _getCurrentUser(state){
            const user = state.user;
            return user;
        },
        _getSettings(state){
            const settings = state.settings;
            return settings;
        }
    },
    plugins: [
        createPersistedState({
          storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
          }
        })
      ]
});
