import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Box,
  Button,
  Typography,
  MobileStepper,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

const Questions = () => {
  const dispatch = useDispatch();
  const userExamResult = useSelector((state) => state.userReducers.userExam);
  const theme = useTheme();
  const [currentQue, setCurrentQue] = useState(null);
  const [userans, setUserans] = useState(null);

  let steps = userExamResult?.length;
  const [currentQueId, setCurrentQueId] = useState(1);

  const handleNext = () => {
    setCurrentQueId((prevCurrentQue) => prevCurrentQue + 1);
  };

  const handleBack = () => {
    setCurrentQueId((prevCurrentQue) => prevCurrentQue - 1);
  };

  useEffect(() => {
    const getCurrentQuestion = userExamResult?.filter(
      (item) => item.queid === currentQueId
    );
    setCurrentQue(getCurrentQuestion && getCurrentQuestion[0]);
  }, [currentQueId, userExamResult]);

  const handleChange = (e) => {
    setUserans(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();

    let updatedExamResult = userExamResult?.map((item) =>
      item.queid === currentQueId
        ? {
            ...item,
            userAns: userans,
            correctFlag: item.ans === userans ? "T" : "F",
          }
        : item
    );

    dispatch({
      type: "USEREXAM",
      payload: updatedExamResult,
    });
    setUserans(null);
    setCurrentQueId(currentQueId < steps && currentQueId + 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        marginTop: 2,
        padding: 7,
        width: "100%",
        border: "1px solid black",
        borderRadius: 5,
      }}
    >
      <FormControl component="fieldset">
        <FormLabel>
          <Typography variant="h6">{currentQueId}:{currentQue?.que}</Typography>
          <Typography
            variant="h6
            "
          >
            Select the correct answer
          </Typography>
        </FormLabel>
        <RadioGroup
          name="queans"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <FormControlLabel
            name="queans"
            value={currentQue?.options[0]}
            control={<Radio />}
            label={currentQue?.options[0]}
          />
          <FormControlLabel
            name="queans"
            value={currentQue?.options[1]}
            control={<Radio />}
            label={currentQue?.options[1]}
          />
          <FormControlLabel
            name="queans"
            value={currentQue?.options[2]}
            control={<Radio />}
            label={currentQue?.options[2]}
          />
          <FormControlLabel
            name="queans"
            value={currentQue?.options[3]}
            control={<Radio />}
            label={currentQue?.options[3]}
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="outlined"
        color="black"
        sx={{
          width: "20%",
          borderRadius: 20,
          marginTop: 2,
          marginLeft: "auto",
        }}
        disabled={userans === null}
        onClick={(e) => submit(e)}
      >
        Submit
      </Button>

      <MobileStepper
        variant="progress"
        steps={steps + 1}
        position="static"
        activeStep={currentQueId}
        sx={{ maxWidth: "100%", flexGrow: 1, marginTop: 5 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={currentQueId === steps}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={currentQueId === 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default Questions;
