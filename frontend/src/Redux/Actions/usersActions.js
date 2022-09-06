import { USER_DETAILS_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../Constants/UserConstants";
import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../Constants/OrderConstants";

// user details
export const getUserDetails = ()=> async(dispatch,getState) =>{

    try {
        dispatch({type:USER_DETAILS_REQUEST});
        const {userLogin :{
            userInfo
            },
        } = getState();
        const config = {
            headers: { Authorization:'Bearer ' + userInfo.token},
        };
        const {data} = await axios.get(
            '/api/users', 
           
            config);
       
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            if (message === "Not authorized, token failed"){
                dispatch(logout());
            }
        dispatch({
            type : USER_DETAILS_FAIL,
            payload:message,
           
        });
        
    }



};

// login 
export const login = (email,password)=> async(dispatch) =>{
    try {
        dispatch({type:USER_LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post('/api/users/login', {email,password}, config);
       
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data});  

        dispatch(getUserDetails())
        
        localStorage.setItem("userInfo", JSON.stringify(data));
        document.location.href = "/";
    } catch (error) {
        dispatch({
            type : USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
        
    }



};



//logout 

export const logout = ()=> async(dispatch) =>{
localStorage.removeItem("userInfo");
dispatch({ type: USER_LOGOUT});
dispatch({ type: USER_DETAILS_RESET});
dispatch({ type: ORDER_LIST_MY_RESET});

document.location.href = "/login";
};


// signup 
export const signup = (name,email,adress,country,postalCode,phone,password)=> async(dispatch) =>{
    try {
        dispatch({type:USER_REGISTER_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const {data} = await axios.post(
            '/api/users/signup', 
            {name,email,adress,country,postalCode,phone,password}, 
            config);
       
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
       dispatch({ type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
        document.location.href = "/";
    } catch (error) {
        dispatch({
            type : USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
        
    }



};











//update profile
export const updateUserProfile = (user)=> async(dispatch,getState) =>{


    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUEST});
        const {userLogin :{
            userInfo
            },
        } = getState();
        const config = {
             "Content-Type": "application/json",
            headers: {Authorization:'Bearer ' + userInfo.token},
        };
        const {data} = await axios.patch(
            '/api/users/profile', 
           user,
            config);
       
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data});
       localStorage.setItem("userInfo", JSON.stringify(data));
                document.location.href = "/profile";

    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            if (message === "Not authorized, token failed"){
                dispatch(logout());
            }
        dispatch({
            type : USER_UPDATE_PROFILE_FAIL,
            payload:message,
           
        });
        
    }
};