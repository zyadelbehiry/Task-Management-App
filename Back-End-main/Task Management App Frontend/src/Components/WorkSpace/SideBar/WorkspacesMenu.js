import React, { useEffect, useState } from "react";
import style from "./SideBar.module.css";
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import NewSpaceForm from "./NewSpaceForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkspace,
  workSpacesActions,
} from "../../../Store/WorkspaceSlice";
const TasksMenu = () => {
  const [isNewWorkspace, setIsNewWorkspace] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  let workspaces = useLoaderData().workspace;
  useEffect(() => {
    dispatch(workSpacesActions.loadSpaces(workspaces));
  }, [dispatch,workspaces]);
  const newWorkspaceHandler = () => {
    setIsNewWorkspace((state) => !state);
  };

  const mySpaces = useSelector(state => state.workSpace.workSpaces)

  const deleteWorkspaceHandler = (workspaceId) => {
    dispatch(deleteWorkspace(workspaceId));
    navigate("/work-space");
  };

  return (
    <ul className={style["side-menu"]}>
      <div className={style["create-task"]}>
        <p className={style["side-icon"]} onClick={newWorkspaceHandler}>
          + Add New Workspace
        </p>
      </div>
      {isNewWorkspace && <NewSpaceForm newSpaceToggler={newWorkspaceHandler} />}
      {mySpaces!==undefined && Object.keys(mySpaces).map((spaceName) => (
        <div
          className={`${style["side-item"]} ${style["workspace-nav-link"]} ${
            params.id === mySpaces[spaceName]._id ? style["active"] : ""
          }`}
          key={mySpaces[spaceName]._id}
        >
          <NavLink to={`/work-space/${mySpaces[spaceName]._id}`}>
            {mySpaces[spaceName].name}
          </NavLink>
          <button
            className={style["delete-space-btn"]}
            onClick={() => {
              deleteWorkspaceHandler(mySpaces[spaceName]?._id);
            }}
          >
            <i className={`bx bx-trash`}></i>
          </button>
        </div>
      ))}
    </ul>
  );
};

export default TasksMenu;
