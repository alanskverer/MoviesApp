
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';


//Load user - if there is a token in local storage - set is as a default header so we can send it in every request
//and also we will get the user and set it in the global state
//now we will try to get a user with that token and if the token is valid we can set the user to the global state
export const loadUser = () => async dispatch => {

    //setting the deafult token in the request header
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        //if token is valid return the user from db
        const res = await axios.get('/users')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

        //if token isnt valid

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })

    }



}


//Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password })


    try {
        const res = await axios.post('users', body, config);


        //IF STATUS IS 200 else will be error and go to catch
        dispatch({
            type: REGISTER_SUCCESS,
            //payload will be the token we recieve from the server
            payload: res.data
        });
        dispatch(loadUser())


    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))

            );
        }
        dispatch({
            type: REGISTER_FAIL,

        });

    }


}

//Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })


    try {
        const res = await axios.post('users/login', body, config);


        //IF STATUS IS 200 else will be error and go to catch
        dispatch({
            type: LOGIN_SUCCESS,
            //payload will be the token we recieve from the server
            payload: res.data
        });
        dispatch(loadUser())

    } catch (err) {
        const errors = err.response.data.errors;
        console.log(err.response.data.msg)
        if (errors) {

            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))

            );
        } else {
            dispatch(setAlert(err.response.data.msg, 'danger'))
        }

        dispatch({
            type: LOGIN_FAIL,

        });

    }


}

export const logout = () => dispatch => {

    dispatch({ type: LOGOUT })



}

