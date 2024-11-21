import React, { useState } from "react";
import style from "./NewState.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createCategory } from "../../../Store/WorkspaceSlice";
const NewCategory = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [newStateName, setNewStateName] = useState("");
  const workspaceId = params.id;
  const [isNameError, setNameError] = useState(false);
  const categories = useSelector((state) =>
    state.workSpace.categories.filter((c) => c.workspaceId === workspaceId)
  );
  const categoryNameChangeHandler = (e) => {
    setNewStateName(e.target.value);
    const existingName = categories.filter(
      (category) => category.name === e.target.value
    );
    existingName.length !== 0 ? setNameError(true) : setNameError(false);
  };

  const stateSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCategory({
        name: newStateName,
        workspaceId,
        userId: JSON.parse(localStorage.user).userId,
      })
    );
    setNewStateName("");
  };
  return (
    <form className={style["add-category-form"]} onSubmit={stateSubmitHandler}>
      <p className={style["card-header"]}>Add New State</p>
      <input
        type="text"
        placeholder="Add a Task title or header"
        value={newStateName}
        onChange={categoryNameChangeHandler}
      />
      {isNameError && (
        <p className={style["error-message"]}>
          This state name is already exist
        </p>
      )}
      <div className={style["ctrl"]}>
        <input
          type="submit"
          value={"Add"}
          className={style["add-btn"]}
          disabled={isNameError}
        />
      </div>
    </form>
  );
};

export default NewCategory;
