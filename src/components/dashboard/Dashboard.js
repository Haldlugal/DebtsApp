import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";


const useStyles = makeStyles({
    title: {
        fontSize: 28,
        marginTop: 20,
        marginBottom:20
    },
    dashboardContainer: {
        marginLeft:30
    }
});

export default function Dashboard()  {
    const classes= useStyles();
    return (
    <Container className={classes.dashboardContainer}>
        <Typography className={classes.title} >
            Statistics
        </Typography>
        <div>I am owed: <span>250</span>R</div>
        <div>I owe: <span>100</span>R</div>
    </Container>
    )
}