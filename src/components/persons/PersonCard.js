import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";


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
}));

const PersonCard = (props) => {

    const classes = useStyles();
        return (
            <NavLink to={"/persons/edit/"+props.person.tid}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {props.person.first_name +" "+props.person.second_name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        My debt: {props.person.myDebtSummRub?props.person.myDebtSummRub*(-1)+" RUB ":""}
                                        {props.person.myDebtSummEur?props.person.myDebtSummEur*(-1)+" EUR ":""}
                                        {props.person.myDebtSummDol?props.person.myDebtSummDol*(-1)+" DOL ":""}
                                    </Typography>
                                    <Typography variant="body2">
                                        Their debt: {props.person.theirDebtSummRub?props.person.theirDebtSummRub+" RUB ":""}
                                        {props.person.theirDebtSummEur?props.person.theirDebtSummEur+" EUR ":""}
                                        {props.person.theirDebtSummDol?props.person.theirDebtSummDol+" DOL ":""}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.money}>
                                <div>
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
                </Paper>
            </NavLink>
        );

};

export default PersonCard;