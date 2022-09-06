import React, { useEffect } from "react";
import { Link , useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./pagination";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listUser } from "../../Redux/Actions/usersActions";
import { useState } from "react"; 

const UserComponent = (props) => {

   const {keyword,pagenumber} = props;
  const dispatch = useDispatch();
  const [keywordd,setKeyword]= useState();

   let history = useHistory();

    const userList = useSelector((state)=> state.userList);
    const {loading , error,users,page,pages} = userList;

  useEffect(()=> {
    
    dispatch(listUser(keyword,pagenumber));
     
  },[dispatch,pagenumber,]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if(keywordd && keywordd.trim()){
      history.push('/users/all/search/'+keywordd);

    }else{
      history.push('/users/all');
    };
  }

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        {/*<div>
          <Link to="" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>*/}
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
             <form onSubmit={submitHandler} className="input-group ">
                    <input
                      type="search"
                      className="form-control rounded search "
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
            </div>
            
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
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
               
                 <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                   
                  {
                    users.map((user) =>(
                         <div className="col" key={user._id}>
                          <div className="card card-user shadow-sm">
                            <div className="card-header">
                              <img
                                className="img-md img-avatar"
                                src="/images/user.png"
                                alt="User pic"
                              />
                            </div>
                            <div className="card-body">
                              <h5 className="card-title mt-5">  {user.name} </h5>
                              <div className="card-text text-muted">
                                {
                                  user.isAdmin ===true ?
                                   ( <p className="m-0">Admin</p>) : ( <p className="m-0">Customer</p>)
                                }
                               
                                <p>
                                  <a href={`mailto:`+user.email}> {user.email}</a> 
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))
                  }
                 
                  
                  
                </div> 
             )
          }
         {/* Pagination */}
               <Pagination  page={page} pages={pages} keyword={keyword ? keyword :""} />

          {/* nav */}
          
          
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
