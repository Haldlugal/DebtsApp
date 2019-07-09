import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/styles';


const styles = {
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


class SignInForm extends React.Component  {

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    render() {
        return (
            <form
                className={this.props.classes.container}
                noValidate
                autoComplete="off"
                onSubmit={this.handleSubmit}
            >
                <Typography className={this.props.classes.title}>
                    Sign in
                </Typography>
                <TextField
                    id="outlined-name"
                    label="Login"
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth

                />
                <TextField
                    id="outlined-password"
                    label="Password"
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={this.props.classes.button}
                >
                    Sign In
                </Button>
            </form>
        )
    }
}

export default withStyles(styles)(SignInForm);