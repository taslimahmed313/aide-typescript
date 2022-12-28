import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Login from "../../Pages/Authentication/Login/Login";
import Signup from "../../Pages/Authentication/Signup/Signup";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AddUser from "../../Pages/Dashboard/AddUser/AddUser";
import UpdateUser from "../../Pages/Dashboard/UpdateUser/UpdateUser";
import UserList from "../../Pages/Dashboard/UserList/UserList";
import Home from "../../Pages/Home/Home/Home";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/addUser",
        element: <AddUser></AddUser>,
      },
      {
        path: "/dashboard",
        element: <UserList></UserList>,
      },
      {
        path: "/dashboard/updateUser/:id",
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) =>
          fetch(` https://aide-task-server.vercel.app/allUser/${params.id}`),
      },
    ],
  },
]);
