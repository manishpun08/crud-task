import BaseLayout from "../layouts/BaseLayout";
import ForgetPassword from "../pages/ForgetPassword";
import LoginUser from "../pages/LoginUser";
import OtpVerify from "../pages/OtpVerify";
import RegisterUser from "../pages/RegisterUser";
import ResetPassword from "../pages/ResetPassword";

const GuestRoutes = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "register",
        element: <RegisterUser />,
      },
      {
        path: "login",
        element: <LoginUser />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp-verify",
        element: <OtpVerify />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default GuestRoutes;
