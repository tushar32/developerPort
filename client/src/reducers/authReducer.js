import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null
}

export default function(state = initialState,actions){
    const{ type, payload } = actions;

    switch(type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                payload,
                isAuth: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuth: false,
                loading:false
            }

        default:
            return state; 

    }
}

