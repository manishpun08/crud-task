import MainLayout from "../layouts/MainLayout";
import UserDetail from "../pages/UserDetail";
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
        path: "/userDetail",
        element: <UserDetail />,
      },
    ],
  },
];

export default LoginRoutes;
