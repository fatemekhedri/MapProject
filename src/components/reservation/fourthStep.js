import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Fade,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controls } from "../controls/Controls";
// import { DatePicker } from "jalali-react-datepicker";
import { useDispatch, useSelector } from "react-redux";

const passengerCount = [
  { id: 1, title: "1" },
  { id: 2, title: "2" },
  { id: 3, title: "3" },
  { id: 4, title: "4" },
  { id: 5, title: "5" },
  { id: 6, title: "6" },
  { id: 7, title: "7" },
  { id: 8, title: "8" },
  { id: 9, title: "9" },
  { id: 10, title: "10" },
  { id: 11, title: "11" },
  { id: 12, title: "12" },
];
const atDisposalTypes = [
  { id: "turnon", title: "روشن در اختیار" },
  { id: "turnoff", title: "خاموش منتظر" },
];
const comebackOotions = [
  { id: 0, title: "همان روز (50 درصد تخفیف)" },
  { id: 1, title: "یک روز بعد (10 درصد تخفیف)" },
  { id: 2, title: "دو روز بعد (20 درصد تخفیف)" },
  { id: 3, title: "سه روز بعد (25 درصد تخفیف)" },
  { id: 4, title: "چهار روز بعد (30 درصد تخفیف)" },
  { id: 5, title: "پنج روز بعد (35 درصد تخفیف)" },
  { id: 6, title: "شش روز بعد (40 درصد تخفیف)" },
  { id: 7, title: "هفت روز بعد (40 درصد تخفیف)" },
  { id: 8, title: "هشت روز بعد (40 درصد تخفیف)" },
  { id: 9, title: "نه روز بعد (40 درصد تخفیف)" },
  { id: 10, title: "ده روز بعد (40 درصد تخفیف)" },
];
const initialDetails = {
  tripDays: 0,
  tripCarStatus: null,
  carAtDisposalHours: null,
  tripCarType: "",
  passengerCount: 0,
  driverFood: 0,
  hasComeback: 0,
  tripStartDate: "",
  loggageCount: 0,
};
const useStyles = makeStyles((theme) => ({
  root: {
    "& .css-pwcg7p-MuiCollapse-root": { marginTop: "1rem" },
  },
}));

function FourthStep() {
  const trip = useSelector((state) => state.trip.details);
  const dispatch = useDispatch();
  const [tripDetails, setTripDetails] = useState(trip);
  const classes = useStyles();

  function handleDatePicker({ value }) {
    var moment = require("moment-jalaali");
    updateDetails(
      "tripStartDate",
      moment(value).format("jYYYY-jM-jD HH:mm:ss")
    );
  }
  //در صورت تغییر در جزییات سفر، آن را در ریداکس آپدیت می کند
  useEffect(() => {
    dispatch({
      type: "Update_Details",
      payload: { ...tripDetails },
    });
  }, [tripDetails]);

  //نام و مقدار فیلد جزیبات سفر را گرفته و جایگزاری می کند
  const updateDetails = (propertyName, value) => {
    setTripDetails({ ...tripDetails, [propertyName]: value });
    // trip.tripCarStatus == null ? updateDetails("carAtDisposalHours", null) : "";
  };

  //در صورت انتخاب ماشین در اختیار، هم در جزییات سفر ثبت می کند و هم کشوی افزودن ساعت در اختیار را باز می کند
  const handleAtDisposalSelection = (e) => {
    const { name, value } = e.target;
    updateDetails(name, value);
    // setatDisposalDetail(true);
  };
  function handleClearCarAtDisposal() {
    updateDetails("carAtDisposalHours", null);
  }
  //در صورت انتخاب آیا سفر بازگشت دارد
  const handleHasComebackSelection = (e) => {
    const { name, value } = e.target;
    updateDetails(name, value ? 1 : 0); //اگر سفر برگشت داشت مقدار یک را برمیگرداند
    // value ? settripHasComeback(true) : settripHasComeback(false); //جهت مشاهده و مخفی شدن جزِءیات آپشن برگشت سفر
  };

  return (
    <Box paddingY={3} className={classes.root}>
      <FormControl variant="filled" margin="normal" fullWidth>
        <Grid container columns={12} spacing={5}>
          <Grid item xs={12}>
            {/* <DatePicker
              label="تاریخ شروع سفر"
              onClickSubmitButton={handleDatePicker}
            /> */}
          </Grid>
          <Grid item xs={5}>
            <Controls.Select
              label="تعداد مسافر"
              name="passengerCount"
              isRequired={true}
              placeholder="نفر"
              options={passengerCount}
              value={trip.passengerCount}
              onChange={(e) => updateDetails("passengerCount", e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <Controls.Select
              label="تعداد چمدان"
              name="loggageCount"
              options={passengerCount}
              value={trip.loggageCount}
              onChange={(e) => updateDetails("loggageCount", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.RadioGroup
              label="خودرو در اختیار"
              name="tripCarStatus"
              items={atDisposalTypes}
              value={trip.tripCarStatus}
              onDoubleClick={() => updateDetails("tripCarStatus", null)}
              onChange={handleAtDisposalSelection}
            />
          </Grid>
          {/* <div hidden={!trip.tripCarStatus}>
            <Button
              onClick={() => {
                handleClearCarAtDisposal();
                updateDetails("tripCarStatus", null);
              }}
            >
              ریست
            </Button>
          </div> */}
          <Collapse in={trip.tripCarStatus} id="lasjldkasj">
            <div style={{ width: "400px" }}>
              <Grid container>
                <Grid item xs={5}>
                  <Controls.Select
                    label="ساعت های در اختیار"
                    id="atDisposalHours"
                    name="carAtDisposalHours"
                    options={passengerCount}
                    value={trip.carAtDisposalHours}
                    onChange={(e) =>
                      updateDetails("carAtDisposalHours", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </div>
          </Collapse>

          <Grid item xs={12}>
            <Controls.Checkbox
              label="آیا سفر برگشت دارد؟"
              name="hasComeback"
              value={trip.hasComeback}
              onChange={handleHasComebackSelection}
            />
          </Grid>
          <Collapse in={trip.hasComeback}>
            <Grid container columns={12} spacing={5}>
              <Grid item xs={11}>
                <Controls.Select
                  id="comeBackDay"
                  label="زمان بازگشت"
                  name="tripDays"
                  options={comebackOotions}
                  value={trip.tripDays}
                  onChange={(e) => updateDetails("tripDays", e.target.value)}
                />
                <Controls.Checkbox
                  label="آیا هزینه خوراک و جای خواب راننده با مسافر است؟"
                  name="driverFood"
                  value={trip.driverFood}
                  onChange={(e) =>
                    updateDetails("driverFood", e.target.value ? 1 : 0)
                  }
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </FormControl>
    </Box>
  );
}

export default FourthStep;
