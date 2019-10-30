import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types';
import { setAlert } from './alert';

import axios from 'axios';

export const register = ({ name,email,password }) => async dispatch => {
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({ name,email,password });

    try {
        const res = await axios.post('/api/users', body, options)

        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:REGISTER_FAIL,
        });
    }
}