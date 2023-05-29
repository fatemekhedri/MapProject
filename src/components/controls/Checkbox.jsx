import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";

const Checkbox = (props) => {
  const {
    id,
    label,
    value,
    onChange,
    color,
    size,
    errors,
    defaultChecked,
    disabled,
  } = props;
  // const convertToDefEventPara = (name, value) => ({
  //   target: {
  //     name,
  //     value,
  //   },
  // });
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          disabled={disabled}
          defaultChecked={defaultChecked}
          name={id}
          // color={color}
          size={size}
          checked={value}
          onChange={onChange}
          error={errors && errors[id] && errors[id]?.message}
        />
      }
      label={label}
    />
  );
};
Checkbox.defaultProps = {
  // id: "Switch1",
  color: "white",
  disabled: false,
  size: "small",
  defaultChecked: false,
  label: "",
};
Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
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
  defaultChecked: PropTypes.bool,
  label: PropTypes.string,
};
export default Checkbox;
