import React, {Fragment, useEffect} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import PersonCard from './PersonCard';
import {useDispatch, useSelector} from 'react-redux';
import * as types from '../../store/sagas/persons/ActionTypes';
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: 'none'
    }
}));

const PersonList = () => {

    const dispatch = useDispatch();
    const persons = useSelector(state => state.persons.persons);

    useEffect(()=>{
        dispatch({type: types.GET_PERSONS_REQUEST});
    }, []);

    const classes = useStyles();

    return (
        <Fragment>
            <Toolbar>
                <NavLink to="/persons/create" className={classes.navLink}>
                    <Button variant="contained" size="medium" color="primary" className={classes.button}>
                        Create Person
                    </Button>
                </NavLink>
            </Toolbar>
            <div className={classes.root}>
                {
                    persons && persons.map(person =>{
                        return <PersonCard person={person} key={person.tid}/>
                    })
                }
            </div>
        </Fragment>
    );

};

export default PersonList;

