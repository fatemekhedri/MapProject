import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useForm, Form } from "../common/useForm";
import { CssBaseline, Grid } from "@mui/material";
import { Controls } from "../controls/Controls";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
const steps = ["مب", "جستجو", "استعلام", "ثبت سفر"];

const options = [
  { id: "1", title: "آیتم 1" },
  { id: "2", title: "آیتم 2" },
  { id: "3", title: "آیتم 3" },
];
const RadioItems = [
  { id: "مرد", title: "مرد" },
  { id: "زن", title: "زن" },
  { id: "دیگر", title: "دیگر" },
];
const initialValue = {
  id: 0,

  fullName: "",
  mobile: "",
  department: "",
  gender: "male",
  isAlive: true,
  birthDate: new Date("1988-10-31"),
};
function CustomerSearch() {
  const { values, setValues, handleInputChange } = useForm(initialValue);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  return (
    <Form>
      <CssBaseline />
      <Paper style={{ margin: "16px 8px", padding: 8 }} variant="outlined">
        <Grid>
          <Grid item>
            <Box sx={{ width: "100%" }}>
              <Stepper
                sx={{ position: "absolute", left: "25px" }}
                activeStep={0}
                // alternativeLabel
                orientation="vertical"
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="کد ملی"
              name="fullName"
              value={values.fullName}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="موبایل"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
            />
            <Controls.RadioGroup
              label="جنسیت"
              name="gender"
              value={values.gender}
              onChange={handleInputChange}
              items={RadioItems}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Select
              label="دپارتمان"
              name="department"
              value={values.department}
              onChange={handleInputChange}
              options={options}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Checkbox
              label="آیا سفر برگشت دارد؟"
              name="isAlive"
              value={values.isAlive}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Datepicker
              label="تاریخ تولد"
              name="birthDate"
              value={values.birthDate}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Paper>
      <label>{}</label>
      {/* {console.log(values.birthDate)} */}
    </Form>
  );
}

export default CustomerSearch;
