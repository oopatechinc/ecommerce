import {openDB} from "idb";

const SESSIONS_STORE_NAME = 'sessions'
const SESSIONS_TOKEN_KEY = 'session-token'

export const useIndexedDB = () => {
        const config = useRuntimeConfig()

        async function createDatabaseAndStore(storeName: string) {
            return await openDB(config.public.indexedDBName, 1, {
                upgrade: (db) => {
                    // Create a store of objects
                    db.createObjectStore(storeName);
                },
            })
        }

        // Using put as PUT instead of ADD because it does not throw errors if
        // key already exists. It just updates existing value of key
        async function putRecord(storeName: string, key: string, value: string) {
            const db = await createDatabaseAndStore(storeName)
            await db.put(storeName, value, key)
        }

        async function getRecord(storeName: string, key: string) {
            const db = await createDatabaseAndStore(storeName)
            return await db.get(storeName, key)
        }

    return {
        putRecord,
        getRecord,
    }
}