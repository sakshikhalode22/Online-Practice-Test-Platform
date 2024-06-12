import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Questions from "./Questions";
import Result from "./Result";
import { useNavigate } from "react-router-dom";
import { submitTestUrl } from "../Utils/Api";

const Test = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userReducers.userLoginInfo);
  const examResult = useSelector((state) => state.userReducers.userExam);
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);

  const [queList, setQueList] = useState(null);
  const [currentQueId, setCurrentQueId] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState(0);

  const grade = sessionStorage.getItem("user-login")
    ? JSON.parse(sessionStorage.getItem("user-login")).grade
    : userInfo?.grade;

  const userGrade = "grade" + grade;
  const getExamsUrl = `http://localhost:5000/questions/${userGrade}`;
  const isAllDataPresent = isLoggedIn
    ? userInfo?.phoneNo &&
      userInfo?.grade &&
      userInfo?.school &&
      userInfo?.address
    : true;

  useEffect(() => {
    if (!isAllDataPresent) {
      alert("Please fill all the details in profile page");
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllDataPresent]);

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpenModal(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpenModal(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    axios
      .get(getExamsUrl)
      .then((res) => {
        setQueList(res?.data?.data?.questions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getExamsUrl]);

  useEffect(() => {
    let temp =
      queList?.length > 0
        ? queList?.map((item, i) => {
            return {
              ...item,
              queid: i + 1,
              userAns: "",
              correctFlag: "F",
            };
          })
        : [];
    dispatch({
      type: "USEREXAM",
      payload: temp,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queList]);

  const finishTest = (e) => {
    e.preventDefault();
    let score = examResult?.filter((item) => item.correctFlag === "T").length;
    let result = score * 5;
    setResult(result);

    axios.post(submitTestUrl, {
      userId: userInfo.id,
      score: score * 5,
      result: result >= 60 ? "Pass" : "Fail",
    });
    handleOpen(e);
  };

  return (
    <>
      <Container>
        <Typography
          sx={{
            color: "black",
            fontWeight: "bold",
            marginTop: 12,
            marginBottom: 5,
          }}
          variant="h4"
          align="center"
        >
          Test
        </Typography>
        <Button
          variant="outlined"
          color="black"
          sx={{
            width: "20%",
            borderRadius: 20,
            marginTop: 2,
            float: "right",
          }}
          onClick={(e) => finishTest(e)}
        >
          Finish Test
        </Button>

        <Typography
          variant="p"
          sx={{
            color: "red",
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 5,
          }}
          align="center"
        >
          Note: Be careful Do not reload, else you will loss your work.
        </Typography>
        {/* finish test button */}

        <Typography
          variant="body1"
          sx={{
            color: "black",

            marginTop: 2,
          }}
        >
          Name: {userInfo.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "black",
          }}
        >
          Grade: {userInfo.grade}
        </Typography>
        <Questions
          steps={queList?.length}
          currentQueId={currentQueId}
          setCurrentQueId={setCurrentQueId}
        />
      </Container>
      <Result openModal={openModal} handleClose={handleClose} result={result} />
    </>
  );
};

export default Test;
