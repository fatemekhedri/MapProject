import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import PropTypes from "prop-types";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     borderRadius: "50px 50px 50px 50px",
//   },
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   textField: {
//     borderRadius: "50px 50px 0 0",
//     // marginLeft: theme.spacing(1),
//     // marginRight: theme.spacing(1),
//   },
// }));

const TextBox = (props) => {
  const {
    id,
    label,
    register,
    errors,
    type,
    value,
    onChange,
    color,
    size,
    margin,
    fullWidth,
    variant,
    defaultValue,
    disabled,
    multiline,
  } = props;
  // const classes = useStyles();

  return (
    <CacheProvider value={cacheRtl}>
      <TextField
        id={id}
        type={type}
        fullWidth={fullWidth}
        disabled={disabled}
        variant={variant}
        color={color}
        size={size}
        label={label}
        margin={margin}
        value={value}
        multiline={multiline}
        onChange={onChange}
        defaultValue={defaultValue}
        //   className={classes.root}
        helperText={errors && errors[id] && errors[id]?.message}
        error={errors && errors[id] && errors[id]?.message}
        {...register(id)}
      />
    </CacheProvider>
  );
};
TextBox.defaultProps = {
  // id: "TextBox1",
  size: "small",
  variant: "outlined",
  color: "white",
  disabled: false,
  multiline: false,
  error: false,
  defaultValue: "",
  type: "text",
  fullWidth: "fullWidth",
  label: "TextBox",
  helperText: "",
  margin: "none",
};
TextBox.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.oneOf(["text", "password", "number", "search"]),
  margin: PropTypes.oneOf(["dense", "normal", "none"]),
  variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  error: PropTypes.bool,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.string,
  helperText: PropTypes.string,
};

export default TextBox;
