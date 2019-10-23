
export const validateExistance = (title, muscle, collection) => {
    for ( let element in collection) {
        if(element === muscle) {
            return  collection[element].findIndex(e => e.title === title) >= 0;
        }
    }
}