import React, { useState } from "react";
import style from "./StatesList.module.css";
import NewTask from "./NewTask";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../../Store/WorkspaceSlice";
import Task from "./Task";
import { useParams } from "react-router";
const TaskState = (props) => {
  const [addNewTask, setAddNewTask] = useState(false);
  const params = useParams();
  const workspaceId = params.id;
  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    state.workSpace.tasks.filter(
      (task) =>
        task.status === props.state &&
        task.categoryId.workspaceId === workspaceId
    )
  );
  const filtered_tasks = useSelector((state) => state.workSpace.filtered_tasks);

  const deleteCategoryHandler = () => {
    dispatch(deleteCategory(props.categoryId));
  };

  const addTaskHandler = () => {
    setAddNewTask((state) => !state);
  };

  return (
    <div className={style["task-state-card"]}>
      <div className={style["task-header"]}>
        <p className={style["task-title"]}>{props.state}</p>
        <i
          className={`bx bx-trash ${style["delete-icon"]}`}
          onClick={deleteCategoryHandler}
        ></i>
      </div>
      <ol className={style["task-list"]}>
        {filtered_tasks.length === 0
          ? tasks.map((task) => <Task key={task._id} taskContent={task} />)
          : filtered_tasks.map(
              (task) =>
                task.categoryId !== null &&
                task.categoryId.name === props.state && (
                  <Task key={task._id} taskContent={task} />
                )
            )}
        
      </ol>
      {addNewTask ? (
        <NewTask
          stateName={props.state}
          stateId={props.categoryId}
          onAddTask={addTaskHandler}
        />
      ) : (
        <button className={style["add-task-btn"]} onClick={addTaskHandler}>
          Add Task
        </button>
      )}
    </div>
  );
};

export default TaskState;
