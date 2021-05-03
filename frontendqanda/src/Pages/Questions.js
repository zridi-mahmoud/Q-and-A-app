import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Loading from "../components/Loading";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
        setQuestions(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }, []);
  return (
    <div>
      <PrimarySearchAppBar />
      {loading ? <Loading /> : <Post type="Questions" data={questions} />}
    </div>
  );
};

export default Questions;
