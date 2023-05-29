import React from "react";
import { Button as MuiButton } from "@mui/material";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
//Style of Button
// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(0.5),
//   },
//   label: {
//     textTransform: "none",
//   },
// }));
const Button = (props) => {
  const {
    label,
    buttonType,
    startIcon,
    endIcon,
    size,
    color,
    variant,
    disabled,
    disableElevation,
    fullWidth,
    onClick,
    ...rest
  } = props;
  //   const classes = useStyles();
  return (
    <MuiButton
      variant={variant}
      size={size}
      disabled={disabled}
      disableElevation={disableElevation}
      startIcon={startIcon}
      endIcon={endIcon}
      type={buttonType}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      {...rest}
      //   className={{ root: classes.root, label: classes.label }}
    >
      {label}
    </MuiButton>
  );
};
Button.defaultProps = {
  size: "large",
  variant: "contained",
  color: "white",
  disabled: false,
  // for removing Box shadow
  disableElevation: false,
  startIcon: "",
  endIcon: "",
  fullWidth: "fullWidth",
  label: "Button",
  buttonType: "button",
};
Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
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
  disableElevation: PropTypes.bool,
  startIcon: PropTypes.string,

  endIcon: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.string,
  buttonType: PropTypes.string,
};

export default Button;
