import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
var axios = require("axios");

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
}));

const AnswerForm = ({ questionId, userId }) => {
  const classes = useStyles();
  const [answer, setAnswer] = useState({
    content: "",
    userId,
    questionId,
  });
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));

  const submit = (e) => {
    e.preventDefault();

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/answers`,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
      data: answer,
    };

    axios(config)
      .then(function (response) {
        setAnswer({
          content: "",
          userId,
          questionId,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div style={{ width: "100%", padding: 10 }}>
      <form onSubmit={submit} method="post" noValidate>
        <Grid container alignItems="center">
          <Grid item xs={10} style={{ padding: 10 }}>
            <TextField
              label="Answer"
              style={{ width: "100%", margin: "0 2px" }}
              multiline
              rowsMax={4}
              name="answer[content]"
              value={answer.content}
              onChange={(e) =>
                setAnswer({ ...answer, content: e.target.value })
              }
              rows={1}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AnswerForm;
