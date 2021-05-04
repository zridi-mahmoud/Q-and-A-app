import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Loading from "../components/Loading";
import { Grid } from "@material-ui/core";

const CloseQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [location, setLocation] = useState([-7.589843, 33.573109]);
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/questions/close/${location[0]}/${location[1]}`,
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
      {loading ? (
        <Grid container justify="center">
          <Grid item xs={8} md={6}>
            <Loading />
          </Grid>
        </Grid>
      ) : (
        <Post type="Questions" data={questions} />
      )}
    </div>
  );
};

export default CloseQuestions;
