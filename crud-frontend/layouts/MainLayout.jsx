import { Outlet } from "react-router-dom";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default MainLayout;
