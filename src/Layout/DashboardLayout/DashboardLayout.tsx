import { Outlet } from "react-router-dom";
import Collapse from "../../Pages/Collapse/Collapse";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div id="dashboard-layout">
        <Collapse></Collapse>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
