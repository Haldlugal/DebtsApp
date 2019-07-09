import React from 'react';
import { withStyles } from '@material-ui/styles';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const classes = {
    title: {
        fontSize: 28,
        marginTop: 20,
        marginBottom:20,
        marginLeft: 20
    },
    textField: {
        display: "block",
        width: 400,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        width: 200,
        marginTop: 20,
        marginLeft: 20,
    }
};

class SignUpForm extends React.Component{

    render() {
        return (
            <form className={this.props.classes.container} noValidate autoComplete="off">
                <Typography className={this.props.classes.title} >
                    Sign up
                </Typography>
                <TextField
                    id="outlined-name"
                    label="Login"
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    id="outlined-repeatPassword"
                    label="Repeat Password"
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={this.props.classes.button}>
                    Sign Up
                </Button>
            </form>
        )
    }
}

export default withStyles(classes)(SignUpForm);