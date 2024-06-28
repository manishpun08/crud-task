import MainLayout from "../layouts/MainLayout";
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
    ],
  },
];

export default LoginRoutes;
