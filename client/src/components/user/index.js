import React from "react";
import LayoutAdmin from "../../hoc/adminLayout";
import PurchaseHistory from "./puchase_history";
import { Link } from "react-router-dom";
import MyButton from "../utils/button";
import LogoutBtn from "../utils/logout_btn";

const Dashboard = ({ user }) => {
  return (
    <LayoutAdmin>
      {/* {!user.userData.isAdmin ? ( */}
      <div>
        <div className="user_nfo_panel">
          <h3>USER INFORMATION</h3>
          <div>
            {user.userData.username ? <h2>{user.userData.username}</h2> : null}
            <span>
              {user.userData.name} {user.userData.lastname}
            </span>

            <span>{user.userData.email}</span>
          </div>
          <MyButton type="default" title="Edit account" linkTo="/user/edit" />
          <LogoutBtn />
          {/* <Link to="/user/edit">Edit Account</Link> */}
        </div>
        <div className="user_nfo_panel">
          <h3>FAVORITES</h3>
          {/* <PurchaseHistory products={user.userData.history} /> */}
        </div>
      </div>
      {/* ) : (
        <div className="user_nfo_panel">
          <h3>DASHBOARD</h3>
        </div>
      )} */}
    </LayoutAdmin>
  );
};

export default Dashboard;
