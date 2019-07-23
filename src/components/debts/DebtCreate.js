import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDispatch, useSelector} from 'react-redux';
import * as types from '../../store/sagas/debts/ActionTypes';
import {Redirect} from "react-router-dom";
import {currencies} from '../../helpers/Currencies';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";
import moment from "moment";

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
            margin: 20,
            marginLeft: 20,
            marginRight: 20,
    },
    button: {
        width: 200,
            marginTop: 20,
            marginLeft: 20,
    },
    formControl: {
        display: "block",
            margin: 20,
            marginLeft: 20,
            width: 400,
    },
    select: {
        width:400
    },
    dateContainer: {
        width:400,
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
        marginLeft: 20,
    },
    progress: {
    }
}));

const DebtCreate = (props) => {
    const id =  props.match.params.id;
    const isExisting = typeof id !== 'undefined';

    const dispatch = useDispatch();

    const persons = useSelector(state=>state.debts.persons);
    const fetchingPersons = useSelector(state=>state.debts.fetchingPersons);
    const debtReceived = useSelector(state=>state.debts.debt);

    const [redirectToDebts, setRedirectToDebts] = useState(false);
    const [debt, setDebt] = useState({
        amount:'',
        person:'',
        currency:''
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

    useEffect(()=> {
       if (isExisting) {
           dispatch({type: types.GET_DEBT_REQUEST, payload: id});
       }
    },[]);

    useEffect(() => {
        dispatch({type: types.GET_ALL_PERSONS_REQUEST});
    }, []);

    useEffect(() => {
        if (isExisting) {
            setDebt({
                amount: debtReceived.Debt,
                person: debtReceived.person_id,
                currency: debtReceived.Currency
            });
            handleDateCreated(debtReceived.CreationDate);
            handlePayDate(debtReceived.ExpirationDate);
        }
    }, [debtReceived]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let amountField = {};
        let personField = {};
        let currencyField = {};
        let creationDateField = {};
        let paymentDateField = {};
        let error = false;

        if (debt.amount==='' || debt.amount===undefined){
            amountField = {errorStatus:true, message: 'This field is required'};
            error = true;
        } else {
            amountField = {errorStatus:false, message: 'Amount'};
        }

        if (debt.person==='' || debt.person===undefined){
            personField = {errorStatus:true, message: 'This field is required'};
            error = true;
        } else {
            personField = {errorStatus:false, message: 'Person'};
        }

        if (debt.currency==='' || debt.currency===undefined){
            currencyField = {errorStatus:true, message: 'This field is required'};
            error = true;
        } else {
            currencyField = {errorStatus:false, message: 'Currency'};
        }

        if (dateCreated==='' || dateCreated===undefined){
            creationDateField = {errorStatus:true, message: 'This field is required'};
            error = true;
        } else {
            creationDateField = {errorStatus:false, message: 'Creation Date'};
        }

        if (payDate==='' || payDate===undefined){
            paymentDateField = {errorStatus:true, message: 'This field is required'};
            error = true;
        } else {
            paymentDateField = {errorStatus:false, message: 'Payment Date'};
        }

        setFormMessages({amountField: amountField, personField: personField, currencyField: currencyField, creationDateField: creationDateField, paymentDateField: paymentDateField});

        if (!error) {
            if (isExisting) {
                dispatch({
                    type: types.EDIT_DEBT_REQUEST,
                    debt: {
                        id: id,
                        amount: debt.amount,
                        person: debt.person,
                        currency: debt.currency,
                        dateCreated: moment(dateCreated).format('MM/DD/YYYY'),
                        dateExpires: moment(payDate).format('MM/DD/YYYY')
                    }
                });
            } else if (!isExisting) {
                dispatch({
                    type: types.CREATE_DEBT_REQUEST,
                    debt: {
                        amount: debt.amount,
                        person: debt.person,
                        currency: debt.currency,
                        dateCreated: moment(dateCreated).format('MM/DD/YYYY'),
                        dateExpires: moment(payDate).format('MM/DD/YYYY')
                    }
                });
            }
        }
    };
    const handleChange = (event) => {
        setDebt({...debt, [event.target.id]: event.target.value});
    };

    const handleDelete = () => {
        dispatch({type: types.DELETE_DEBT_REQUEST, payload: {id: id}});
        setRedirectToDebts(true);
    };

    const classes = useStyles();
    if (fetchingPersons) return (<CircularProgress className={classes.progress} root={classes.progress}/>);
    else return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
            {redirectToDebts? <Redirect to="/debts"/> : null}
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
                <InputLabel htmlFor="person">{formMessages.personField.message}</InputLabel>
                <Select
                    className={classes.select}
                    native
                    inputProps={{
                        name: 'person',
                        id: 'person',
                    }}
                    onChange={handleChange}
                    value={debt.person}
                >
                    <option  value=""/>
                    {persons.map(person => {
                        return <option key={person.tid} value={person.tid}>{person.first_name + " " + person.second_name}</option>
                    })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="currency-selector">{formMessages.currencyField.message}</InputLabel>
                <Select
                    className={classes.select}
                    native
                    inputProps={{
                        name: 'currency',
                        id: 'currency',
                    }}
                    value={debt.currency}
                    onChange={handleChange}
                >
                    <option  value=""/>
                    <option key={currencies.russian} value={currencies.russian}>{currencies.russian}</option>
                    <option key={currencies.european} value={currencies.european}>{currencies.european}</option>
                    <option key={currencies.american} value={currencies.american}>{currencies.american}</option>

                </Select>
            </FormControl>
            <Container className={classes.dateContainer}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid container className={classes.grid} justify="space-between">
                        <KeyboardDatePicker
                            margin="normal"
                            id="dateCreated"
                            label={formMessages.creationDateField.message}
                            error={formMessages.creationDateField.errorStatus}
                            value={dateCreated}
                            onChange={handleDateCreated}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="dateExpires"
                            label={formMessages.paymentDateField.message}
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
            <Button type="submit" variant="contained" size="medium" color="primary" className={classes.button}>
                {typeof id !== 'undefined' ? "Edit" : "Create"}
            </Button>
            {isExisting ? <Button variant="contained" size="medium" color="primary" onClick={handleDelete} className={classes.button}> Delete Debt </Button> : ''}
        </form>);

};
export default DebtCreate;