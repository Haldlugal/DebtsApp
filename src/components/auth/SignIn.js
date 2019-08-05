import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../store/sagas/auth/ActionTypes";

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth:400,
        marginTop: theme.spacing(5),
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    },
    textField: {
        display: "block",
        width: 400
    },
    button: {
        width: 200,
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    mySnackBar: {
        top:305,
        left:30
    },
    errorMessage: {
        marginTop: 20,
        position: 'relative',
        padding: 10,
        border: '1px solid red',
        color: 'red'
    }
}));

const SignInForm =() => {

    const dispatch = useDispatch();

    const [auth, setAuth] = useState({
        name:'',
        password:''});
    const [formMessages, setFormMessages] = useState({
        nameField: {
            errorStatus: false,
            message: 'Login'
        },
        passwordField: {
            errorStatus: false,
            message: 'Password'
        }
    });
    const [errorMessage, setErrorMessage] = useState({opened: false, message: ""});

    const error = useSelector(state => state.auth.loginError);

    useEffect (() => {
        if (error) {
            setErrorMessage({opened: true, message: error});
        } else {
            setErrorMessage({opened: false, message: ''});
        }
    }, [error]);

    const handleChange = (event) => {
        setAuth({...auth, [event.target.id]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let nameField = {};
        let passwordField = {};
        let error = false;

        if (auth.name==='' || auth.name===undefined){
            error = true;
            nameField = {errorStatus:true, message: 'This field is required'};
        } else {
            nameField = {errorStatus:false, message: 'Login'};
        }

        if (auth.password==='' || auth.password===undefined){
            error = true;
            passwordField = {errorStatus:true, message: 'This field is required'};
        } else {
            passwordField = {errorStatus:false, message: 'Password'};
        }
        setFormMessages({nameField: nameField, passwordField: passwordField});
        if (!error) {
            dispatch({type: types.LOGIN_REQUEST, payload: {name: auth.name, password: auth.password}});
        }
    };
    const classes = useStyles();
    return (
        <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                id="name"
                className={classes.textField}
                label={formMessages.nameField.message}
                error={formMessages.nameField.errorStatus}
                margin="normal"
                variant="standard"
                onChange={handleChange}
                fullWidth

            />
            <TextField
                id="password"
                className={classes.textField}
                label={formMessages.passwordField.message}
                error={formMessages.passwordField.errorStatus}
                margin="normal"
                variant="standard"
                onChange={handleChange}
                fullWidth
            />
            <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}
            >
                Sign In
            </Button>
            {errorMessage.opened? <div className={classes.errorMessage}>{errorMessage.message}</div> : ''}
        </form>
    );
};

export default SignInForm;