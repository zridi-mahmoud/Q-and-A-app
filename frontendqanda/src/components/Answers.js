import React from "react";
import { Divider } from "@material-ui/core";
import PostGrid from "./PostGrid";
import { withRouter } from "react-router";

const Answers = ({ answers }) => {
  return (
    <div>
      {answers.map((element, index) => (
        <div key={index}>
          <PostGrid
            content={element.content}
            distance={element.distance ? element.distance : ""}
          />
          {answers.length >= index + 2 ? (
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default withRouter(Answers);
