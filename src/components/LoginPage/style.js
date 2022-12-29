import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "8vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    width: "70%",
    margin: "0 auto",
  },
  avatar: {
    margin: theme.spacing(0),
    marginBottom: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    },

  btn: {
    backgroundColor: "blueviolet",
    color: "white",
    
    
  }
}));