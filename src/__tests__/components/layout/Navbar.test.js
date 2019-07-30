import {Provider} from "react-redux";
import React from "react";
import renderer from "react-test-renderer";
import Navbar from "../../../components/layout/Navbar";
import {MemoryRouter} from "react-router-dom";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();


describe('NavBar', () => {
    test('NavBar snapshot when user is authenticated', ()=>{
        const store = mockStore({auth: {
                authenticated: true
            }});
        const container = renderer.create(<MemoryRouter><Provider
            store={store}><Navbar/></Provider></MemoryRouter>).toJSON();
        expect(container).toMatchSnapshot();

    });
    test('NavBar snapshot when user is not authenticated', ()=>{
        const store = mockStore({auth: {
                authenticated: false
            }});
        const container = renderer.create(<MemoryRouter><Provider
            store={store}><Navbar/></Provider></MemoryRouter>).toJSON();
        expect(container).toMatchSnapshot();
    });
});