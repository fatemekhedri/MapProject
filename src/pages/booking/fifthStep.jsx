import React, { useState, useEffect } from "react";
import { Controls } from "../../components/controls/Controls";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/controls/MDInput";
// import Typography from "../../components/controls/MDTypography";

// import Box from "../../components/controls/Box";
import { Stack, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// const initalValues = {
//   pgr_fname: "",
//   pgr_lname: "",
//   pgr_codemelli: "",
//   pgr_mobile: "",
//   pgr_email: "",
// };
const schema = Yup.object().shape({
  firstName: Yup.string().label("First Name").trim().required().min(3).max(64),
  lastName: "",
  codeMelli: "",
  mobile: "",
  email: "",
});

const initialValues = {
  id: "",
  firstName: "",
  lastName: "",
  codeMelli: "",
  gender: "",
  mobile: "",
  address: "",
  phone: "",
  email: "",
};
const initialFormErrorValues = {
  firstName: "",
  lastName: "",
  codeMelli: "",
  mobile: "",
  phone: "",
  email: "",
};
const FifthStep = () => {
  const commuter = useSelector((state) => state.trip.commuter);
  const dispatch = useDispatch();
  // const [tripCommuter, setTripCommuter] = useState(trip);
  const [values, setValues] = useState(initialValues);
  const [formError, setFormError] = useState(initialFormErrorValues);
  const [firstName, setFirstName] = useState("");
  const [passenger, setPassenger] = useState({});
  const [isPreviousPassenger, setIsPreviousPassenger] = useState(true);
  //   const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    let tempValues = { ...values };
    let selectedPassenger = {};
    tempValues[name] = value;
    // console.log("temp values--->", tempValues);
    setValues({ ...tempValues });
    // validate(target);
    dispatch({
      type: "Update_Commuter_Info",
      payload: { ...tempValues },
    });
   
  };
  const validate = ({ target }) => {
    const { name, value } = target;
    console.log("oomadam validate too onblur", value, name);
    let errors = { ...formError };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // javascript
    let persian_alpha_codepoints = /^[\u0600-\u06FF\s]+$/;
    let numberRegex = /^\d+$/;
    let phoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value) {
          errors[name] = "نام و نام خانوادگی اجباری است";
        } else if (!persian_alpha_codepoints.test(value)) {
          errors[name] = "لطفا حروف فارسی وارد نمایید";
        } else {
          errors[name] = "";
        }
        break;
      case "email":
        if (!value) {
          errors.email = "ایمیل اجباری است";
        } else if (!regex.test(value)) {
          errors.email = "ایمیل وارد شده معتبر نمیباشد";
        } else {
          errors[name] = "";
        }
        break;
      case "codeMelli":
      case "phone":
      case "mobile":
        if (!value) {
          errors[name] = "این فیلد اجباری است";
        } else if (!numberRegex.test(value)) {
          errors[name] = "لطفا فقط عدد وارد نمایید";
        } else {
          errors[name] = "";
        }
        break;
      // case "mobile":
      //   if (!value) {
      //     errors[name] = "این فیلد اجباری است";
      //   } else if (!value.match(phoneNumber)) {
      //     errors[name] = "شماره همراه معتبر نمی باشد";
      //   } else {
      //     errors[name] = "";
      //   }
      //   break;

      default:
        errors = { ...initialFormErrorValues };
        break;
    }
    console.log("error---->", errors);
    setFormError({ ...errors });
    return errors;
  };
  return (
    <Stack direction="column" spacing={2}>
      {" "}
      {/* <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <>
           
            <Input
              //  {...field}
              //  fullWidth
              //  sx={{ maxWidth: 600 }}
              //  label="First Name"
              //  margin="dense"
              //  required
              //  value={firstname}
              //  onChange={onChange}
              label="نام"
              {...field}
              required
              value={values.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName && `${errors.firstName.message}`}
            />
          </>
        )}
      /> */}
      <Input
        label="نام"
        name="firstName"
        value={values.firstName}
        onChange={handleInputChange}
        onBlur={validate}
        error={formError.firstName}
        helperText={formError.firstName}
      />
      <Controls.Input
        label="نام خانوادگی"
        name="lastName"
        value={values.lastName}
        onChange={handleInputChange}
        onBlur={validate}
        error={formError.lastName}
        helperText={formError.lastName}
      />
      <Controls.Input
        label="کد ملی"
        name="codeMelli"
        value={values.codeMelli}
        onChange={handleInputChange}
        onBlur={validate}
        error={formError.codeMelli}
        helperText={formError.codeMelli}
      />
      <Controls.Input
        label="موبایل"
        name="mobile"
        value={values.mobile}
        onChange={handleInputChange}
        onBlur={validate}
        error={formError.mobile}
        helperText={formError.mobile}
      />
      <Controls.Input
        label="ایمیل"
        name="email"
        value={values.email}
        onChange={handleInputChange}
        onBlur={validate}
        error={formError.email}
        helperText={formError.email}
      />
      <Controls.Input
        label="تلفن"
        name="phone"
        value={values.phone}
        onChange={handleInputChange}
        onBlur={validate}
        error={formError.phone}
        helperText={formError.phone}
      />
    </Stack>
  );
};
export default FifthStep;
