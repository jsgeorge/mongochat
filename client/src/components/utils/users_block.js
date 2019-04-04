import React from "react";
import UserItem from "./user_item";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const UsersBlock = props => {
  const renderUsers = () =>
    props.list
      ? props.list.map(card => (
          <ListItem
            key={card._id}
            style={{ borderBottom: "1px solid #ccc", padding: "15px" }}
          >
            {<UserItem key={card._id} {...card} grid={props.grid} />}
          </ListItem>
        ))
      : null;
  return (
    <div className="nav_block ">
      {props.list ? (
        props.list.length === 0 ? (
          <div className="no_result">No Users found</div>
        ) : null
      ) : null}
      <List>{renderUsers()}</List>
    </div>
  );
};

export default UsersBlock;
