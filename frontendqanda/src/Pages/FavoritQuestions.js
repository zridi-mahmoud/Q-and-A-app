import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import { Redirect } from "@reach/router";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";

const FavoriteQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    var config = {
      method: "get",
      url: "http://localhost:5000/questions/favorite/" + userId,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setQuestions(response.data);
        return <Redirect to="/questions" noThrow />;
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <PrimarySearchAppBar />
      <Post type="Questions" data={questions} />
    </div>
  );
};

export default FavoriteQuestion;
