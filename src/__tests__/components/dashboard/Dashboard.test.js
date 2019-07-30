import {Provider} from "react-redux";
import {act, render} from "@testing-library/react";
import renderer from "react-test-renderer";
import React from "react";
import Dashboard from "../../../components/dashboard/Dashboard";
import configureMockStore from "redux-mock-store";
import {wrapWithProvider} from "../helpers/providerWrapper";

const mockStore = configureMockStore();
const store = mockStore({debts: {
            myDebts :{eur: -100, rub: -100, usd: -100},
            theirDebts: {eur: 100, rub: 100, usd: 100},
        }});

describe('Dashboard', () => {

    test ('Dashboard dispatches STATISTICS_REQUEST', async()=>{
        act(()=>{render(<Provider store={store}><Dashboard/></Provider>);});
        expect(store.getActions()).toEqual([{
            type: 'GET_STATISTICS_REQUEST'
        }]);
    });

    test ('Dashboard snapshot', ()=>{
        const container = renderer.create(<Provider
            store={store}><Dashboard/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
    });

});

/*test('Dashboard invokes debts api call', async ()=>{
        const dashboardComponent = <Dashboard/>;
        window.fetch = jest.fn().mockImplementation();
        render(wrapWithProvider(dashboardComponent));
        expect(window.fetch).toHaveBeenCalledWith('http://drupal7/api/debts_list/',
            {
                "headers": {
                    "Accept": "application/json",
                },
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            }
        );
    });*/