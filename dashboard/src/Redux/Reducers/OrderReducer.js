import {
     ORDER_LIST_FAIL,
     ORDER_LIST_REQUEST,
     ORDER_LIST_SUCCESS,
      ORDER_DETAILS_FAIL,
     ORDER_DETAILS_REQUEST,
     ORDER_DETAILS_SUCCESS,
     ORDER_CREATE_FAIL,
     ORDER_CREATE_REQUEST,
     ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
     ORDER_DELIVERED_FAIL,
     ORDER_DELIVERED_REQUEST,
     ORDER_DELIVERED_SUCCESS,
     ORDER_DELIVERED_RESET,
      ORDER_UPDATE_FAIL,
     ORDER_UPDATE_REQUEST,
     ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_RESET,
        } from "../Constants/OrderConstants";



// all orders admin 
 export const orderListReducer = (state = {orders:[]} , action ) => {
    switch (action.type){
        case ORDER_LIST_REQUEST :
            return{loading: true 
            };

            case ORDER_LIST_SUCCESS :
            return{ loading: false ,orders: action.payload 
            };

            case ORDER_LIST_FAIL :
            return{ loading: false , error: action.payload
            };
            
            default: 
            return state ;
    }
};

// ORDER DETAILS 
export const orderDeatailsReducer =
 (state = {loading:true,orderItems:[],shippingaddress:{}  } , action ) => {
    switch (action.type){
        case ORDER_DETAILS_REQUEST :
            return{...state,loading: true 
            };

            case ORDER_DETAILS_SUCCESS :
            return{ loading: false ,  order: action.payload 
            };

            case ORDER_DETAILS_FAIL :
            return{ loading: false , error: action.payload
            };
            
            default: 
            return state ;
    }
};

// ORDER Delivered / paid 
export const orderDeliveredReducer =
 (state = {} , action ) => {
    switch (action.type){
        case ORDER_DELIVERED_REQUEST :
            return{loading: true 
            };

            case ORDER_DELIVERED_SUCCESS :
            return{ loading: false ,  success: true
            };

            case ORDER_DELIVERED_FAIL :
            return{ loading: false , error: action.payload
            };
            case ORDER_DELIVERED_RESET :
            return {};
            default: 
            return state ;
    }
};