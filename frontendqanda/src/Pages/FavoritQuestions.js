import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { useHistory } from "react-router-dom";

const FavoriteQuestion = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/questions/favorite/${userId}`,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setQuestions(response.data);
        history.push("/questions");
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
