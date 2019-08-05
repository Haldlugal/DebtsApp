import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import Typography from "@material-ui/core/Typography";


const colourStyles = {
    control: styles => ({...styles, backgroundColor: 'white', border: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.42)'}),
    input: styles => ({ ...styles}),
    placeholder: (styles) => ({...styles})
};

export default class CreatableAdvanced extends Component {
    render() {
        return (
            <CreatableSelect
                classNamePrefix="react_select"
                styles={colourStyles}
                title={'test'}
                isClearable
                isDisabled={this.props.isLoading}
                isLoading={this.props.isLoading}
                onChange={event=> this.props.handleChange(event)}
                onCreateOption={this.props.handleCreate}
                options={this.props.options}
                inputProps = {this.props.inputProps}
                value={this.props.value}
                placeholder={this.props.error?<Typography color="error">{this.props.placeholder}</Typography>:this.props.placeholder}
            />
        );
    }
}