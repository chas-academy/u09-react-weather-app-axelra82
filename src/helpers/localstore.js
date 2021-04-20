// Reusable local storage item name
const localStorageItem = 'u09owm_axelra82';
// Default data for unit and saved locations
const defaultData = {
    unit: 'metric',
    locations: [],
};

const setLocal = (data) => {
    if(typeof data === 'object'){
        localStorage.setItem(localStorageItem, JSON.stringify(data));
    }
    return;
}

const getLocal = () => {
    const hasLocal = localStorage.getItem(localStorageItem);
    // Make sure we have localStorage data
    // If not, set default data and run again
    if(hasLocal){
        return JSON.parse(hasLocal);
    }else{
        setLocal(defaultData);
        getLocal();
    }
}

export {
    setLocal,
    getLocal,
}