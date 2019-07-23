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
                                        My debt: {this.props.person.myDebtSummRub?this.props.person.myDebtSummRub*(-1)+" RUB ":""}
                                        {this.props.person.myDebtSummEur?this.props.person.myDebtSummEur*(-1)+" EUR ":""}
                                        {this.props.person.myDebtSummDol?this.props.person.myDebtSummDol*(-1)+" DOL ":""}
                                    </Typography>
                                    <Typography variant="body2">
                                        Their debt: {this.props.person.theirDebtSummRub?this.props.person.theirDebtSummRub+" RUB ":""}
                                        {this.props.person.theirDebtSummEur?this.props.person.theirDebtSummEur+" EUR ":""}
                                        {this.props.person.theirDebtSummDol?this.props.person.theirDebtSummDol+" DOL ":""}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={this.props.classes.money}>
                                <div>
                                    <Typography variant="subtitle1">
                                        {(this.props.person.myDebtSummRub+this.props.person.theirDebtSummRub)?this.props.person.myDebtSummRub+this.props.person.theirDebtSummRub:0}
                                        <span> RUB </span>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {(this.props.person.myDebtSummEur+this.props.person.theirDebtSummEur)?this.props.person.myDebtSummEur+this.props.person.theirDebtSummEur:0}
                                        <span> EUR </span>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {(this.props.person.myDebtSummDol+this.props.person.theirDebtSummDol)?this.props.person.myDebtSummDol+this.props.person.theirDebtSummDol:0}
                                        <span> DOL </span>
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </NavLink>
        );
    }
}

export default withStyles(styles)(PersonCard)