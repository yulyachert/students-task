import axios from "axios";

export function studentsError(error) {
    return {
        type: 'ERROR',
        payload: error
    };
}

export function setStudents(tasks) {
    return {
        type: "SET_STUDENTS",
        payload: tasks
    }
}

export function filterStudentsByRating(sortStatus) {
    return {
        type: "FILTER_STUDENTS_BY_RATING",
        payload: sortStatus
    }
}

export function filterStudentsByName(name) {
    return {
        type: "FILTER_STUDENTS_BY_NAME",
        payload: name
    }
}

export function fetchStudents() {
    return dispatch => {
        axios.get('http://localhost:3000/api/students')
            .then((students) => {
                dispatch(setStudents(students.data));
            })
            .catch(() => studentsError(true));
    }
}

export function deleteStudent(id) {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/students/${id}`)
            .then(() => fetchStudents()(dispatch));
    }
}