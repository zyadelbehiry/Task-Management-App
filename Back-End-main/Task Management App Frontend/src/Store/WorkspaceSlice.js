import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createWorkspace = createAsyncThunk(
  "workspace/createWorkspace",
  async ({ name, userId, categories }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/workspace", {
        method: "POST",
        body: JSON.stringify({
          name,
          userId,
          categories,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response);

      if (!response.ok) {
        console.log("The workspace name is already exist");
        throw new Error("Creation Failed");
      }

      const workspaceData = await response.json();

      return {
        workspace: workspaceData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "workspace/createCategory",
  async ({ name, workspaceId, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/category", {
        method: "POST",
        body: JSON.stringify({
          name,
          workspaceId,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response);

      if (!response.ok) {
        console.log("The category name is already exist");
        throw new Error("Creating Category Failed");
      }

      const categoryData = await response.json();

      return {
        category: categoryData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Create Task
export const createTask = createAsyncThunk(
  "workspace/createTask",
  async (
    { name, assignedUserId, categoryId, categoryName },
    { rejectWithValue }
  ) => {
    try {
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 5);
      const formattedDate = futureDate.toISOString().split("T")[0];
      const response = await fetch("http://localhost:4000/api/task", {
        method: "POST",
        body: JSON.stringify({
          name,
          description: "Defaul Description",
          priority: "Medium",
          dueDate: formattedDate,
          status: categoryName,
          assignedUserId,
          categoryId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response);

      if (!response.ok) {
        console.log("The Task name is already exist");
        throw new Error("Creating Task Failed");
      }

      const taskData = await response.json();

      return {
        task: {
          taskData,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const deleteWorkspace = createAsyncThunk(
  "workspace/deleteWorkspace",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/workspace/${workspaceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        console.log("Error in Deleting the Workspace");
        throw new Error("Deleting Failed");
      }

      return {
        workspaceId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "workspace/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/category/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        console.log("Error in Deleting the Category");
        throw new Error("Deleting Failed");
      }

      return {
        categoryId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////////////////////////////

const workSpaceSlice = createSlice({
  name: "workspace",
  initialState: {
    workSpaces: [],
    categories: [],
    tasks: [],
    filtered_tasks:[],
    error: null,
    loading: false,
  },
  reducers:{
    loadCategories(state,categories){
      state.categories=categories.payload;
    },
    loadSpaces(state,spaces){
      state.workSpaces=spaces.payload;
    },
    loadTasks(state,tasks){
      state.tasks=tasks.payload;
    },
    filterTasks(state, taskName){
      state.filtered_tasks=state.tasks.filter(task=>task.name.toLowerCase().includes(taskName.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      //Create WorkSpace
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.workSpaces.push(action.payload.workspace);
        state.error = null;
        state.loading = false;
      })
      .addCase(createWorkspace.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //Delete workspace
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.workSpaces = state.workSpaces.filter(
          (workspace) => workspace._id !== action.payload.workspaceId
        );
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      //Create category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload.category);
        state.error = null;
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //Delete Categories
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.categoryId
        );
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      //Create Task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.task.taskData);
        state.error = null;
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  },
});

export default workSpaceSlice;
export const workSpacesActions = workSpaceSlice.actions; 