import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import List from '@material-ui/core/List';
import  './Navbar.css';
import {useSelector} from "react-redux";



const Navbar = () => {

    const authenticated = useSelector(state=>state.auth.authenticated);

    return (
        <List component="nav">
            <ListItem component="div">
                {authenticated? <SignedInLinks/> : <SignedOutLinks/>}
            </ListItem>
        </List>
    )
};
export default Navbar;