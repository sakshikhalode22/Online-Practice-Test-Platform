import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const googleLogin = useSelector((state) => state.userReducers.googleLogin);
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  const userInfo = useSelector((state) => state.userReducers.userLoginInfo);

  console.log(isLoggedIn,userInfo)

  const [userData, setUserData] = useState(userInfo);



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (googleLogin) {
          const res = await axios.get("http://localhost:5000/login/success", { withCredentials: true });
          console.log(res);
          setUserData(res.data.user);
        } else {
          setUserData(userInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    isLoggedIn?fetchData():navigate('/login');
  }, [userInfo,googleLogin,isLoggedIn,navigate]);

  return (
    <>
    {/* <Header/> */}
    Header
    </>
  );
}

export default Dashboard;