import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Container,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useStyles } from "../Utils/style";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Profile = ({ openModal, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducers.userLoginInfo);

  const [state, setState] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    address: userInfo?.address,
    phoneNo: userInfo?.phoneNo,
    school: userInfo?.school,
    grade: userInfo?.grade,
  });
  const [updateErr, setUpdateErr] = useState("");
  const [success, setSuccess] = useState("");
  const updateUrl = `http://localhost:5000/updateuser/${state.email}`;

  const [stateErr, setStateErr] = useState({
    address: "",
    phoneNo: "",
    school: "",
    grade: "",
  });
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(() => {
    if (state.address && state.phoneNo && state.school && state.grade) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    validator(name, value);
  };
  const validator = (name, value) => {
    switch (name) {
      case "address":
        value.length < 5
          ? setStateErr({
              ...stateErr,
              address: "Address should be more than 5 characters",
            })
          : setStateErr({ ...stateErr, address: "" });
        break;
      case "phoneNo":
        !value.match(/^[0-9]{10}$/)
          ? setStateErr({
              ...stateErr,
              phoneNo: "Phone Number should be more than 10 characters",
            })
          : setStateErr({ ...stateErr, phoneNo: "" });
        break;
      case "school":
        value.length < 5
          ? setStateErr({
              ...stateErr,
              school: "School should be more than 5 characters",
            })
          : setStateErr({ ...stateErr, school: "" });
        break;
      case "grade":
        value.length < 1 || value === 0
          ? setStateErr({
              ...stateErr,
              grade: "Please select grade",
            })
          : setStateErr({ ...stateErr, grade: "" });
        break;
      default:
        break;
    }
  };

  const userUpdate = async (e) => {
    e.preventDefault();
    setUpdateErr("");
    setSuccess("");
    const { address, phoneNo, school, grade } = state;
    try {
      const res = await axios.put(updateUrl, {
        address,
        phoneNo,
        school,
        grade,
      });
      if (res.status === 200) {
        setSuccess("Profile Updated Successfully");
        setUpdateErr("");
      }

      const user = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        address: address,
        phoneNo: phoneNo,
        school: school,
        grade: grade,
      };
      sessionStorage.setItem("user-login", JSON.stringify(user));
      dispatch({ type: "USER_LOGIN", payload: user });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setUpdateErr("Failed to update profile");
      setSuccess("");
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className={classes.title}
          >
            Profile
          </Typography>

          {/* form to update userInfo */}

          <form>
            <Container className={classes.root}>
              {updateErr && (
                <Typography
                  className={classes.error}
                  sx={{
                    marginBottom: 2,
                    fontSize: "0.5 rem",
                    lineHeight: "1",
                    fontWeight: "150",
                  }}
                >
                  {updateErr}
                </Typography>
              )}
              {success && (
                <Typography
                  className={classes.success}
                  sx={{
                    marginBottom: 2,
                    fontSize: "0.5 rem",
                    lineHeight: "1",
                    fontWeight: "150",
                  }}
                >
                  {success}
                </Typography>
              )}

              <TextField
                className={classes.textField}
                label="Email"
                variant="outlined"
                type="email"
                size="small"
                name="email"
                value={state.email}
                disabled
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              <TextField
                className={classes.textField}
                label="Name"
                variant="outlined"
                type="text"
                size="small"
                name="name"
                value={state.name}
                disabled
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              <TextField
                className={classes.textField}
                label="Address"
                variant="outlined"
                type="text"
                size="small"
                name="address"
                value={state.address}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              {/* error */}
              {stateErr.address && (
                <Typography
                  className={classes.error}
                  sx={{
                    marginBottom: 2,
                    fontSize: "0.5 rem",
                    lineHeight: "1",
                    fontWeight: "150",
                  }}
                >
                  {stateErr.address}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="Phone Number"
                variant="outlined"
                type="text"
                size="small"
                name="phoneNo"
                value={state.phoneNo}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              {/* error */}
              {stateErr.phoneNo && (
                <Typography
                  className={classes.error}
                  sx={{
                    marginBottom: 2,
                    fontSize: "0.5 rem",
                    lineHeight: "1",
                    fontWeight: "150",
                  }}
                >
                  {stateErr.phoneNo}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                label="School"
                variant="outlined"
                type="text"
                size="small"
                name="school"
                value={state.school}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              {/* error */}
              {stateErr.school && (
                <Typography
                  className={classes.error}
                  sx={{
                    marginBottom: 2,
                    fontSize: "0.5 rem",
                    lineHeight: "1",
                    fontWeight: "150",
                  }}
                >
                  {stateErr.school}
                </Typography>
              )}
              <FormControl>
                <FormLabel>Grade</FormLabel>
                <RadioGroup
                  defaultValue={state.grade}
                  name="grade"
                  row
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <FormControlLabel
                    name="grade"
                    value={7}
                    control={<Radio />}
                    label="7"
                  />
                  <FormControlLabel
                    name="grade"
                    value={8}
                    control={<Radio />}
                    label="8"
                  />
                  <FormControlLabel
                    name="grade"
                    value={9}
                    control={<Radio />}
                    label="9"
                  />
                  <FormControlLabel
                    name="grade"
                    value={10}
                    control={<Radio />}
                    label="10"
                  />
                </RadioGroup>
              </FormControl>
              {/* error */}
              {stateErr.grade && (
                <Typography
                  className={classes.error}
                  sx={{
                    marginBottom: 2,
                    fontSize: "0.5 rem",
                    lineHeight: "1",
                    fontWeight: "150",
                  }}
                >
                  {stateErr.grade}
                </Typography>
              )}
              <Button
                variant="outlined"
                color="black"
                sx={{
                  width: "70%",
                  borderRadius: 20,
                  marginTop: 2,
                }}
                disabled={!btnStatus}
                onClick={(e) => userUpdate(e)}
              >
                update
              </Button>
            </Container>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Profile;
