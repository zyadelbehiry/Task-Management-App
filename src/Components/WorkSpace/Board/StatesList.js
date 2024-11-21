import React from "react";
import TaskState from "./TaskState";
import NewCategory from "./NewState";
import style from "./StatesList.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const StatesList = () => {
  const workspaceId = useParams().id;
  const categories = useSelector(state => state.workSpace.categories.filter(c=>c.workspaceId === workspaceId));
  return (
    <div className={style["board-container"]}>
      {categories.map((category) => (
        <TaskState
          key={category._id}
          categoryId={category._id}
          state={category.name}
        ></TaskState>
      ))}
      <NewCategory />
    </div>
  );
};

export default StatesList;
