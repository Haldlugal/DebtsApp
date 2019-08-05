import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import * as types from "../../store/sagas/auth/ActionTypes";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 28,
        marginTop: 20,
        marginBottom:20,
        marginLeft: 20
    },
    textField: {
        display: "block",
        width: 400
    },
    button: {
        width: 200,
        marginTop: 20
    },
    mySnackBar: {
        top:585,
        left:20
    },
    signUpForm: {
        maxWidth:400,
        textAlign: 'center',
        marginTop: theme.spacing(5),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    message: {
        marginTop: 20,
        position: 'relative',
        padding: 10,

    },
    errorMessage: {
        border: '1px solid red',
        color: 'red'
    },
    successMessage: {
        border: '1px solid green',
        color: 'green'
    }
}));


const SignUpForm = () => {

    const dispatch = useDispatch();
    const success = useSelector(state => state.auth.authSuccess);
    const error = useSelector(state => state.auth.authError);

    const [auth, setAuth] = useState({
        login:'',
        password:'',
        repeatPassword:'',
        email:'',
        firstName:''});

    const [formMessages, setFormMessages] = useState({
        loginField: {
            errorStatus: false,
            message: 'Login'
        },
        passwordField: {
            errorStatus: false,
            message: 'Password'
        },
        repeatPasswordField: {
            errorStatus: false,
            message: 'Repeat Password'
        },
        emailField: {
            errorStatus: false,
            message: 'Email'
        },
        firstNameField: {
            errorStatus: false,
            message: 'First Name'
        }
    });

    const [errorMessage, setErrorMessage] = useState({opened: false, message: ""});
    const [successMessage, setSuccessMessage] = useState({opened: false, message: ""});


    useEffect (() => {
        if (error) {
            setErrorMessage({opened: true, message: error});
        } else {
            setErrorMessage({opened: false, message: ''});
        }

        /*else if (success) {
            setSnackBar({opened: true, message: "User created successfully", success: true});
        }*/
    }, [error]);

    useEffect (() => {
        if (success) {
            setSuccessMessage({opened: true,  message: "User created successfully"});
        } else {
            setSuccessMessage({opened: false, message: ''});
        }
    }, [success]);

    const handleChange = (event) => {
        setAuth({...auth, [event.target.id]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let loginField = {};
        let passwordField = {};
        let repeatPasswordField = {};
        let emailField = {};
        let firstNameField = {};
        let error = false;

        if (auth.login==='' || auth.login===undefined){
            error = true;
            loginField = {errorStatus:true, message: 'Login: This field is required'};
        } else {
            loginField = {errorStatus:false, message: 'Login'};
        }

        if (auth.password==='' || auth.password===undefined){
            error = true;
            passwordField = {errorStatus:true, message: 'Password: This field is required'};
        } else {
            passwordField = {errorStatus:false, message: 'Password'};
        }

        if (auth.repeatPassword==='' || auth.repeatPassword===undefined){
            error = true;
            repeatPasswordField = {errorStatus:true, message: 'Repeat Password: This field is required'};
        } else if (!(auth.repeatPassword === auth.password)) {
            error = true;
            repeatPasswordField = {errorStatus:true, message: "Passwords don't match"};
        } else {
            repeatPasswordField = {errorStatus:false, message: 'Repeat Password'};
        }

        if (auth.email==='' || auth.email===undefined){
            error = true;
            emailField = {errorStatus:true, message: 'Email: This field is required'};
        } else if (!validate(auth.email)){
            error = true;
            emailField = {errorStatus:true, message: 'Email is not valid'};
        } else {
            emailField = {errorStatus:false, message: 'Email'};
        }

        if (auth.firstName==='' || auth.firstName===undefined){
            error = true;
            firstNameField = {errorStatus:true, message: 'First Name: This field is required'};
        } else {
            firstNameField = {errorStatus:false, message: 'First Name'};
        }

        setFormMessages({loginField: loginField, passwordField: passwordField, repeatPasswordField: repeatPasswordField, emailField: emailField, firstNameField: firstNameField});
        if (!error) {
            dispatch({type: types.SIGN_UP_REQUEST, payload: {login: auth.login, password: auth.password, email: auth.email, firstName: auth.firstName}});
        }
    };

    const classes = useStyles();
    return (
        <form noValidate autoComplete="off" className={classes.signUpForm} onSubmit={handleSubmit}>
            <TextField
                id="login"
                label={formMessages.loginField.message}
                error={formMessages.loginField.errorStatus}
                className={classes.textField}
                margin="normal"
                variant="standard"
                onChange={handleChange}
                fullWidth
            />
            <TextField
                id="password"
                label={formMessages.passwordField.message}
                error={formMessages.passwordField.errorStatus}
                className={classes.textField}
                margin="normal"
                variant="standard"
                type="password"
                onChange={handleChange}
                fullWidth
            />
            <TextField
                id="repeatPassword"
                label={formMessages.repeatPasswordField.message}
                error={formMessages.repeatPasswordField.errorStatus}
                className={classes.textField}
                margin="normal"
                variant="standard"
                type="password"
                onChange={handleChange}
                fullWidth
            />
            <TextField
                id="email"
                label={formMessages.emailField.message}
                error={formMessages.emailField.errorStatus}
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="standard"
                onChange={handleChange}
                fullWidth
            />
            <TextField
                id="firstName"
                label={formMessages.firstNameField.message}
                error={formMessages.firstNameField.errorStatus}
                className={classes.textField}
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
                className={classes.button}>
                Sign Up
            </Button>
            {errorMessage.opened? <div className={classes.errorMessage+' '+classes.message}>{errorMessage.message}</div> : ''}
            {successMessage.opened? <div className={classes.successMessage+' '+classes.message}>{successMessage.message}</div> : ''}
        </form>
    )
};

const validate = (email) => {
    // eslint-disable-next-line no-control-regex,no-useless-escape
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
};

export default SignUpForm;