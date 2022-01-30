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
export const listOfExperienceCenters = (key) => {
    let experienceCenters = {
        "OYO": ["Town Planning Complex, by Sumal Foods, Ring Road, Ibadan", "Suite 5, Kamal memorial plaze, former iyalode complex, opposite funcktionals clothing, bodija - UI road, UI Ibadan.", "No 76 Opposite Arisekola Mosque Iwo Road Ibadan.", "NNPC Mega Station, Opposite Zenith Bank, Star Light, Ogbomosho, Oyo State."],
        "ONDO": ["No 22 Oyemekun Road by Cathedral Junction Akure"],
        "KWARA": ["190, Ibrahim Taiwo Road(Upper Taiwo), Opposite Primo Pizza / Chicken Republic, close to new Wema Bank, Ilorin.", "No 1 Umar Audi road,Fate road, Tanke GRA, besides Hotels Mirabilis. Ilorin."],
        "OGUN": ["Abeokuka 62, Tinubu Street, Ita Eko, Abeokuta, Ogun State", "Abeokuka FUNAAB Alumni Building , Federal University of Agric (FUNAAB) Abeokuta, Ogun State", " Sango Otta 3, Abeokuta – Lagos Expressway, Sango Ota, Opp. Sango Bridge"]
    }
    if (experienceCenters[key] != undefined && experienceCenters[key] != undefined)
        return experienceCenters[key]
    return []
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