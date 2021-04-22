import countryList from './country-names.json';

const countrCodeName = (countryCode) => {
    return countryList.data.find(country => country.code === countryCode);
}

export {
    countrCodeName,
}