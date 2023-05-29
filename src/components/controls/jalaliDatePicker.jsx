import * as React from "react";
// import TextField from "@mui/material/TextField";
import Input from "../controls/MDInput";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
const JalaliDatePicker = (props) => {
  const { id, label, errors, fullWidth, onChange, value } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        label={label}
        onChange={onChange}
        value={value}
        mask="____/__/__"
        renderInput={(params) => (
          <Input
            {...params}
            fullWidth={fullWidth}
            error={errors[id] ? !!errors[id] : false}
            helperText={errors[id] ? errors[id].message : null}
          />
        )}
      />
    </LocalizationProvider>
  );
};
JalaliDatePicker.defaultProps = {
  id: "DatePicker1",
  errors: {},
  fullWidth: "fullWidth",
  helperText: "",
  label: "",
  value: "",
};
JalaliDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  errors: PropTypes.object,
  fullWidth: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};
export default JalaliDatePicker;
