import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../store/sagas/auth/ActionTypes";
import Snackbar from "@material-ui/core/Snackbar";


const useStyles = makeStyles(theme => ({
    container: {
        maxWidth:400,
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    textField: {
        display: "block",
        width: 400,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    button: {
        width: 200,
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
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
    const [snackBar, setSnackBar] = useState({opened: false, message: ""});

    const error = useSelector(state => state.auth.loginError);

    const handleSnackBarClose = () => {
        setSnackBar({opened: false, message: ""});
        dispatch({type: types.LOGIN_ERROR_RESET});
    };

    useEffect (() => {
        if (error) {
            setSnackBar({opened: true, message: error});
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
            nameField = {errorStatus:false, message: 'First Name'};
        }

        if (auth.password==='' || auth.password===undefined){
            error = true;
            passwordField = {errorStatus:true, message: 'This field is required'};
        } else {
            passwordField = {errorStatus:false, message: 'Second Name'};
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
                variant="outlined"
                onChange={handleChange}
                fullWidth

            />
            <TextField
                id="password"
                className={classes.textField}
                label={formMessages.passwordField.message}
                error={formMessages.passwordField.errorStatus}
                margin="normal"
                variant="outlined"
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackBar.opened}
                autoHideDuration={error ? 5000 : 1000}
                onClose={handleSnackBarClose}
                message={snackBar.message}
            />
        </form>
    );
};

export default SignInForm;