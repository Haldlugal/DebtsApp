import React, {Fragment} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import PersonCard from './PersonCard';
import {withStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import * as types from '../../store/sagas/persons/ActionTypes';

const styles = {
    root: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: 'none'
    }
};

class PersonList extends React.Component {

    componentDidMount() {
        this.props.selectPersons();
    }

    render() {
        const {persons} = this.props;
        return (
            <Fragment>
                <Toolbar>
                    <NavLink to="/persons/create" className={this.props.classes.navLink}>
                        <Button variant="contained" size="medium" color="primary" className={this.props.classes.button}>
                            Create Person
                        </Button>
                    </NavLink>
                </Toolbar>
                <div className={this.props.classes.root}>
                    {
                        persons && persons.map(person =>{
                            return <PersonCard person={person} key={person.tid}/>
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        persons: state.persons.persons,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectPersons: () => dispatch({type: types.GET_PERSONS_REQUEST})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonList));