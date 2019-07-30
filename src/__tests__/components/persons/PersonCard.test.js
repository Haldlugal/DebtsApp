import renderer from "react-test-renderer";
import React from "react";
import PersonCard from "../../../components/persons/PersonCard";
import {MemoryRouter} from "react-router-dom";


const defaultProps = {
    person: {
        Author_id: "62",
        first_name: "Ulix",
        name: "Ulix Turner",
        second_name: "Turner",
        tid: "72",
    }
};


describe('PersonCard', () => {
    test('Person Edit snapshot', () => {
        const container = renderer.create(<MemoryRouter><PersonCard {...defaultProps}/></MemoryRouter>).toJSON();
        expect(container).toMatchSnapshot();
    })});