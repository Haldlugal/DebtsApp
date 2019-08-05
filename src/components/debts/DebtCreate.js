import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from 'react-select';
import {Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDispatch, useSelector} from 'react-redux';
import * as types from '../../store/sagas/debts/ActionTypes';
import * as personTypes from  '../../store/sagas/persons/ActionTypes';
import {Redirect} from "react-router-dom";
import {currencies} from '../../helpers/Currencies';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Transition from "react-transition-group/Transition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import CreatableAdvanced from "../CreatableAdvanced";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";



const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 28,
            marginTop: 20,
            marginBottom:20,
            marginLeft: 20
    },
    progress: {
        margin: theme.spacing(4),
        position: 'absolute',
        left: '50%',
        top: '40%',
        marginRight: 20
    },
    textField: {
        display: "block",
        width: 400,
        '& input': {
            paddingLeft: 8
        },
        '& label' : {
            paddingLeft: 8
        }
    },
    button: {
        width: 150,
        marginTop: 20
    },
    formControl: {
        display: "block",
        width: 400,
    },
    select: {
        width:400,
        marginTop: 15,
        marginBottom: 15,
        padding: 0
    },
    singleSelect:{
        width:400,
        marginTop: 15,
        marginBottom: 15,
    },
    dateContainer: {
        width:400,
        display: "flex",
        justifyContent: "space-between",
        padding: 0,

    },
    datepicker: {
        maxWidth: 175,
        '& input': {
            paddingLeft: 8
        }
    },
    mySnackBar: {
        top:600,
        left:20
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
    },
    ownership: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    smallError: {
        fontSize: 12,
        lineHeight: '13px'
    }
}));

const currencySelectStyles = {
    control: styles => ({...styles, backgroundColor: 'white', border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.42)', borderRadius: 0}),
};
const DebtCreate = (props) => {
    const id =  props.match.params.id;
    const isExisting = typeof id !== 'undefined';

    const dispatch = useDispatch();

    const persons = useSelector(state=>state.debts.persons);
    const fetchingPersons = useSelector(state=>state.debts.fetching);
    const debtReceived = useSelector(state=>state.debts.debt);
    const success = useSelector(state=>state.debts.success);
    const error = useSelector(state=>state.debts.error);
    const debtDeleted = useSelector(state=>state.debts.debtDeleted);
    const creatingPerson = useSelector(state=>state.persons.creating);
    const lastPersonCreated = useSelector(state=>state.persons.lastPersonCreatedId);

    const [personsToSelect, setPersonsToSelect] = React.useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [redirectToDebts, setRedirectToDebts] = useState({redirect: false, ownership: 'my'});
    const [errorMessage, setErrorMessage] = useState({opened: false, message: ""});
    const [successMessage, setSuccessMessage] = useState({opened: false, message: ""});
    const [debt, setDebt] = useState({
        amount:'',
        person:'',
        currency:'',
        ownership: 'my'
    });
    const [dateCreated, handleDateCreated] = useState(new Date());
    const [payDate, handlePayDate] = useState(new Date());

    const [formMessages, setFormMessages] = useState({
        amountField: {
            errorStatus: false,
            message: 'Amount'
        },
        personField: {
            errorStatus: false,
            message: 'Person'
        },
        currencyField: {
            errorStatus: false,
            message: 'Currency'
        },
        creationDateField: {
            errorStatus: false,
            message: 'Creation Date'
        },
        paymentDateField: {
            errorStatus: false,
            message: 'Payment Date'
        },
    });

    useEffect(()=>{
        if (error) {
            setErrorMessage({opened: true, message: error});
        } else {
            setErrorMessage({opened: false, message: ''});
        }
    }, [error]);

    useEffect(()=>{
        if (success && isExisting) {
            setSuccessMessage({opened: true, message: "Edit successfully!"});
            setRedirectToDebts({redirect: true, ownership: debt.ownership});
        } else if (success && !isExisting) {
            setRedirectToDebts({redirect: true, ownership: debt.ownership});
            dispatch({type: types.RESET_SUCCESS});
        } else {
            setSuccessMessage({opened: false, message: ""});
        }

    }, [debt.ownership, success, dispatch, isExisting]);

    useEffect(()=>{
        if (debtDeleted) {
            setRedirectToDebts({redirect: true, ownership: debt.ownership});
            dispatch({type: types.RESET_DEBT_DELETED});
        }
    },[debt.ownership, debtDeleted,dispatch]);

    useEffect(()=> {
        dispatch({type: types.GET_ALL_PERSONS_REQUEST});
        if (isExisting) {
           dispatch({type: types.GET_DEBT_REQUEST, payload: id});
       }
    },[dispatch,id, isExisting]);

    useEffect(() => {
        if (isExisting) {
            setDebt({
                amount: debtReceived.Debt<0?Number(debtReceived.Debt*(-1)).toFixed(2):Number(debtReceived.Debt).toFixed(2),
                person: {value: debtReceived.person_id, label: debtReceived.person_name},
                currency: debtReceived.Currency,
                ownership: debtReceived.Debt*1 < 0? 'their' :'my'
            });
            handleDateCreated(debtReceived.CreationDate);
            handlePayDate(debtReceived.ExpirationDate);
        }
    }, [debtReceived, isExisting]);

    useEffect(() => {
        const personsToSelect = persons.map(person => {
            return {
                value: person.tid,
                label: person.first_name + " " + person.second_name
            }
        });
        setPersonsToSelect(personsToSelect);
        if (lastPersonCreated) {
            const personToSelect = personsToSelect.filter(person=>{
                return person.value === lastPersonCreated.toString();
            });
            setDebt({...debt, person: personToSelect[0]});
        }
        dispatch({type: personTypes.CREATE_PERSON_RESET});
    }, [persons]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let amountField = {};
        let personField = {};
        let currencyField = {};
        let creationDateField = {};
        let paymentDateField = {};
        let error = false;

        if (debt.amount===''){
            amountField = {errorStatus:true, message: 'Amount is blank'};
            error = true;
        } else {
            amountField = {errorStatus:false, message: 'Amount'};
        }

        if (debt.person===''){
            personField = {errorStatus:true, message: 'Person is blank'};
            error = true;
        } else {
            personField = {errorStatus:false, message: 'Person'};
        }

        if (debt.currency===''){
            currencyField = {errorStatus:true, message: 'Currency is blank'};
            error = true;
        } else {
            currencyField = {errorStatus:false, message: 'Currency'};
        }

        if (dateCreated===null){
            creationDateField = {errorStatus:true, message: 'Creation Date is blank'};
            error = true;
        } else {
            creationDateField = {errorStatus:false, message: 'Creation Date'};
        }

        if (payDate===null){
            paymentDateField = {errorStatus:true, message: 'Payment Date is blank'};
            error = true;
        } else {
            paymentDateField = {errorStatus:false, message: 'Payment Date'};
        }

        if (moment(dateCreated).format('MM/DD/YYYY') >  moment(payDate).format('MM/DD/YYYY')) {
            paymentDateField = {errorStatus:true, message: 'Creation date is more than Payment date'};
            error = true;
        }
        console.log(debt.person);

        setFormMessages({amountField: amountField, personField: personField, currencyField: currencyField, creationDateField: creationDateField, paymentDateField: paymentDateField});

        if (!error) {
            if (isExisting) {
                dispatch({
                    type: types.EDIT_DEBT_REQUEST,
                    debt: {
                        id: id,
                        amount: debt.ownership === 'their'? debt.amount*(-1) : debt.amount,
                        person: debt.person.value,
                        currency: debt.currency,
                        dateCreated: moment(dateCreated).format('MM/DD/YYYY'),
                        dateExpires: moment(payDate).format('MM/DD/YYYY')
                    }
                });
            } else if (!isExisting) {
                dispatch({
                    type: types.CREATE_DEBT_REQUEST,
                    debt: {
                        amount: debt.ownership === 'their'? debt.amount*(-1) : debt.amount,
                        person: debt.person.value,
                        currency: debt.currency,
                        dateCreated: moment(dateCreated).format('MM/DD/YYYY'),
                        dateExpires: moment(payDate).format('MM/DD/YYYY')
                    }
                });
            }
        }
    };
    const handleChange = (event) => {
        if (event.target.id === 'amount' && isNaN(event.target.value)) {
            return false;
        }
        if (event.target.id === 'amount' && event.target.value < 0) {
            event.target.value = event.target.value * (-1);
        }

        setDebt({...debt, [event.target.id]: event.target.value});
    };

    const handlePersonChange = (event) => {
        if (event){
            setDebt({...debt, person: event});
        }
        else {
            setDebt({...debt, person: ''});
        }
    };

    const handleCurrencyChange = (event) => {
        console.log(event.value);
        setDebt({...debt, currency:event.value});
    };

    const handleOwnershipChange = (event) => {
        setDebt({...debt, ownership: event.target.value});
    };


    const handlePersonCreate = (inputValue) => {
        const inputSplitted = inputValue.split(" ");
        const personToCreate = {
            firstName: inputSplitted[0],
            secondName: inputSplitted[1] ? inputSplitted[1] : ''
        };

        const checkUniqueName = persons.filter(person=>{
            return person.name === personToCreate.firstName + " " + personToCreate.secondName;
        });

        if (checkUniqueName.length===0) {
            dispatch({
                type: personTypes.CREATE_PERSON_REQUEST,
                payload: {firstName: personToCreate.firstName, secondName: personToCreate.secondName, fromDebt: true}
            });
        } else console.log("such name already exists!");
    };

    const handleDeleteDialogOpen = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteDebt = () => {
        dispatch({type: types.DELETE_DEBT_REQUEST, payload: {id: id}});
        setRedirectToDebts({redirect: true, ownership: debt.ownership});
    };

    const currenciesForSelect = [{value: currencies.russian, label: currencies.russian}, {value: currencies.european, label: currencies.european}, {value: currencies.american, label: currencies.american}];
    const currencySelected = currenciesForSelect.filter((currency)=>{
         return currency.value===debt.currency;
    });
    const classes = useStyles();
    if (fetchingPersons) return (<CircularProgress className={classes.progress} root={classes.progress}/>);
    else if (redirectToDebts.redirect===true) {
        if (redirectToDebts.ownership === 'their') return <Redirect to="/debts"/>;
        else return <Redirect to="/debts"/>;
    }
    else return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography className={classes.title}>
                {typeof id !== 'undefined' ? "Edit Debt" : "Create Debt"}
            </Typography>
            <TextField
                id="amount"
                label={formMessages.amountField.message}
                error={formMessages.amountField.errorStatus}
                className={classes.textField}
                margin="normal"
                variant="standard"
                value={debt.amount}
                onChange={handleChange}
                fullWidth
            />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="currency">{formMessages.currencyField.message}</InputLabel>
                <Select
                    id="currency"
                    onChange={handleCurrencyChange}
                    className={classes.singleSelect}
                    defaultValue={currencySelected[0]}
                    name="color"
                    options={currenciesForSelect}
                    placeholder={formMessages.currencyField.errorStatus?<Typography color="error">{formMessages.currencyField.message}</Typography>:formMessages.currencyField.message}
                    styles={currencySelectStyles}
                />

            </FormControl>
            <div className={classes.select}>
                <CreatableAdvanced
                    error = {formMessages.personField.errorStatus}
                    handleChange={handlePersonChange}
                    handleCreate={handlePersonCreate}
                    isDisabled={creatingPerson}
                    isLoading={creatingPerson}
                    placeholder={formMessages.personField.message}
                    inputProps={{
                        name: 'person',
                        id: 'person',
                    }}
                    options={personsToSelect}
                    value={debt.person}
                />
            </div>
            <Container className={classes.dateContainer}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid container className={classes.grid} justify="space-between">
                        <KeyboardDatePicker
                            className={classes.datepicker}
                            margin="normal"
                            id="dateCreated"
                            label={formMessages.creationDateField.errorStatus? <Typography className={classes.smallError}>{formMessages.creationDateField.message}</Typography>: formMessages.creationDateField.message}
                            error={formMessages.creationDateField.errorStatus}
                            value={dateCreated}
                            onChange={handleDateCreated}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            className={classes.datepicker}
                            margin="normal"
                            id="dateExpires"
                            label={formMessages.paymentDateField.errorStatus? <Typography className={classes.smallError}>{formMessages.paymentDateField.message}</Typography>: formMessages.paymentDateField.message}
                            error={formMessages.paymentDateField.errorStatus}
                            value={payDate}
                            onChange={handlePayDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </Container>
            <RadioGroup aria-label="debt_owner" className={classes.ownership} name="ownership" value={debt.ownership} onChange={handleOwnershipChange} row>
                <FormControlLabel
                    value="my"
                    control={<Radio color="primary" />}
                    label="I am owed"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="their"
                    control={<Radio color="primary" />}
                    label="I owe"
                    labelPlacement="end"
                />
            </RadioGroup>
            <div className={classes.buttonPanel}>
                <Button type="submit" variant="contained" size="medium" color="primary" className={classes.button}>
                    {typeof id !== 'undefined' ? "Edit" : "Create"}
                </Button>
                {isExisting ? <Button variant="contained" size="medium" color="primary" onClick={handleDeleteDialogOpen} className={classes.button}> Delete Debt </Button> : ''}
            </div>
            <Dialog
                open={openDeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete debt?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this debt?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteDebt} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            {errorMessage.opened? <div className={classes.errorMessage+' '+classes.message}>{errorMessage.message}</div> : ''}
            {successMessage.opened? <div className={classes.successMessage+' '+classes.message}>{successMessage.message}</div> : ''}
        </form>);

};
export default DebtCreate;