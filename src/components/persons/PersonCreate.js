import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from 'react-redux';
import * as types from "../../store/sagas/persons/ActionTypes";
import {Redirect} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 28,
        marginTop: 20,
        marginBottom:20,
        marginLeft: 20
    },
    textField: {
        display: "block",
        width: 400,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        width: 200,
        marginTop: 20,
        marginLeft: 20,
    },
    progress: {
        margin: theme.spacing(2),
    },
}));


const PersonCreate = (props) => {
    const id =  props.match.params.id;
    const isExistingPerson = typeof id !== 'undefined';

    const dispatch = useDispatch();
    const firstName = useSelector(state => state.persons.firstName);
    const secondName = useSelector(state => state.persons.secondName);
    const fetching = useSelector(state => state.persons.fetching);
    const success = useSelector(state => state.persons.success);
    const error = useSelector(state => state.persons.error);

    const [redirectToPersons, setRedirectToPersons] = useState(false);
    const [snackBar, setSnackBar] = useState({opened: false, message: ""});
    const [person, setPerson] = useState({
        firstName:firstName,
        secondName:secondName});
    const [formMessages, setFormMessages] = useState({
        firstNameField: {
            errorStatus: false,
            message: 'First Name'
        },
        secondNameField: {
            errorStatus: false,
            message: 'Second Name'
        }
    });

    useEffect(()=>{
        dispatch({type: types.GET_PERSON_REQUEST, payload: {id: id}});
    }, []);

    useEffect (() => {
        if (error) {
            setSnackBar({opened: true, message: error.message});
        }
        else if (success && isExistingPerson) {
            setSnackBar({opened: true, message: "Edit successfully!"});
        } else if (success && !isExistingPerson) {
            setRedirectToPersons(true);
        }
    }, [success, error]);

    useEffect(() => {
        setPerson({firstName: firstName, secondName:secondName});
    }, [firstName, secondName]);

    const handleChange = (event) => {
        setPerson({...person, [event.target.id]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let firstNameField = {};
        let secondNameField = {};
        let error = false;

        if (person.firstName==='' || person.firstName===undefined){
            firstNameField = {errorStatus:true, message: 'This field is required'};
            error = true;
        } else {
            firstNameField = {errorStatus:false, message: 'First Name'};
        }

        if (person.secondName==='' || person.secondName===undefined){
            error = true;
            secondNameField = {errorStatus:true, message: 'This field is required'};
        } else {
            secondNameField = {errorStatus:false, message: 'Second Name'};
        }

        setFormMessages({firstNameField: firstNameField, secondNameField: secondNameField});
        if (!error) {
            const nothingChanged = firstName === person.firstName && secondName === person.secondName;
            if (isExistingPerson && !nothingChanged) {
                dispatch({
                    type: types.EDIT_PERSON_REQUEST,
                    payload: {firstName: person.firstName, secondName: person.secondName, id: id}
                });
            } else if (!isExistingPerson) {
                dispatch({
                    type: types.CREATE_PERSON_REQUEST,
                    payload: {firstName: person.firstName, secondName: person.secondName}
                });
            }
        }
    };

    const handleDelete = () => {
        dispatch({type: types.DELETE_PERSON_REQUEST, payload: {id: id}});
        setRedirectToPersons(true);
    };

    const handleSnackBarClose = () => {
        setSnackBar({opened: false, message: ""});
        dispatch({type: types.RESET_SUCCESS});
        dispatch({type: types.RESET_ERROR});
    };

    const classes = useStyles();

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
            {redirectToPersons? <Redirect to="/persons"/> : null}
            <Typography className={classes.title}>
                {isExistingPerson ? "Edit Person" : "Create Person"}
            </Typography>
            {fetching ? <CircularProgress className={classes.progress} color="secondary" /> : null }
            <TextField
                id="firstName"
                label={formMessages.firstNameField.message}
                error={formMessages.firstNameField.errorStatus}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={person.firstName}
                onChange={handleChange}
                fullWidth

            />
            <TextField
                id="secondName"
                label={formMessages.secondNameField.message}
                error={formMessages.secondNameField.errorStatus}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={person.secondName}
                onChange={handleChange}
                fullWidth
            />
            <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}>
                {isExistingPerson ? "Edit" : "Create"}
            </Button>
            {isExistingPerson ? <Button variant="contained" size="medium" color="primary" onClick={handleDelete} className={classes.button}> Delete Person </Button> : ''}
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
    )
};

export default PersonCreate;
