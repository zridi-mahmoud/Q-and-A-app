import React, { useEffect, useState } from "react";
import Answers from "../components/Answers";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Loading from "../components/Loading";

const AnswersContainer = () => {
  const question = JSON.parse(localStorage.getItem("question"));
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));

  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}/find/${question.questionId}`,
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    axios(config)
      .then(function (response) {
        setLoading(false);
        setAnswers(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div>
      <PrimarySearchAppBar />
      <div style={{ padding: 14 }} className="App">
        <h2>Answers of "{question.title}"</h2>
        <Paper style={{ padding: "40px 20px" }}>
          {loading ? (
            <Grid container justify="center">
              <Grid item xs={8} md={6}>
                <Loading />
              </Grid>
            </Grid>
          ) : answers.length === 0 ? (
            <h1>No Answers available for this question</h1>
          ) : (
            <Answers answers={answers} />
          )}
        </Paper>
      </div>
    </div>
  );
};

export default AnswersContainer;
