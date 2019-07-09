import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop:theme.spacing(2)

    },
    money: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const DebtCard = () => {
    const classes = useStyles();
    return(
        <NavLink to="/debts/edit/33">
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Polykarp Polykarpovich
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Taken at: 9 april 2018
                                </Typography>
                                <Typography variant="body2">
                                    Deadline: 31 december 2020
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.money}>
                            <Typography variant="subtitle1"><span>$</span>19.00</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </NavLink>
    )
}

export default DebtCard