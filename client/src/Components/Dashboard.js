import React,{useEffect, useState} from 'react';
import axios from 'axios';

function Dashboard() {
  const [userData,setUserData]=useState({});

  const getUser =async() =>{
    try{
      await axios.get('http://localhost:5000/login/success', {withCredentials:true})
      .then((res)=>{
        console.log(res);
        setUserData(res.data.user);
      })
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getUser();
  },[])

  return (
    <div>
      Dashboard {userData.name}
    </div>
  )
}

export default Dashboard
