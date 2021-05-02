import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/questions/user/${userId}`,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setQuestions(response.data);
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

export default Questions;
