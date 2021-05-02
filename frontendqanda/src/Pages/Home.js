import React, { useState } from "react";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Map from "../components/Map";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

const Home = (props) => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const [location, setLocation] = useState([0, 0]);
  const [question, setQuestion] = useState({
    title: "",
    content: "",
    userId: user._id,
    location: [33.573109, -7.589843],
  });
  const classes = useStyles();

  const submit = (e) => {
    e.preventDefault();
    setQuestion({ ...question, location: location });
    var data = question;
    const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/questions`,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setQuestion({
          title: "",
          content: "",
          userId: user._id,
          location: [33.573109, -7.589843],
        });
        history.push("/questions");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <PrimarySearchAppBar />
      <div className="homeContent">
        <h1>Post question</h1>
        <form
          onSubmit={submit}
          method="post"
          className={classes.form}
          noValidate
        >
          <div className={classes.root}>
            <TextField
              label="Title"
              multiline
              rowsMax={2}
              name="question[title]"
              value={question.title}
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
              rows={1}
            />
            <TextField
              label="Content"
              multiline
              rowsMax={4}
              name="question[content]"
              value={question.content}
              onChange={(e) =>
                setQuestion({ ...question, content: e.target.value })
              }
              rows={1}
            />
          </div>
          <Map loc={setLocation} />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
