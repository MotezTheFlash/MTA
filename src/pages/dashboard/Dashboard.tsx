import React, { useEffect } from "react";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getUserDetails } from "../../redux/features/LoginSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import Navbar from "../../components/layout/navbar/Navbar";
import { getDevelopers } from "../../redux/features/DevSlice";
import { getCustomers } from "../../redux/features/CustomerSlice";
import { getPrograms } from "../../redux/features/ProgramSlice";
import { getProjects } from "../../redux/features/ProjectSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfos } = useSelector((store: any) => store.login);
  const { devs } = useSelector((store: any) => store.developer);
  const { customers } = useSelector((store: any) => store.customer);
  const { programs } = useSelector((store: any) => store.program);
  const { projects } = useSelector((store: any) => store.project);

  useEffect(() => {
    Cookies.get("token") ? dispatch(getUserDetails()) : navigate("/");
    dispatch(getDevelopers());
    dispatch(getCustomers());
    dispatch(getPrograms());
    dispatch(getProjects());
  }, [dispatch]);
  let location = useLocation();

  const dataArray = [
    { name: "Developers", data: devs },
    { name: "Customers", data: customers },
    { name: "Programs", data: programs },
    { name: "Projects", data: projects },
  ];

  return (
    <div className="dashboardContainer">
      <Sidebar userName={userInfos.username} userAvatar={userInfos.avatar} />
      <div className="mainContainer">
        <Navbar />
        <Outlet />
        <div className="dashboardBox">
          {location.pathname === "/dashboard" &&
            dataArray.map((item, index) => (
              <div className="elementBox" key={index}>
                <span className="elementName">{item.name}:</span>{" "}
                <span className="elementCount">{item.data.length}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
