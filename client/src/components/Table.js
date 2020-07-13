import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useSelector} from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./Table.css";
import {createSelector} from 'reselect'
import {deleteStudent, fetchStudents, filterStudentsByRating, filterStudentsByName} from "../actions/StudentsActions";

const useStyles = makeStyles({
    root: {
        width: '90%'
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: 20,
    },
    checkboxes: {
        paddingLeft: 40,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 40,
        width: '100%'
    },
    search: {
        width: '80%',
        marginRight: 40
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    icon: {
        fontSize: 40,
    },
    button: {
        fontSize: 20
    },
    text: {
        marginRight: 40
    },
    item: {
        fontSize: 18
    }
});

function getFilterByName(name, students) {
    if (name === '') {
        return students;
    }
    return students.filter((student) => (student.firstName + student.lastName).toLowerCase().includes(name.toLowerCase()));
}

function getSortByRating(students, sortStatus) {
    if (!sortStatus.isDescending && !sortStatus.isAscending) {
        return students;
    }
    if (sortStatus.isDescending) {
        return students.sort((a, b) => a.rating < b.rating ? 1 : -1)
    }
    return students.sort((a, b) => a.rating > b.rating ? 1 : -1)

}

export const CurrentTable = () => {
    const classes = useStyles();

    const studentName = useSelector(
        state => state.StudentsFilterByName
    );

    let sortStatus = useSelector(
        state => state.StudentsFilterByRating
    );

    const selectStudents = createSelector(
        state => state.StudentsReducer,
        students => {
            students = getSortByRating(students, sortStatus);
            return getFilterByName(studentName, students)
        }
    );

    let students = useSelector(selectStudents);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchStudents()(dispatch);
    }, []);

    return (
        <div className={classes.root}>
            <div className={'title'}>
                <Typography className={classes.text} variant="h2" component="h2" gutterBottom>
                    Студенты
                </Typography>
                <Link to={'/create'} className={classes.link}>
                    <Button variant='contained' color="primary" className={classes.button}>
                        Создать студента
                    </Button>
                </Link>
            </div>
            <div className={'students_filter'}>
                <TextField
                    variant="outlined"
                    className={classes.search}
                    label="Введите имя студента"
                    value={studentName}
                    onChange={(e) => {
                        const value = e.target.value.toLowerCase();
                        dispatch(filterStudentsByName(value));
                    }}
                />
                <Button variant='contained' color='primary'
                        onClick={() => {
                            dispatch(filterStudentsByRating({
                                isAscending: true,
                                isDescending: false
                            }))
                        }}>
                    <ArrowUpwardIcon className={classes.icon}/>
                </Button>
                <Button variant='contained' color='primary'
                        onClick={() => {
                            dispatch(filterStudentsByRating({
                                isAscending: false,
                                isDescending: true
                            }))
                        }}>
                    <ArrowDownwardIcon className={classes.icon}/>
                </Button>
            </div>
            <Paper className={'container'}>
                <TableContainer className={classes.container} component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right" className={classes.title}>№</TableCell>
                                <TableCell align="right" className={classes.title}>Фамилия</TableCell>
                                <TableCell align="right" className={classes.title}>Имя</TableCell>
                                <TableCell align="right" className={classes.title}>Рейтинг</TableCell>
                                <TableCell align="right" className={classes.title}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className={classes.item} align="right">{student.id}</TableCell>
                                    <TableCell className={classes.item} align="right">{student.lastName}</TableCell>
                                    <TableCell className={classes.item} align="right">{student.firstName}</TableCell>
                                    <TableCell className={classes.item} align="right">{student.rating}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => deleteStudent(student.id)(dispatch)}
                                                    aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};