import {ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_RESET, ORDER_LIST_MY_SUCCESS , ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS , ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS ,ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST,  ORDER_DETAILS_SUCCESS } from "../Constants/OrderConstants";
import { CART_CLEAR_ITEMS} from "../Constants/CartConstants";
import axios from "axios";
import {logout} from "./usersActions";



// order create
export const createOrder = (order)=> async(dispatch,getState) =>{


    try {
        dispatch({type:ORDER_CREATE_REQUEST});
        const {userLogin :{
            userInfo
            },
        } = getState();
        const config = {
             "Content-Type": "application/json",
            headers: {Authorization:'Bearer ' + userInfo.token},
        };
        const {data} = await axios.post(
            '/api/orders', 
           order,
            config);
       
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({ type: CART_CLEAR_ITEMS, payload: data});
       //localStorage.removeItem("cartItems");
                

    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            if (message === "Not authorized, token failed"){
                dispatch(logout());
            }
        dispatch({
            type : ORDER_CREATE_FAIL,
            payload:message,
           
        });
        
    }
};


// order details
export const getOrderDetails = (id)=> async(dispatch,getState) =>{


    try {
        dispatch({type:ORDER_DETAILS_REQUEST});
        const {userLogin :{
            userInfo
            },
        } = getState();
        const config = {
           
            headers: {Authorization:'Bearer ' + userInfo.token},
        };
        const {data} = await axios.get(
            '/api/orders/'+id, 
          
            config);
       
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data});
       
       
                

    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            if (message === "Not authorized, token failed"){
                dispatch(logout());
            }
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload:message,
           
        });
        
    }
};


// order pay
export const payOrder = (orderId)=> async(dispatch,getState) =>{


    try {
        dispatch({type:ORDER_PAY_REQUEST});
        const {userLogin :{
            userInfo
            },
        } = getState();
        const config = {
             "Content-Type": "application/json",
            headers: {Authorization:'Bearer ' + userInfo.token},
        };
        const {data} = await axios.put(
            '/api/orders/'+orderId+'/pay', 
           //add payment/deliveredd result
            config);
       
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data});
       
                

    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            if (message === "Not authorized, token failed"){
                dispatch(logout());
            }
        dispatch({
            type : ORDER_PAY_FAIL,
            payload:message,
           
        });
        
    }
};


// order list my 
export const listMyOrders = 
()=> async(dispatch,getState) =>{


    try {
        dispatch({type:ORDER_LIST_MY_REQUEST , loading:true}); 
        const {userLogin :{
            userInfo
            },
        } = getState();
        const config = {
            
            headers: {Authorization:'Bearer ' + userInfo.token},
        };
        const {data} = await axios.get(
            '/api/orders/', 
           //add payment/deliveredd result
            config);
       
        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data});
       
                

    } catch (error) {
        const message = 
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            if (message === "Not authorized, token failed"){
                dispatch(logout());
            }
        dispatch({
            type : ORDER_LIST_MY_FAIL,
            payload:message,
           
        });
        
    }
};