import {render} from "@testing-library/react";
import React from "react";
import Logout from "../../../components/auth/Logout";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import {wrapWithProvider} from "../../providerWrapper";

const mockStore = configureMockStore();
const store = mockStore({persons: {
    }});

describe('Logout', () => {
    test('Logout api call is invoked', async () => {
        window.fetch = jest.fn().mockImplementation();
        render(wrapWithProvider(<Logout/>));
        expect(window.fetch).toHaveBeenCalledWith('http://drupal7/api/user/logout',
            {"credentials": "include", "headers": {"Accept": "application/json", "content-type": "application/json"}, "method": "POST", "mode": "cors"}
        );

    });

    test ('Logout snapshot', ()=>{
        const container = renderer.create(<Provider
            store={store}><Logout/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
    });
});