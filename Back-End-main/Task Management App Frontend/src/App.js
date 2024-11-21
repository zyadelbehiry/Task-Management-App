import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Route, RouterProvider } from "react-router";
import Board, { combinedLoader } from "./Components/WorkSpace/Board/Board";
import Auth from "./Components/Auth/Auth";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Home from "./Components/Home/Home";
import store from "./Store/store";
import { Provider } from "react-redux";
import WorkSpaceLayout, {
  loadWorkspaces,
} from "./Components/WorkSpace/Layout/WorkSpaceLayout";
import NotFounPage from "./Components/UI/NotFoundPage/NotFounPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/work-space"
          element={<WorkSpaceLayout />}
          loader={loadWorkspaces}
        >
          <Route path=":id" element={<Board />} loader={combinedLoader} />
        </Route>
        <Route path="*" element={<NotFounPage />}></Route>
      </Route>
    )
  );
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
