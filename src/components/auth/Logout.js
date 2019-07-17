import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import * as types from "../../store/sagas/auth/ActionTypes";

const Logout = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: types.LOGOUT_REQUEST});
    }, []);
    return <Fragment></Fragment>;
};

export default Logout;