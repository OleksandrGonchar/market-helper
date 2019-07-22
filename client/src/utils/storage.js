const localStorageApi = {
    get: (localStorageKey) => {
        return localStorage.getItem(localStorageKey) || '';
    },
    set: (localStorageKey, value) => {
        localStorage.setItem(localStorageKey, value);
    },
    removeItem: (localStorageKey) => {
        localStorage.removeItem(localStorageKey);
    }
}

const api = {
    localStor: localStorageApi
}

export default api