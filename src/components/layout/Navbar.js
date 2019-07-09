import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import List from '@material-ui/core/List';
import  './Navbar.css';



const Navbar = () => {
    return (
        <List component="nav">
            <ListItem component="div">
                <SignedInLinks/>
                <SignedOutLinks/>
            </ListItem>
        </List>

    )
};
export default Navbar;