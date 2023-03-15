import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { userActions } from "../reducers/user-slice";
import { errorActions } from "../reducers/error-slice";

require('dotenv').config();
const uri = process.env.BACKEND_URL;
// Register User
export const registerUser = (userData, navigate, dispatch) => {
    dispatch(userActions.userLoading(true));
    axios
        .post(`${uri}/router/users/register`, userData)
        .then(res => navigate("/login")) // re-direct to login on successful register
        .catch(err => {
            if (!err.response) {
                dispatch(errorActions.getErrors({ errorName: err.message }))
            } else {
                dispatch(errorActions.getErrors(err.response.data));
            }
        }
        ).finally(() =>
            dispatch(userActions.userLoading(false))
        );
};
// Login - get user token
export const loginUser = (userData, navigate, dispatch) => {
    dispatch(userActions.userLoading(true));
    axios
        .post(`${uri}/router/users/login`, userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(userActions.setUser({ auth: true, user: decoded }));
            // navigate
            navigate("/home")
        })
        .catch(err => {
            if (!err.response) {
                dispatch(errorActions.getErrors({ errorName: err.message }))
            } else {
                dispatch(errorActions.getErrors(err.response.data));
            }
        }
        ).finally(() =>
            dispatch(userActions.userLoading(false))
        );
};
export const setUserProfile = (profileData, dispatch) => {
    axios
        .patch(`${uri}/router/profiles/`, profileData)
        .then(res => {
            dispatch(userActions.setUserProfile(res.data));
        })
        .catch(err => {
            if (!err.response) {
                dispatch(errorActions.getErrors({ errorName: err.message }))
            } else {
                dispatch(errorActions.getErrors(err.response.data));
            }
        });

};
export const getUserProfile = (profileId, dispatch) => {
    axios
        .post(`${uri}/router/profiles/`, profileId)
        .then(res => {
            if (res.data) {
                dispatch(userActions.setUserProfile(res.data));
            }
        })
        .catch(err => {
            if (!err.response) {
                dispatch(errorActions.getErrors({ errorName: err.message }))
            } else {
                dispatch(errorActions.getErrors(err.response.data));
            }
        });

};
// Log user out
export const logoutUser = (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(userActions.setUser({
        auth: false, user: {
            profile: {
                dictionary: [],
                dayStatistics: []
            }
        }
    }));
};