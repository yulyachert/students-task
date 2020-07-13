export function StudentError(state = false, action) {
    switch (action.type){
        case "ERROR":
            return action.payload;
        default:
            return state
    }

}

export function StudentsReducer(state = [], action) {
    switch (action.type){
        case "SET_STUDENTS":
            return action.payload;
        default:
            return state
    }
}


export function StudentsFilterByRating(state = {}, action) {
    switch (action.type){
        case "FILTER_STUDENTS_BY_RATING":
            return action.payload;
        default:
            return state
    }
}

export function StudentsFilterByName(state = '', action) {
    switch (action.type){
        case "FILTER_STUDENTS_BY_NAME":
            return action.payload;
        default:
            return state
    }
}