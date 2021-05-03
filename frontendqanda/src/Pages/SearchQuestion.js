import React, { useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchQuestion = () => {
  const classes = useStyles();
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);
  const handleSearch = (e) => {
    setQuestions([]);
    if (e.target.value === "") {
      return;
    }
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/questions/search/${e.target.value}`,
      headers: {
        Authorization,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setQuestions(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div>
      <PrimarySearchAppBar />
      <Grid container justify="center">
        <Grid item xs={8} md={6}>
          <Paper component="form" className={classes.root}>
            <InputBase
              onChange={handleSearch}
              className={classes.input}
              placeholder="Search ..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
            >
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      {loading ? <Loading /> : <Post type="Result" data={questions} />}
    </div>
  );
};

export default SearchQuestion;
