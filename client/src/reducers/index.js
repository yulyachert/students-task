import {combineReducers} from 'redux';
import {
    StudentError,
    StudentsFilterByName,
    StudentsReducer,
    StudentsFilterByRating
} from "./StudentsReducers";


const allReducers = combineReducers({
    StudentError: StudentError,
    StudentsReducer: StudentsReducer,
    StudentsFilterByName: StudentsFilterByName,
    StudentsFilterByRating: StudentsFilterByRating
});

export default allReducers