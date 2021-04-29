import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
}));

export default function MultilineTextField(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        label={props.type}
        multiline
        rowsMax={props.rowsMax}
        value={value}
        onChange={handleChange}
        rows={props.rows}
      />
    </div>
  );
}
