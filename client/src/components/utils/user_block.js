import React from "react";
import LayoutAdmin from "../../hoc/adminLayout";
import { Link } from "react-router-dom";
import MyButton from "../utils/button";

const Dashboard = ({ user }) => {
  return (
    <div className="user_nfo_panel_home">
      <div className="user_block_heading">
        <h3>
          {user.name} {user.lastname}
        </h3>
      </div>
      <span>{user.email}</span>
    </div>
  );
};

export default Dashboard;
