import React,{useEffect} from "react";
import { Link , useHistory} from "react-router-dom";
import Product from "./Product";
import { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./pagination";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listProducts } from "../../Redux/Actions/ProductActions";


const MainProducts = (props) => {

 const {keyword,pagenumber} = props;
 const dispatch = useDispatch();

    const productList = useSelector((state)=> state.productList);
    const {loading , error,products,page,pages} = productList;
   let history = useHistory();
        const productDelete = useSelector((state)=> state.productDelete);
    const {error:errorDelete, success:successDelete} = productDelete;
const [keywordd,setKeyword]= useState();
  useEffect(()=> {
    dispatch(listProducts(keywordd,pagenumber));
  },[dispatch,successDelete,keywordd,pagenumber]);

 const submitHandler = (e) => {
    e.preventDefault();
    if(keyword && keywordd.trim()){
      history.push('/products/search/'+keywordd);
      

    }else{
      history.push('/products');
    };
  }

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Products</h2>
            <div>
                <Link to="/addproduct" className="btn btn-primary">
                    Create new
                </Link>
            </div>
        </div>

        <div className="card mb-4 shadow-sm">
            <header className="card-header bg-white">
                <div className="row gx-3 py-3">
                       <form onSubmit={submitHandler} className="input-group ">
                    <input
                      type="search"
                      className="form-control rounded search "
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    
                  </form>
            </div>
                   
                
            </header>

            <div className="card-body">
               {errorDelete &&(<Message variant="alert-danger">{errorDelete}</Message>
                    )}
                {
                    loading ?
                    (
                    <Loading />
                    ) 
                    : error ?
                    (
                    <Message variant="alert-danger">{error}</Message>
                    )
                    :
                    (
                          <div className="row">
                            {/* Products */}
                            {products.map((product) => (
                                <Product product={product} key={product._id} />
                            ))}
                        </div>
                    )
                }
              
               
                    <Pagination  page={page} pages={pages} keyword={keyword ? keyword :""} />
                
            </div>
        </div>
        </section>
    );
};

export default MainProducts;