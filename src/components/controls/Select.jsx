import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  TextField,
  Autocomplete,
  FormHelperText,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Select = (props) => {
  const {
    id,
    label,
    disabled,
    options,
    errors,
    size,
    fullWidth,
    register,
    value,
    onChange,
    labelColor = "",
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      // "& .muirtl-1nrlq1o-MuiFormControl-root": {
      //   minWidth: "70px",
      //   width: "200px",
      // },
      "& .muirtl-1l1zq0-MuiFormLabel-root-MuiInputLabel-root.MuiInputLabel-shrink ~.MuiInputBase-root .MuiOutlinedInput-notchedOutline legend":
        {
          fontSize: "0.8rem",
        },
      "& .muirtl-1l1zq0-MuiFormLabel-root-MuiInputLabel-root.MuiInputLabel-shrink":
        {
          fontSize: "1rem",
        },
      "& .MuiFormLabel-root": {
        color: labelColor,
      },
      width: "100%",
      // marginBottom: "2rem",
    },
  }));
  const classes = useStyles();
 // const [selectValue, setSelectValue] = useState(value);
 //console.log("select",value)
  return (
    <CacheProvider value={cacheRtl}>
      <FormControl
        fullWidth={fullWidth}
        //  variant="outlined"
        className={classes.root}
        size={size}
      >
        {/* <InputLabel>{label}</InputLabel> */}
        <Autocomplete
          disablePortal
          onChange={onChange}
          // onChange={(_, v) => setSelectValue(v?.value)}
          id={id}
          options={options}
       
          value={
            options.length > 0 && value !== ""
              ? options.find((option) => option.value === value)
              : null
          }
          // sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
        {/* <MuiSelect
          // required
          id={id}
          label={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          error={errors && errors[id] && errors[id]?.message}
          //{...register(id)}
          sx={{
            textAlign: "start",
            padding: 0,
          }}
        >
          {options.map((item) => {
            return (
              <MenuItem
                sx={{
                  justifyContent: "end !important",
                }}
                value={item.value}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </MuiSelect> */}
        <FormHelperText
          sx={{
            color: "red",
          }}
        >
          {errors && errors[id] && errors[id]?.message}
        </FormHelperText>
      </FormControl>
    </CacheProvider>
  );
};
Select.defaultProps = {
  // id: "Select1",
  size: "small",
  color: "white",
  disabled: false,
  error: false,
  defaultValue: "",
  fullWidth: "fullWidth",
  label: "Select",
  helperText: "",
  options: [],
};
Select.propTypes = {
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
  error: PropTypes.bool,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.array,
};
export default Select;
