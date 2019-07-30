import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
export const store = mockStore({debts:{
    persons: [
        {
            Author_id: "62",
            first_name: "Ulix",
            myDebtSummDol: -100,
            myDebtSummEur: -100,
            myDebtSummRub: -100,
            name: "Ulix Turner",
            second_name: "Turner",
            theirDebtSummDol: 100,
            theirDebtSummEur: 100,
            theirDebtSummRub: 100,
            tid: "1",
        },
        {
            Author_id: "62",
            first_name: "Ophelia",
            myDebtSummDol: -200,
            myDebtSummEur: -200,
            myDebtSummRub: -200,
            name: "Ophelia LaCroix",
            second_name: "LaCroix",
            theirDebtSummDol: 0,
            theirDebtSummEur: 0,
            theirDebtSummRub: 0,
            tid: "2",
        }
    ],
    debts: [
        {
            Currency: "USD",
            Debt: "1.00",
            Name: "Marcus TheWild",
            Nid: "370",
            Person: "76",
            field_creation_date: "2019-07-25 00:00:00",
            field_expiration_date: "2019-07-25 00:00:00",
        },
        {
            Currency: "USD",
            Debt: "100.00",
            Name: "Ophelia LaCroix",
            Nid: "371",
            Person: "76",
            field_creation_date: "2019-08-25 00:00:00",
            field_expiration_date: "2019-08-25 00:00:00",
        },
        {
            Currency: "EUR",
            Debt: "-1.00",
            Name: "Shen Long",
            Nid: "372",
            Person: "76",
            field_creation_date: "2019-09-25 00:00:00",
            field_expiration_date: "2019-09-25 00:00:00",
        },
        {
            Currency: "EUR",
            Debt: "-111.00",
            Name: "Sheimus RedChapel",
            Nid: "373",
            Person: "76",
            field_creation_date: "2019-07-25 00:00:00",
            field_expiration_date: "2019-07-25 00:00:00",
        },
        {
            Currency: "USD",
            Debt: "-500.00",
            Name: "Sheimus RedChapel",
            Nid: "374",
            Person: "76",
            field_creation_date: "2019-11-25 00:00:00",
            field_expiration_date: "2019-11-25 00:00:00",
        },
        {
            Currency: "USD",
            Debt: "1000.00",
            Name: "Titania TheQueen",
            Nid: "375",
            Person: "76",
            field_creation_date: "2019-07-25 00:00:00",
            field_expiration_date: "2019-07-25 00:00:00",
        },

    ]
}});
