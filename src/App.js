import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import DebtList from './components/debts/DebtList';
import Dashboard from "./components/dashboard/Dashboard";
import PersonList from "./components/persons/PersonList";
import PersonCreate from "./components/persons/PersonCreate";
import DebtCreate from "./components/debts/DebtCreate";
import SignInForm from "./components/auth/SignIn";
import SignUpForm from "./components/auth/SignUp";

class App extends React.Component{
  render() {
    return (
        <BrowserRouter>
          <AppBar color="primary" position="static">
            <Toolbar>
              <TypoGraphy variant="h5" color="inherit">
                Debts Manager
              </TypoGraphy>
            <Navbar/>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/debts" component={DebtList} />
            <Route exact path="/persons" component={PersonList} />
            <Route exact path="/signIn" component={SignInForm} />
            <Route exact path="/signUp" component={SignUpForm} />
            <Route exact path="/persons/create" component={PersonCreate}/>
            <Route path="/persons/edit/:id" component={PersonCreate}/>
            <Route exact path="/debts/create" component={DebtCreate}/>
            <Route path="/debts/edit/:id" component={DebtCreate}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
