import React, { useEffect } from "react";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getUserDetails } from "../../redux/features/LoginSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfos } = useSelector((store: any) => store.login);
  useEffect(() => {
    !Cookies.get("token") && navigate("/login");
    dispatch(getUserDetails());
  }, [userInfos]);

  return (
    <div>
      <Sidebar userName={userInfos.username} userAvatar={userInfos.avatar} />
    </div>
  );
};

export default Dashboard;
