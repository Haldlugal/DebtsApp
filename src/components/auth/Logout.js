import {useDispatch} from "react-redux";
import React, {Fragment, useEffect} from "react";
import * as types from "../../store/sagas/auth/ActionTypes";

const Logout = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: types.LOGOUT_REQUEST});
    }, [dispatch]);
    return <Fragment></Fragment>;
};

export default Logout;