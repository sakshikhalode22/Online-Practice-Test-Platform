import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bolder",
    textAlign: "center",
  },

  textField: {
    display: "flex",
    margin: "10px !important",
    width: "100%",
  },

  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});
