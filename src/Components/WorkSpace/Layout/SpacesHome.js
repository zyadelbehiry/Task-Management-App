import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./SpacesHome.module.css";
const SpacesHome = (props) => {
  const workspaces =  useSelector(state => state.workSpace.workSpaces)


  return (
    <div className={style["spaces-home-container"]}>
      <h2 className={style["hello-message"]}>
        Welcome to your home <span>{props.username}</span>
      </h2>
      <ul>
        {workspaces
          ? workspaces.map((workspace) => (
              <li key={workspace._id}>
                <div className={style["top-color"]}></div>
                <NavLink to={`/work-space/${workspace._id}`}>
                  {workspace.name}
                </NavLink>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default SpacesHome;
