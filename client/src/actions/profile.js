import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getCurrentProfile = () => async dispatch => {
  
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const createProfile  = ( formData, histroy, edit = false) => async dispatch => {
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify(formData);

        try {
            const res = await axios.post('/api/profile', body, options)

            dispatch({
                type:GET_PROFILE,
                payload: res.data
            });
            dispatch(setAlert( edit ? 'Portfolio updated' : 'Portfolio is created'));

            if(!edit ) histroy.push('/dashboard');

        } catch (error) {
            const errors = error.response.data.errors;

            if(errors) {
                errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
            }

            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status}
            })
        }
}

//add experience

export const addExperience = (formData) => async dispatch => {
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify(formData);
    try {
        const res = await axios.post('/api/profile/exprience', body, options)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience is created'));

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }

         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//add education

export const add_education = (formData) => async dispatch => {
    const options = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify(formData);
    try {
        const res = await axios.post('/api/profile/education', body, options)

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education is created'));

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }

         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}