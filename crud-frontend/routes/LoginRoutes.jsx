import MainLayout from "../layouts/MainLayout";
import EditUser from "../pages/EditUser";
import UserDetail from "../pages/UserDetail";
import AddUser from "../src/component/AddUser";
import Home from "../src/component/Home";

const LoginRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "add/user",
        element: <AddUser />,
      },
      {
        path: "/userDetail/:id",
        element: <UserDetail />,
      },
      {
        path: "/editUser/:id",
        element: <EditUser />,
      },
      // {
      //   path: "/deleteUser/:id",
      //   element: <EditUser />,
      // },
    ],
  },
];

export default LoginRoutes;
