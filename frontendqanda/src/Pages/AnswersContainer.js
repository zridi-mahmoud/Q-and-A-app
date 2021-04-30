import React, { useEffect, useState } from "react";
import Answers from "../components/Answers";
import axios from "axios";
import { Paper } from "@material-ui/core";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { useHistory } from "react-router-dom";

const AnswersContainer = () => {
  const history = useHistory();
  const question = JSON.parse(localStorage.getItem("question"));
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));

  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  var config = {
    method: "get",
    url: "http://localhost:5000/answers/find/" + question.questionId,
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    axios(config)
      .then(function (response) {
        setAnswers(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response.status === 403) {
          history.push("/forbiden");
          setLoading(false);
        }
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
            <h1>Loading ...</h1>
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
