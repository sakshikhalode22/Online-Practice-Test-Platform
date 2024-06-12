import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Calendar from "./Calendar";
import ListOfExam from "./ListOfExam";
import { getExams } from "../Utils/Api";

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  const userInfo = useSelector((state) => state.userReducers.userLoginInfo);
  const [list, setList] = useState(null);

  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    getExams(userInfo)
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo]);

  return (
    <>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{ marginTop: "80px" }}
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={4} md={4}>
          <Paper
            elevation={3}
            style={{ padding: "20px" }}
            sx={{ backgroundColor: "#66bb6a", borderRadius: "10px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Hi, {userInfo?.name}
            </Typography>
            <Typography variant="body1">Email: {userInfo.email}</Typography>
            <Typography variant="body1">Mobile: {userInfo.phoneNo}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Paper
            elevation={3}
            style={{ padding: "20px" }}
            sx={{ backgroundColor: "#a5d6a7", borderRadius: "10px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              <SchoolIcon sx={{ marginBottom: "-5px" }} />
              Academic Details
            </Typography>
            <Typography variant="body1">Grade: {userInfo.grade}</Typography>
            {userInfo.school && (
              <Typography variant="body1">School: {userInfo.school}</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            style={{ padding: "20px" }}
            sx={{ backgroundColor: "#a5d6a7", borderRadius: "10px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              List of Exams
            </Typography>
            <ListOfExam list={list} />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3} md={3}>
          <Paper
            elevation={3}
            style={{ padding: "20px" }}
            sx={{ backgroundColor: "#a5d6a7", borderRadius: "10px" }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Total
            </Typography>
            {/* in center list.length in big font  */}
            <Typography
              variant="h2"
              sx={{ textAlign: "center", fontWeight: "bolder" }}
            >
              {list?.length}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Exams
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={3} md={3}>
          <Paper
            elevation={3}
            style={{ padding: "20px" }}
            sx={{ backgroundColor: "#a5d6a7", borderRadius: "10px" }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              <CalendarMonthIcon sx={{ marginBottom: "-5px" }} />
              Calender
            </Typography>
            <Calendar list={list} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
