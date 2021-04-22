const roundFloor = (num) => {
    return Math.floor(num);
}

const twoDecimal = (num) => {
    return Math.floor(num * 100) / 100;
}

export {
    roundFloor,
    twoDecimal
}