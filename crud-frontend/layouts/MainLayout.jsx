import { Outlet } from "react-router-dom";
import Header from "../src/component/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default MainLayout;
