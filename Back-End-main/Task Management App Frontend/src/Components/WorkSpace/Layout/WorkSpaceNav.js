import React from "react";
import style from "./WorkSpace.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { workSpacesActions } from "../../../Store/WorkspaceSlice";
const WorkSpaceNav = () => {
  const params = useParams();
  const dispatch = useDispatch();
  let workspaceName = useSelector(
    (state) =>
      state.workSpace.workSpaces !==undefined && state.workSpace.workSpaces.filter((space) => space._id === params.id)[0]
  );

  const searchChangeHandler=(e)=>{
    dispatch(workSpacesActions.filterTasks(e.target.value.toLowerCase()))
  }
  return (
    <nav className={style["nav"]}>
      <div className={style["nav-links"]}>
        <h1 className={style["workspace-title"]}>
          {workspaceName && params.id && workspaceName.name}
        </h1>
        <ul>
          <NavLink to="/workspace/tasks" className={style["active"]}>
            Add
          </NavLink>
          <NavLink to="/workspace/tasks" className={style["active"]}>
            Collaporators
          </NavLink>
          <NavLink to="/workspace/settings" className={style["active"]}>
            Settings
          </NavLink>
        </ul>
      </div>
      <form action="">
        <span>
          <i className={`bx bx-search ${style["search-icon"]}`}></i>
        </span>
        <input
          type="text"
          className={style["search-input"]}
          placeholder="Search"
          onChange={searchChangeHandler}
        />
      </form>
    </nav>
  );
};

export default WorkSpaceNav;
