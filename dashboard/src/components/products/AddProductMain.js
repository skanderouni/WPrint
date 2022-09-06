import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";


 const ToastObjects = {
        pauseOnFocusLoss : false,
        draggable: false,
        pauseOnHover : false,
        autoClose : 2000,
    };
const AddProductMain = () => {
     

    const dispatch = useDispatch();

    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState("");
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState("");

    const productCreate = useSelector((state)=> state.productCreate);
    const {loading , error,product} = productCreate;

    useEffect(()=> {
     if (product) {
       toast.success("Product created successfully",ToastObjects) ;
       dispatch({type:PRODUCT_CREATE_RESET}) ;
       setName("")
       setDescription("")
       setCountInStock(0)
       setImage("")
       setPrice(0)
     };
    },[dispatch,product]);


    const submitHandler =(e) => {
       e.preventDefault();
       dispatch(createProduct(name,price,description,image,countInStock)) ;


    };




    return (
        <>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Go to products
                        </Link>
                        <h2 className="Content-title">Add Product</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Publish now
                            </button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {error && <Message variant="alert-danger">{error}</Message>}
                                    {loading && <Loading />}
                                    <div className="mb-4">
                                        <label htmlFor="product_title" className="form-label">
                                            Product title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_title"
                                            required
                                            value = {name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_price"
                                            required
                                            value = {price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_count" className="form-label">
                                            Count In Stock
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_count"
                                            required value = {countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Type here"
                                            className="form-control"
                                            rows="7"
                                            required value = {description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Images
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter Image URL"
                                            required value = {image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddProductMain;