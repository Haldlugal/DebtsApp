import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

export const PrivateRouter = ({ component: Component, ...rest }) => {

    const authenticated = useSelector(state=>state.auth.authenticated);
    return <Route {...rest} render={(props) => (
        authenticated ? <Component {...props} /> : <Redirect to='/signIn' />
    )} />;
};

export const NonPrivateRouter = ({ component: Component, ...rest }) => {

    const authenticated = useSelector(state=>state.auth.authenticated);

    return <Route {...rest} render={(props) => (
        !authenticated ? <Component {...props} /> : <Redirect to='/' />
    )} />;
};

