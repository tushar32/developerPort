import{
    GET_PROFILE,
    CLEAR_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from '../actions/types';

const initialState = {
  profile: '',
  profile: [],
  error:'',
  loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action;

     switch(type){
         case GET_PROFILE:
         case UPDATE_PROFILE:
             return {
                 ...state,
                 profile: payload,
                 loading: false
             }
        case CLEAR_PROFILE:
             return {
                 ...state,
                 profile: null,
                 loading: false
             }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                locading: false
            }  
        default:
            return state;    

     }
}