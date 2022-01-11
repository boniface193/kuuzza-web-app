export const searchKeyInObject = (value, object) => {
    for (let key in object) {
        if (object[key] === value) {
            return {
                key: key,
                status: true
            };
        }
    }
    return {key: null, status: false }
}
export const search = (nameKey, myArray) => {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].types[0] === nameKey) {
            return myArray[i];
        }
    }
}