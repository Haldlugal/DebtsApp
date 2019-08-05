import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Transition from "react-transition-group/Transition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import * as types from "../../store/sagas/persons/ActionTypes";
import {useDispatch} from "react-redux";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20,
        margin: 'auto',
        marginLeft: 20,
        marginRight: 20,
        marginTop:20

    },
    money: {
    display: 'flex',
    alignItems: 'center'
    },
    balanceTitle: {
        display: 'inline-block',
        marginBottom: 10,
        borderBottom: '1px solid black'
    },
    balance: {
        width: 100
    },
    buttonContainer:{
        marginTop: 10
    },
    button: {
        marginRight: 15,
        zIndex: 1000
    },
    navLink: {
        textDecoration: "none",
        color: 'black'
    },
}));



const PersonCard = (props) => {

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const dispatch = useDispatch();

    const handleDeleteDialogOpen = () => {
        setOpenDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeletePerson = () => {
        dispatch({type: types.DELETE_PERSON_REQUEST, payload: {id: props.person.tid}});
    };


    const classes = useStyles();
        return (
                <Paper className={classes.paper}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <NavLink to={"/debts/personal/"+props.person.tid} className={classes.navLink}>
                                        <Typography gutterBottom variant="subtitle1">
                                            {props.person.first_name +" "+props.person.second_name}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            I owe: {props.person.myDebtSummRub?props.person.myDebtSummRub*(-1)+" RUB ":""}
                                            {props.person.myDebtSummEur?props.person.myDebtSummEur*(-1)+" EUR ":""}
                                            {props.person.myDebtSummDol?props.person.myDebtSummDol*(-1)+" DOL ":""}
                                        </Typography>
                                        <Typography variant="body2">
                                            I am owned: {props.person.theirDebtSummRub?props.person.theirDebtSummRub+" RUB ":""}
                                            {props.person.theirDebtSummEur?props.person.theirDebtSummEur+" EUR ":""}
                                            {props.person.theirDebtSummDol?props.person.theirDebtSummDol+" DOL ":""}
                                        </Typography>
                                    </NavLink>
                                    <div className={classes.buttonContainer}>
                                        <NavLink to={"/persons/edit/"+props.person.tid}>
                                            <Button variant="contained" size="small" color="primary" className={classes.button}>
                                                Edit
                                            </Button>
                                        </NavLink>
                                        <Button elevation={8} variant="contained" size="small" color="primary" onClick={handleDeleteDialogOpen} className={classes.button}>
                                            Delete
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.money}>
                                <div className={classes.balance}>
                                    <div className={classes.balanceTitle}>BALANCE:</div>
                                    <Typography variant="subtitle1">
                                        {(props.person.myDebtSummRub+props.person.theirDebtSummRub)?props.person.myDebtSummRub+props.person.theirDebtSummRub:0}
                                        <span> RUB </span>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {(props.person.myDebtSummEur+props.person.theirDebtSummEur)?props.person.myDebtSummEur+props.person.theirDebtSummEur:0}
                                        <span> EUR </span>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {(props.person.myDebtSummDol+props.person.theirDebtSummDol)?props.person.myDebtSummDol+props.person.theirDebtSummDol:0}
                                        <span> DOL </span>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                <Dialog
                    open={openDeleteDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Delete "+ props.person.first_name +" "+props.person.second_name +" ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this person?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeletePerson} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                </Paper>



        );

};

export default PersonCard;