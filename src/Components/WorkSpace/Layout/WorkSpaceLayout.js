import React from "react";
import SideBar from "../SideBar/SideBar";
import { json, Outlet, useLoaderData, useParams } from "react-router";
import style from "./WorkSpace.module.css";
import WorkSpaceNav from "./WorkSpaceNav";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Store/AuthSlice";
import { useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import SpacesHome from "./SpacesHome";
const WorkSpaceLayout = () => {
  const userStore = useSelector((state) => state.auth.user);
  const spaces = useLoaderData().workspace;
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      const user = JSON.parse(localStorage.user);
      dispatch(loginUser({ username: user.email, password: user.password }));
    }
  }, [dispatch]);
  return (
    <>
      {userStore !== null ? (
        <div className={style["work-space"]}>
          <SideBar spaces={spaces}/>
          <main>
            <WorkSpaceNav />
            {!params.id ? (
              <SpacesHome username={userStore.username} />
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default WorkSpaceLayout;
export const loadWorkspaces = async () => {
  const userId = JSON.parse(localStorage.user).userId;
  try {
    const response = await fetch(
      `http://localhost:4000/api/workspace?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error in Fetching Workspaces");
      throw new Error("Fetching Failed");
    }

    const workspacesData = await response.json();

    return {
      workspace: workspacesData,
    };
  } catch (error) {
    return json({ message: error.message });
  }
};
