import React from "react";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Backdrop,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
const Result = ({ openModal, handleClose, result }) => {
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
          {/* show message to successfully completed exam, score and congratulation and regret message */}
          <Typography variant="h6" align="center">
            You have successfully completed the exam!
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ color: result >= 60 ? "green" : "red" }}
          >
            Your score is {result}%
          </Typography>

          <Typography variant="body2" align="center">
            {result >= 60
              ? "Congratulations! you cleared the Test"
              : "Sorry! you failed the Test"}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Result;
