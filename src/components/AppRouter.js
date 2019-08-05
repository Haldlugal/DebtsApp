import {NonPrivateRouter, PrivateRouter} from "../CustomRouters";
import SignInForm from "./auth/SignIn";
import SignUpForm from "./auth/SignUp";
import Dashboard from "./dashboard/Dashboard";
import PersonList from "./persons/PersonList";
import PersonCreate from "./persons/PersonCreate";
import DebtList from "./debts/DebtList";
import DebtCreate from "./debts/DebtCreate";
import Logout from "./auth/Logout";
import React from "react";
import {Switch} from 'react-router-dom';

const AppRouter = () => {
    return (
        <Switch>
            <NonPrivateRouter exact path="/signIn" component={SignInForm}/>
            <NonPrivateRouter exact path="/signUp" component={SignUpForm}/>
            <PrivateRouter exact path="/" component={Dashboard}/>
            <PrivateRouter exact path="/persons" component={PersonList}/>
            <PrivateRouter exact path="/persons/create" component={PersonCreate}/>
            <PrivateRouter exact path="/persons/edit/:id" component={PersonCreate}/>
            <PrivateRouter exact path="/debts" component={DebtList}/>
            <PrivateRouter exact path="/debts/personal/:personId" component={DebtList}/>
            <PrivateRouter exact path="/debts/create" component={DebtCreate}/>
            <PrivateRouter exact path="/debts/edit/:id" component={DebtCreate}/>
            <PrivateRouter exact path="/logout" component={Logout}/>
        </Switch>
    );
};

export default AppRouter;