import * as React from "react";
// import TextField from "@mui/material/TextField";
import Input from "../controls/MDInput";
import AdapterJalali from "@date-io/date-fns-jalali";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from "prop-types";
const JalaiTimePicker = (props) => {
  const { id, label, errors, fullWidth, onChange, value } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <TimePicker
        label={label}
        onChange={onChange}
        value={value}
        // views={['hours', 'minutes']}
        // view="hours"
        mask="__:__:__"
        ampm={false}
        format="HH:mm:ss"
        // inputFormat="HH:mm:ss"
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
JalaiTimePicker.defaultProps = {
  id: "timePicker1",
  errors: {},
  fullWidth: "fullWidth",
  helperText: "",
  label: "",
  value: "",
};
JalaiTimePicker.propTypes = {
  id: PropTypes.string.isRequired,
  errors: PropTypes.object,
  fullWidth: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};
export default JalaiTimePicker;
