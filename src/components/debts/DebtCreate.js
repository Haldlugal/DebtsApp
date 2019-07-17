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

const DebtCreate = () => {

    const dispatch = useDispatch();

    const persons = useSelector(state=>state.debts.persons);
    const fetchingPersons = useSelector(state=>state.debts.fetchingPersons);

    const [debt, setDebt] = useState({
        amount:'',
        person:'',
        currency:'',
        dateCreated:'',
        dateExpires:''});

    useEffect(() => {
        dispatch({type: types.GET_ALL_PERSONS_REQUEST});
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dateCreated = new Date(debt.dateCreated);
        const dateCreatedFormatted = dateCreated.getDate() + "/" + (dateCreated.getMonth() + 1) + "/" + dateCreated.getFullYear();
        const dateExpires = new Date(debt.dateExpires);
        const dateExpiresFormatted = dateExpires.getDate() + "/" + (dateExpires.getMonth() + 1) + "/" + dateExpires.getFullYear();

        dispatch({
            type: types.CREATE_DEBT_REQUEST,
            debt: {
                amount: debt.amount,
                person:debt.person,
                currency:debt.currency,
                dateCreated:dateCreatedFormatted,
                dateExpires:dateExpiresFormatted
            }

        });
    };

    const handleChange = (event) => {
        setDebt({...debt, [event.target.id]: event.target.value});
    };

    const moment = require('moment');
    const classes = useStyles();
    if (fetchingPersons) return (<CircularProgress className={classes.progress} root={classes.progress}/>);
    else return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography className={classes.title}>
                {typeof id !== 'undefined' ? "Edit Debt" : "Create Debt"}
            </Typography>
            <TextField
                id="amount"
                label="Amount"
                className={classes.textField}
                margin="normal"
                variant="standard"
                onChange={handleChange}
                fullWidth
            />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="person-selector">Person</InputLabel>
                <Select
                    className={classes.select}
                    native
                    inputProps={{
                        name: 'person',
                        id: 'person',
                    }}
                    onChange={handleChange}
                >
                    <option value=""/>
                    {persons.map(person => (
                        <option key={person.tid} value={person.tid}>{person.first_name+" "+person.second_name}</option>
                    ))}
                </Select>

            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="currency-selector">Currency</InputLabel>
                <Select
                    className={classes.select}
                    native
                    inputProps={{
                        name: 'currency',
                        id: 'currency',
                    }}
                    onChange={handleChange}
                >
                    <option value=""/>
                    <option value={"RUB"}>Rub</option>
                    <option value={"USD"}>$</option>
                    <option value={"EUR"}>Eur</option>
                </Select>
            </FormControl>
            <Container className={classes.dateContainer}>
                <TextField
                    id="dateCreated"
                    label="Creation Date"
                    type="date"
                    className={classes.dateField}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="dateExpires"
                    label="Payment Date"
                    type="date"
                    className={classes.dateField}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Container>
            <Button type="submit" variant="contained" size="medium" color="primary" className={classes.button}>
                {typeof id !== 'undefined' ? "Edit" : "Create"}
            </Button>
        </form>);

};

export default DebtCreate;