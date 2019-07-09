import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import { withStyles } from '@material-ui/styles';


const styles = {
    paper: {
        padding: 20,
        margin: 'auto',
        marginLeft: 20,
        marginRight: 20,
        marginTop:20

    },
    money: {
    display: 'flex',
    alignItems: 'center'
    },
};

class PersonCard extends React.Component {
    render() {
        return (
            <NavLink to={"/persons/edit/"+this.props.person.tid}>
                <Paper className={this.props.classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {this.props.person.first_name +" "+this.props.person.second_name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        My debt: 3 <span>R</span>
                                    </Typography>
                                    <Typography variant="body2">
                                        Their debt: 10 <span>R</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={this.props.classes.money}>
                                <Typography variant="subtitle1"><span>R</span>19.00</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </NavLink>
        );
    }
}

export default withStyles(styles)(PersonCard)