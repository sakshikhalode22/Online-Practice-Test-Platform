import React,{useEffect, useState} from 'react';
import axios from 'axios';

function Dashboard() {
  const [userData,setUserData]=useState({});

  const getUser =() =>{
    try{
      axios.get('http://localhost:5000/login/success', {withCredentials:true})
      .then((res)=>{
        console.log(res);
        setUserData(res.data);
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
      Dashboard{userData}
    </div>
  )
}

export default Dashboard
