import React from "react";
import Sidebar from "./../components/sidebar"
import Header from "./../components/Header"
import UserComponent from "./../components/users/UserComponent";

const UsersScreen = ({match}) => {
      const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
 

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <UserComponent keyword={keyword} pagenumber={pagenumber}  />
            </main>
        </>
    );
};

export default UsersScreen;