import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from 'react-redux';
import * as types from "../../store/sagas/persons/ActionTypes";
import {Redirect} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import Transition from "react-transition-group/Transition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 28,
        marginTop: 20,
        marginBottom:20
    },
    textField: {
        display: "block",
        width: 400
    },
    button: {
        width: 150,
        marginTop: 20
    },
    container: {
        maxWidth:400,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
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
    },
    buttonPanel: {
        display: 'flex',
        justifyContent: 'space-around'
    }
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

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [redirectToPersons, setRedirectToPersons] = useState(false);
    const [errorMessage, setErrorMessage] = useState({opened: false, message: ""});
    const [successMessage, setSuccessMessage] = useState({opened: false, message: ""});
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
    }, [dispatch, id]);

    useEffect(()=>{
        if (error) {
            setErrorMessage({opened: true, message: error});
        } else {
            setErrorMessage({opened: false, message: ''});
        }
    }, [error, dispatch]);

    useEffect(()=>{
        if (success && isExistingPerson) {
            setSuccessMessage({opened: true, message: "Edit successfully!"});
        } else if (success && !isExistingPerson) {
            setRedirectToPersons(true);
            dispatch({type: types.RESET_SUCCESS});
        } else {
            setSuccessMessage({opened: false, message: ""});
        }

    }, [success, dispatch, isExistingPerson]);

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

        const personFirstNameBlank = person.firstName==='' || person.firstName===undefined;
        const personSecondNameBlank = person.secondName==='' || person.secondName===undefined;

        if (personFirstNameBlank && personSecondNameBlank) {
            if (personFirstNameBlank) {
                firstNameField = {errorStatus: true, message: 'This field is required'};
                error = true;
            } else {
                firstNameField = {errorStatus: false, message: 'First Name'};
            }
            if (personSecondNameBlank) {
                secondNameField = {errorStatus: true, message: 'This field is required'};
                error = true;
            } else {
                secondNameField = {errorStatus: false, message: 'First Name'};
            }
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

    const handleDeleteDialogOpen = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeletePerson = () => {
        dispatch({type: types.DELETE_PERSON_REQUEST, payload: {id: id}});
        setRedirectToPersons(true);
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
                variant="standard"
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
                variant="standard"
                value={person.secondName}
                onChange={handleChange}
                fullWidth
            />
            <div className={classes.buttonPanel}>
            <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}>
                {isExistingPerson ? "Edit" : "Create"}
            </Button>
            {isExistingPerson ? <Button variant="contained" size="medium" color="primary" onClick={handleDeleteDialogOpen} className={classes.button}> Delete </Button> : ''}
            </div>
            {errorMessage.opened? <div className={classes.errorMessage+' '+classes.message}>{errorMessage.message}</div> : ''}
            {successMessage.opened? <div className={classes.successMessage+' '+classes.message}>{successMessage.message}</div> : ''}

            <Dialog
                open={openDeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete person?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                       Are you sure you want to delete this person?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleDeletePerson} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    )
};

export default PersonCreate;
