import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            auth: null
        }),
        mutations: {
            setAuth(state, payload) {
                state.auth = payload;
            }
        },
        actions: {
            nuxtServerInit({ commit }, { req }) {
                let auth = null
                if (req.headers.cookie) {
                    const parsed = cookieparser.parse(req.headers.cookie);
                    try {
                        auth = JSON.parse(parsed.auth)
                        $axios.setToken(auth.access_token, 'Bearer');
                    } catch (err) {
                        // No valid cookie found
                    }
                }
                commit('setAuth', auth)
            }
        }
    })
}

export default createStore;