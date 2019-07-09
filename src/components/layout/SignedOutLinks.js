import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'


const SignedOutLinks = () => {
    return (
        <Fragment >
            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className="headerNavLink" activeClassName="headerNavLinkActive" to="/signUp">SignUp</NavLink>
                </TypoGraphy>
            </ListItemText>
            <ListItemText inset>
                <TypoGraphy color="inherit" variant="subtitle1">
                    <NavLink className="headerNavLink" activeClassName="headerNavLinkActive" to="/signIn">Login</NavLink>
                </TypoGraphy>
            </ListItemText>
        </Fragment>
    )
}
export default SignedOutLinks;