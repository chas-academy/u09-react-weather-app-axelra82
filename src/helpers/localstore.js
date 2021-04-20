const localStorageItem = 'u09owm_axelra82';

const setLocal = (data) => {
    if(typeof data === 'object'){
        localStorage.setItem(localStorageItem, data);
    }
    return;
}

const getLocal = () => {
    return localStorage.getItem(localStorageItem);
}

export {
    setLocal,
    getLocal,
}