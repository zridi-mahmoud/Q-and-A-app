import React, { useState, useRef } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AnswerForm from "./AnswerForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

export default function Post(props) {
  const history = useHistory();
  const [question, setQuestion] = useState({
    title: "",
    content: "",
    userId: "",
    location: [],
    likes: [],
  });
  const likes = useRef({});
  const dataExist = props.data >= 0 ? true : false;
  const config = useRef({
    method: "",
    url: "",
    headers: {},
  });
  const forceUpdate = useForceUpdate();
  const title = props.type;
  const data = props.data;
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));

  const configure = (like, idPost, idUser, method) => {
    config.current = {
      method,
      url:
        "http://localhost:5000/questions/" + like + "/" + idPost + "/" + idUser,
      headers: {
        Authorization,
        "Content-Type": "application/json",
      },
    };
  };
  const handleClick = (post, index) => {
    if (!likes.current[index]) {
      likes.current[index] = post.likes.includes(userId)
        ? "secondary"
        : "disabled";
    }
    if (likes.current[index] === "disabled") {
      likes.current[index] = "secondary";
      configure("like", post._id, post.userId, "put");
    } else {
      likes.current[index] = "disabled";
      configure("dislike", post._id, post.userId, "delete");
    }
    axios(config.current)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={8} md={6}>
        <div>
          <Typography variant="h3">{title}</Typography>
          {dataExist ? (
            <h1>No {title}</h1>
          ) : (
            data.map((element, index) => {
              return (
                <Paper style={{ margin: 4 }} key={index}>
                  <Card style={{ padding: 10 }}>
                    <CardHeader title={element.title} />
                    <CardContent>{element.content}</CardContent>
                    <CardActions disableSpacing>
                      <div
                        className="font-icon-wrapper"
                        onClick={(e) => {
                          handleClick(data[index], index);
                          forceUpdate();
                        }}
                      >
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon
                            id={index}
                            color={
                              !likes.current[index]
                                ? element.likes.includes(userId)
                                  ? "secondary"
                                  : "disabled"
                                : likes.current[index]
                            }
                          />
                        </IconButton>
                      </div>
                    </CardActions>
                    <Divider />
                    <Grid container>
                      <Grid item xs={12}>
                        <AnswerForm
                          questionId={element._id}
                          userId={element._userId}
                        />
                      </Grid>
                      <Grid item container justify="flex-end">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setQuestion({
                              questionId: element._id,
                              title: element.title,
                              content: element.content,
                              userId: element.userId,
                            });
                            localStorage.setItem(
                              "question",
                              JSON.stringify({
                                questionId: element._id,
                                title: element.title,
                                content: element.content,
                              })
                            );
                            history.push("/answers");
                          }}
                        >
                          Show all Answers
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Paper>
              );
            })
          )}
        </div>
      </Grid>
    </Grid>
  );
}
