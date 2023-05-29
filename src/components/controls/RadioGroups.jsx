import React from "react";
import { makeStyles } from "@mui/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import PropTypes from "prop-types";
import {
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const useStyles = makeStyles((theme) => ({
  label: {},
  root: {
    width: "100%",
    fontSize: "0.8rem",
    "&.muirtl-emmicf-MuiFormLabel-root": {
      paddingBottom: "11px !important",
    },
  },
}));
const RadioGroups = (props) => {
  const {
    id,
    label,
    defaultValue,
    value,
    onChange,
    items,
    register,
    errors,
    name,
    size,
    color,
    disabled = false,
  } = props;
  const classes = useStyles();
  // console.log("defaultValue in radio groups", defaultValue);
  return (
    <CacheProvider value={cacheRtl}>
      <div className="d-flex col-12 flex-column">
        <FormLabel
          //  className="d-flex align-items-center px-2"
          error={errors[id] ? !!errors[id] : false}
          classes={{ root: classes.root, label: classes.label }}
        >
          {/* {label}: */}
          {label && `${label}:`}
        </FormLabel>
        <RadioGroup
          defaultValue={defaultValue}
          row
          name={name}
          onChange={onChange}
          value={value}
        >
          {items.map((item, index) => {
            return (
              <FormControlLabel
                disabled={disabled}
                key={`FormControlLabel-${index}`}
                value={item.value}
                size={size}
                color={color}
                control={
                  <Radio
                    id={id}
                    size={size}
                    // {...register(id)}
                    // checked={defaultValue === item.value}
                  />
                }
                label={item.label}
              />
            );
          })}
        </RadioGroup>
        <FormHelperText className="text-danger">
          {errors[id] ? errors[id].message : null}
        </FormHelperText>
      </div>
    </CacheProvider>
  );
};
RadioGroups.defaultProps = {
  // id: "RadioGroup1",
  size: "small",
  color: "white",
  disabled: false,
  errors: {},
  defaultValue: "",
  fullWidth: "fullWidth",
  label: "RadioGroup",
  helperText: "",
  items: [],
};
RadioGroups.propTypes = {
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
  errors: PropTypes.object,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.string,
  helperText: PropTypes.string,
  items: PropTypes.array,
};
export default RadioGroups;
