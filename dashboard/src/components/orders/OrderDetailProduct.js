import React from 'react';
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
    const {order,loading} = props
    if (!loading) {
        //calculate price
        const addDecimals = (num) =>{
            return(Math.round(num*100)/100).toFixed(2);
        };
   

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) =>acc + item.price*item.qty , 0)
        );
     };


    return (
        <table className="table border table-lg">
            <thead>
                <tr>
                    <th style={{ width: "40%" }}>Product</th>
                    <th style={{ width: "20%" }}>Unit Price</th>
                    <th style={{ width: "20%" }}>Quantity</th>
                    <th style={{ width: "20%" }} className="text-end">
                        Total
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    order.orderItems.map((item,index) => (
                         <tr key = {index}>
                            <td>
                                <Link className="itemside" to="#">
                                    <div className="left">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: "40px", height: "40px" }}
                                            className="img-xs"
                                        />
                                    </div>
                                    <div className="info">
                                        {item.name}
                                    </div>
                                </Link>
                            </td>
                            <td>dt {item.price} </td>
                            <td> {item.qty} </td>
                            <td className="text-end"> dt {item.price * item.qty} </td>
                        </tr>    
                    ))
                }
                

                <tr>
                    <td colSpan="4">
                        <article className="float-end">
                            <dl className="dlist">
                                <dt>SubTotal:</dt><dd>dt {order.itemsPrice} </dd>
                            </dl>
                            <dl className="dlist">
                                <dt>Shipping Cost:</dt><dd>dt {order.shippingCost} </dd>
                            </dl>
                            <dl className="dlist">
                                <dt>Grand total:</dt>
                                <dd>
                                    <b className="h5">dt {order.totalPrice} </b>
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="text-muted">Status:</dt>
                                <dd>
                                    {
                                        order.isPaid ? (
                                            <span className="badge rounded-pill alert-success text-success">
                                        Payment Done
                                    </span>
                                        ) : (
                                            <span className="badge rounded-pill alert-danger text-danger">
                                        Not Paid
                                    </span>
                                        )
                                    }
                                    
                                </dd>
                            </dl>
                        </article>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default OrderDetailProducts;