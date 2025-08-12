import axios from "axios";

const ENABLE_DEBUGGER = true;
const XDEBUG_SESSION = 'XDEBUG_SESSION_START=1'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    const indexedDB = useIndexedDB()

    const api = axios.create({
        baseURL: runtimeConfig.public.baseApiUrl,
        headers: {
            'X-ORIGIN-API-KEY': runtimeConfig.public.originApiKey
        }
    })

    api.interceptors.request.use(async config => {
        if (ENABLE_DEBUGGER) {
            config.url = config.url && config.url.indexOf('?') === -1 ? `${config.url}?${XDEBUG_SESSION}` : `${config.url}&${XDEBUG_SESSION}`;
        }

        if (import.meta.client) {
            const token = await indexedDB.getRecord(
                runtimeConfig.public.sessionStoreName,
                runtimeConfig.public.sessionTokenKey
            )

            if (token !== null) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        return config;
    })

    return {
        provide: {
            axios: api,
        },
    };
});