import https from 'https'
const Cookie = process.client ? require('js-cookie') : undefined;

export default function ({ $axios, redirect, store }) {

    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

    $axios.onError(error => {
        if(error.response.status === 401) {
            // If this is the first time we've retried this request then refresh the token and try again
            if(!error.config.__isRetryRequest) {
                error.config.__isRetryRequest = true;
                return $axios(error.config);
            }

            // If we already tried refreshing the token then remove token and redirect to login
            Cookie.remove('auth');
            store.commit('setAuth', null);
            redirect('/login');

        }
    });
}