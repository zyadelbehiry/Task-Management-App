import React, { useEffect } from "react";
import { json, useParams } from "react-router";
import EditModal from "../../UI/Modal/EditModal";
import { useDispatch, useSelector } from "react-redux";
import StatesList from "./StatesList";
import { useLoaderData } from "react-router";
import { workSpacesActions } from "../../../Store/WorkspaceSlice";
const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const workspaceId = params.id;
  const data = useLoaderData();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(workSpacesActions.loadCategories(data.categories.categories));
      dispatch(workSpacesActions.loadTasks(data.tasks.tasks));
    }
    
  }, [params, dispatch, workspaceId, isAuthenticated, data.categories,data.tasks]);

  return (
    <>
      <StatesList />
      <EditModal></EditModal>
    </>
  );
};

export default Board;
export const loadCategories = async ({ request, params }) => {
  const workspaceId = params.id;
  try {
    const response = await fetch(
      `http://localhost:4000/api/category?workspaceId=${workspaceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error in Fetching Categories");
      throw new Error("Fetching Failed");
    }

    const categoriesData = await response.json();

    return {
      categories: categoriesData,
    };
  } catch (error) {
    return json({ message: error.message });
  }
};
export const loadTasks = async ({ request, params }) => {
  const userId = JSON.parse(localStorage.user).userId
  
  try {
    const response = await fetch(
      `http://localhost:4000/api/task?userId=${userId}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Error in Fetching Tasks");
      throw new Error("Fetching Failed");
    }

    const tasksData = await response.json();
    
    return {
      tasks: tasksData.filter(t=>t.assignedUserId === userId),
    };
  } catch (error) {
    return json({ message: error.message });
  }
};
export const combinedLoader = async ({ request, params }) => {
  const [categories, tasks] = await Promise.all([
    loadCategories({ request, params }),
    loadTasks({ request, params }),
  ]);
  return { categories, tasks };
};
