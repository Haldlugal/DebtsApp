import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'

const SignedInLinks = () => {
    return (
        <Fragment>
            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className="headerNavLink" activeClassName="headerNavLinkActive" to="/" exact>Dashboard</NavLink>
                </TypoGraphy>
            </ListItemText>

            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className="headerNavLink" activeClassName="headerNavLinkActive" to="/debts">Debts</NavLink>
                </TypoGraphy>
            </ListItemText>


            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className="headerNavLink" activeClassName="headerNavLinkActive" to="/persons">Persons</NavLink>
                </TypoGraphy>
            </ListItemText>


            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className="headerNavLink" activeClassName="headerNavLinkActive" to="/logout">Log Out </NavLink>
                </TypoGraphy>
            </ListItemText>
        </Fragment>
    )
};
export default SignedInLinks;