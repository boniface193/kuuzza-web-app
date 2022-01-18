export const searchKeyInObject = (value, object) => {
    for (let key in object) {
        if (object[key] === value) {
            return {
                key: key,
                status: true
            };
        }
    }
    return { key: null, status: false }
}
export const search = (nameKey, myArray) => {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].types[0] === nameKey) {
            return myArray[i];
        }
    }
}
export const setItemPerPage = (itemPerPage, per_page, from_page) => {
    let page = null;
    if (itemPerPage > per_page) {
        let range = Math.round(
            (from_page - 1) / per_page
        );
        if (range < 0.5) {
            page = range + 1;
            return page;
        } else {
            page = range;
            return page;
        }
    } else {
        page = Math.round(
            (from_page - 1) / itemPerPage + 1
        );
        return page
    }
}