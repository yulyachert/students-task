import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {Link} from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import "./AddForm.css";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    button: {
        margin: theme.spacing(1),
        width: '80%',
        marginTop: 40
    },
    input: {
        width: '80%',
        marginTop: 20,
    }
}));

async function createTask(firstName, lastName, rating) {
    const response = await axios.post('http://localhost:3000/api/students/create',
        {
            firstName: firstName,
            lastName: lastName,
            rating: rating
        });
    return response.data;
}

const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(1, 'Имя должно состоять хотя бы из одного символа')
        .max(30, 'Не должно превышать 30 символов')
        .required('Обязательное поле'),
    lastName: Yup.string()
        .min(1, 'Фамилия должна состоять хотя бы из одного символа')
        .max(30, 'Не должно превышать 30 символов')
        .required('Обязательное поле'),
    rating: Yup.number()
        .integer('Число должно быть целым')
        .min(0, 'Рейтинг не может быть отрицательным')
        .max(1000, 'Рейтинг не может превышать 1000')
        .required('Обязательное поле'),
});

export const AddForm = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={'title'}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Создать студента
                </Typography>
            </div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    rating: ''
                }}
                validationSchema={validationSchema}
                validateOnChange={false}
                onSubmit={async (values) => {
                    await createTask(values.firstName, values.lastName, values.rating);
                }}
            >
                {props => (
                    <Card>
                        <form onSubmit={props.handleSubmit}>
                            <CardContent className={'form_input'}>
                                <TextField
                                    className={classes.input}
                                    variant="outlined"
                                    label="Имя"
                                    type="text"
                                    onChange={props.handleChange}
                                    value={props.values.firstName}
                                    name="firstName"
                                />
                                {props.errors.firstName && <div>{props.errors.firstName}</div>}
                                <TextField
                                    className={classes.input}
                                    variant="outlined"
                                    label="Фамилия"
                                    type="text"
                                    onChange={props.handleChange}
                                    value={props.values.lastName}
                                    name="lastName"
                                />
                                {props.errors.lastName && <div>{props.errors.lastName}</div>}
                                <TextField
                                    className={classes.input}
                                    variant="outlined"
                                    id="standard-number"
                                    label="Рейтинг"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={props.handleChange}
                                    value={props.values.rating}
                                    name="rating"
                                />
                                {props.errors.rating && <div>{props.errors.rating}</div>}

                                <Button variant="contained" color="primary" className={classes.button} type="submit"
                                        startIcon={<SaveIcon/>}>
                                    <Link className={classes.link} to={'/'}/>
                                    Создать
                                </Button>
                            </CardContent>
                        </form>
                    </Card>
                )}
            </Formik>
        </div>
    )
};