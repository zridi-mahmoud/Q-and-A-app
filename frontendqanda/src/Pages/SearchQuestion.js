import React, { useState, useRef } from "react";
import axios from "axios";
import Post from "../components/Post";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Button } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import IconButton from "@material-ui/core/IconButton";
import Loading from "../components/Loading";
import Modal from "@material-ui/core/Modal";
import Map from "../components/Map";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const SearchQuestion = () => {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const Authorization = "Bearer " + JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const total = useRef(0);
  const rowPerPage = 3;
  const [page, setPage] = React.useState(1);
  const [searchType, setSearchType] = useState("");
  const [term, setTerm] = useState("");
  const pageref = useRef(0);

  const handleChange = (event, value) => {
    pageref.current = (value - 1) * rowPerPage;
    setPage(value);
    if (searchType === "location") {
      handleSearchLoc();
    }
    if (searchType === "term") {
      handleSearchTerm();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [location, setLocation] = useState([0, 0]);

  const handleSearchLoc = (e) => {
    setSearchType("location");
    setLoading(true);
    setQuestions([]);
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/questions/search/loc/${location[0]}/${location[1]}/${pageref.current}/${rowPerPage}`,
      headers: {
        Authorization,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setQuestions(response.data.data);
        total.current = response.data.total;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    handleClose();
  };

  const [questions, setQuestions] = useState([]);
  const handleSearchTerm = (e) => {
    setQuestions([]);
    setSearchType("term");
    if (e) {
      setTerm(e.target.value);
    }
    if (term === "") {
      return;
    }
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/questions/search/term/${term}/${pageref.current}/${rowPerPage}`,
      headers: {
        Authorization,
      },
    };

    axios(config)
      .then((response) => {
        setLoading(false);
        setQuestions(response.data.data);
        total.current = response.data.total;
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Chouse a position to search:</h2>
      <Map loc={setLocation} />
      <Button variant="contained" color="primary" onClick={handleSearchLoc}>
        Show all Answers
      </Button>
    </div>
  );
  return (
    <div>
      <PrimarySearchAppBar />
      <Grid container justify="center">
        <Grid item xs={8} md={6}>
          <Paper component="form" className={classes.root}>
            <InputBase
              onChange={handleSearchTerm}
              className={classes.input}
              placeholder="Search ..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
              onClick={handleOpen}
            >
              <LocationOnIcon />
            </IconButton>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </Paper>
        </Grid>
      </Grid>
      {loading ? <Loading /> : <Post type="Result" data={questions} />}
      <Grid container justify="center">
        <Grid item xs={8} md={6}>
          <div className={classes.root}>
            <Pagination
              count={total.current / rowPerPage}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchQuestion;
