
import renderer from "react-test-renderer";
import React from "react";
import DebtCard from "../../../components/debts/DebtCard";
import {MemoryRouter} from "react-router-dom";


const defaultProps = {
    debt: {
        Currency: "USD",
        Debt: "200.00",
        Name: "Lucius Mathewson",
        Nid: "365",
        Person: "74",
        field_creation_date: "2019-07-01 00:00:00",
        field_expiration_date: "2019-07-25 00:00:00",
    }
};


describe('DebtCard', () => {
    test('DebtCard Edit snapshot', () => {
        const container = renderer.create(<MemoryRouter><DebtCard {...defaultProps}/></MemoryRouter>).toJSON();
        expect(container).toMatchSnapshot();
})});