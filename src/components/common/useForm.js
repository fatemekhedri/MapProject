import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";

export function useForm(initialFormValues) {
  const [values, setValues] = useState(initialFormValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return { values, setValues, handleInputChange };
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      with: "80%",
      margin: theme.spacing(1),
    },
  },
}));
export function Form(props) {
  const classes = useStyles();
  return <form className={classes.root}>{props.children}</form>;
}
