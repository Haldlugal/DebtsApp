import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    headerNavLink: {
        color: 'white',
        textDecoration: 'none',
        display: 'inline-block',
        padding:'5px 10px',
    },
    headerNavLinkActive: {
        textDecoration: 'none',
        backgroundColor: '#6F80DA',
        borderRadius: 5
    }
}));


const SignedInLinks = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className={classes.headerNavLink} activeClassName={classes.headerNavLinkActive} to="/" exact>Dashboard</NavLink>
                </TypoGraphy>
            </ListItemText>

            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className={classes.headerNavLink} activeClassName={classes.headerNavLinkActive} to="/debts/">Debts</NavLink>
                </TypoGraphy>
            </ListItemText>


            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className={classes.headerNavLink} activeClassName={classes.headerNavLinkActive} to="/persons">Persons</NavLink>
                </TypoGraphy>
            </ListItemText>


            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className={classes.headerNavLink} activeClassName={classes.headerNavLinkActive} to="/logout">Log Out </NavLink>
                </TypoGraphy>
            </ListItemText>
        </Fragment>
    )
};
export default SignedInLinks;