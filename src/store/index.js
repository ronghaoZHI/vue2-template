import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import createLogger from 'vuex/dist/logger'
import { storage } from '@/utils/storage'

Vue.use(Vuex);

const USERINFO = 'USERINFO'
const LOGIN_TOKEN = 'LOGIN_TOKEN'
const COOKIE_KEY = 'KEY'

const debug = process.env.NODE_ENV !== 'production';

const store = {
    state: {
        userInfo: storage.getItem(USERINFO) || {},
        token: storage.getItem(LOGIN_TOKEN) || '',
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userInfo,
    },
    mutations: {
        ['SET_USERINFO'](state, info) {
            state.userInfo = info;
            state.token = info.loginToken;
            Cookie.set(COOKIE_KEY, info.loginToken, { path: '/' });
            storage.setItem(LOGIN_TOKEN, info.loginToken);
            storage.setItem(USERINFO, info);
        },
    },
    actions: {
        setUserInfo({ commit }, info) {
            commit('SET_USERINFO', info)
        },
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
}

export default new Vuex.Store(store)