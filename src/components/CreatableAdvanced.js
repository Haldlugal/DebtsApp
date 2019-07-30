import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});


export default class CreatableAdvanced extends Component {
    state = {
        isLoading: false,
        value: undefined
    };

    render() {
        console.log(this.props.value);
        return (
            <CreatableSelect
                isClearable
                isDisabled={this.props.isLoading}
                isLoading={this.props.isLoading}
                onChange={event=> this.props.handleChange(event)}
                onCreateOption={this.props.handleCreate}
                options={this.props.options}
                inputProps = {this.props.inputProps}
                defaultValue={this.props.defaultValue}
                value={this.props.value}
            />
        );
    }
}