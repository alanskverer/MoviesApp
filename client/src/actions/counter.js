
import { ADD_ONE } from './types';
export const setCounter = (num, msg) => dispatch => {
    dispatch({
        type: ADD_ONE,
        payload: { num, msg }
    });

}