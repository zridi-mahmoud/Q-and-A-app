import React from "react";
import { Grid } from "@material-ui/core";

const PostGrid = (props) => {
  return (
    <div>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{props.title}</h4>
          <p style={{ textAlign: "left" }}>{props.content}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            {props.distance ? props.distance : ""}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostGrid;
