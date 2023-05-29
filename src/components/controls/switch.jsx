import React from "react";
import {
  FormControlLabel,
  FormControl,
  Switch as MuiSwitch,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";

const Switch = (props) => {
  const {
    id,
    label,
    defaultChecked,
    register,
    errors,
    disabled,
    value,
    onChange,
  } = props;

  //("errors", errors);

  return (
    <FormControl>
      <FormControlLabel
        name={id}
        error={errors && errors[id] && errors[id]?.message}
        sx={{ color: errors[id] && errors[id]?.message ? "red" : "" }}
        control={
          <MuiSwitch
            //  required={true}
            onChange={onChange}
            value={value}
            disabled={disabled}
            defaultChecked={defaultChecked}
            error={errors && errors[id] && errors[id]?.message}
            // {...register(id)}
          />
        }
        label={label}
      />
      <FormHelperText className="text-danger">
        {errors[id] ? errors[id].message : null}
      </FormHelperText>
    </FormControl>
  );
};
Switch.defaultProps = {
  // id: "Switch1",
  color: "white",
  disabled: false,
  size: "small",
  defaultChecked: false,
  label: "",
};
Switch.propTypes = {
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
export default Switch;
