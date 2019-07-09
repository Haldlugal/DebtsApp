import React, {Fragment} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {NavLink} from 'react-router-dom';
import DebtCard from './DebtCard';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: "none"
    }
}));

const DebtList = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <Toolbar>
                <NavLink to="/debts/create" className={classes.navLink}>
                    <Button variant="contained" size="medium" color="primary" className={classes.button} >
                        Create Debt
                    </Button>
                </NavLink>
            </Toolbar>
            <div className={classes.root}>
                <DebtCard/>
                <DebtCard/>
                <DebtCard/>
            </div>
        </Fragment>
    );
};

export default DebtList;