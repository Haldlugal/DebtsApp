import React from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {Container} from "@material-ui/core";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";


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
        margin: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        width: 200,
        marginTop: 20,
        marginLeft: 20,
    },
    formControl: {
        display: "block",
        margin: 20,
        marginLeft: 20,
        width: 400,
    },
    select: {
        width:400
    },
    dateContainer: {
        width:400,
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
        marginLeft: 20,
    }
};

class DebtCreate extends React.Component {
    constructor(props) {
        super(props);
        console.log("DebtCreate");
    }

    render() {
        const id = this.props.match.params.id;
        return (
        <form className={this.props.classes.container} noValidate autoComplete="off">
            <Typography className={this.props.classes.title}>
                {typeof id !== 'undefined' ? "Edit Debt" : "Create Debt"}
            </Typography>
            <TextField
                id="outlined-name"
                label="Amount"
                className={this.props.classes.textField}
                margin="normal"
                variant="standard"
                fullWidth
            />
            <FormControl className={this.props.classes.formControl}>
                <InputLabel htmlFor="person-selector">Person</InputLabel>
                <Select
                    className={this.props.classes.select}
                    native
                    inputProps={{
                        name: 'person',
                        id: 'person-selector',
                    }}
                >
                    <option value=""/>
                    <option value={10}>Somebody</option>
                    <option value={20}>Mr. Tester</option>
                    <option value={30}>Strange Person</option>
                </Select>
            </FormControl>
            <FormControl className={this.props.classes.formControl}>
                <InputLabel htmlFor="currency-selector">Currency</InputLabel>
                <Select
                    className={this.props.classes.select}
                    native
                    inputProps={{
                        name: 'currency',
                        id: 'currency-selector',
                    }}
                >
                    <option value=""/>
                    <option value={10}>Rub</option>
                    <option value={20}>$</option>
                    <option value={30}>Eur</option>
                </Select>
            </FormControl>
            <Container className={this.props.classes.dateContainer}>
                <TextField
                    id="dateCreated"
                    label="Creation Date"
                    type="date"
                    className={this.props.classes.dateField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="dateCreated"
                    label="Payment Date"
                    type="date"
                    className={this.props.classes.dateField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Container>
            <Button variant="contained" size="medium" color="primary" className={this.props.classes.button}>
                {typeof id !== 'undefined' ? "Edit" : "Create"}
            </Button>
        </form>
        )
    }
}

export default connect()(withStyles(styles)(DebtCreate));