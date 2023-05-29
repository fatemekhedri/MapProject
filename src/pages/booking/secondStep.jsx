import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Fade,
  FormControl,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controls } from "../../components/controls/Controls";
import Select from "../../components/controls/Select";
import Box from "../../components/controls/Box";
// import { DatePicker } from "jalali-react-datepicker";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import JalalDateTimePicker from "../../components/controls/jalaliDateTimePicker";
import TimePicker from "../../components/controls/timePicker";
import Input from "../../components/controls/MDInput";

const passengerCountList = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];
const atDisposalTypes = [
  { value: "turnon", label: "روشن در اختیار" },
  { value: "turnoff", label: "خاموش منتظر" },
];
const comebackOotions = [
  { value: 0, label: "همان روز (50 درصد تخفیف)" },
  { value: 1, label: "یک روز بعد (10 درصد تخفیف)" },
  { value: 2, label: "دو روز بعد (20 درصد تخفیف)" },
  { value: 3, label: "سه روز بعد (25 درصد تخفیف)" },
  { value: 4, label: "چهار روز بعد (30 درصد تخفیف)" },
  { value: 5, label: "پنج روز بعد (35 درصد تخفیف)" },
  { value: 6, label: "شش روز بعد (40 درصد تخفیف)" },
  { value: 7, label: "هفت روز بعد (40 درصد تخفیف)" },
  { value: 8, label: "هشت روز بعد (40 درصد تخفیف)" },
  { value: 9, label: "نه روز بعد (40 درصد تخفیف)" },
  { value: 10, label: "ده روز بعد (40 درصد تخفیف)" },
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
  luggageCount: 0,
};
const useStyles = makeStyles((theme) => ({
  root: {
    // "& .css-pwcg7p-MuiCollapse-root": { marginTop: "1rem" },
  },
}));

function SecondStep() {
  const trip = useSelector((state) => state.trip.details);
  const dispatch = useDispatch();
  const [tripDetails, setTripDetails] = useState(trip);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  // const [isComeBack, SetIsComeBack] = useState(false);
  const classes = useStyles();

  function handleDatePicker(value) {
    // console.log("value in date picker", value,moment(value).format("jYYYY-jMM-jDD HH:mm:ss"));
    setStartDate(value);
    updateDetails("tripStartDate", value);
  }
  const handleTimeChange = (value) => {
    // const startTimeStandardFormat = value.toLocaleTimeString();
    setStartTime(value);
  };
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
  const handleDetailSelection = (e) => {
    const { name, value, checked } = e.target;
    // console.log("name, value, checked", name, value, checked);
    updateDetails(name, checked ? 1 : 0);

    //اگر سفر برگشت داشت مقدار یک را برمیگرداند
    // value ? settripHasComeback(true) : settripHasComeback(false); //جهت مشاهده و مخفی شدن جزِءیات آپشن برگشت سفر
  };

  return (
    <Box paddingy={1} className={classes.root}>
      <FormControl variant="filled" margin="normal" fullWidth>
        <Grid container columns={12} spacing={2.5}>
          <Grid pt="10px" pl="22px" xs={12}>
            <JalalDateTimePicker
              id={"start_date"}
              onChange={handleDatePicker}
              value={tripDetails.tripStartDate}
              label="تاریخ شروع سفر"
              // onClickSubmitButton={handleDatePicker}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TimePicker
              label="زمان حرکت"
              value={startTime}
              onChange={handleTimeChange}
            />
            
          </Grid> */}
          <Grid
            container
            width={"100%"}
            display="flex"
            justifyContent={"space-between"}
            pl="20px"
            pt="24px"
          >
            <Grid item xs={5}>
              <Select
                label="تعداد مسافر"
                name="passengerCount"
                isRequired={true}
                id="passengerCount"
                // placeholder="نفر"
                options={passengerCountList}
                value={tripDetails.passengerCount}
                onChange={(e, data) => {
                  updateDetails("passengerCount", data.value || 0);
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <Controls.Select
                label="تعداد چمدان"
                name="luggageCount"
                options={passengerCountList}
                value={tripDetails.luggageCount}
                onChange={(e,data) => updateDetails("luggageCount", data.value || 0)}
              />
            </Grid>
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

          <Grid pt="11px" pl="20px" xs={12}>
            <Controls.Checkbox
              name="tripDisability"
              id="tripDisability"
              value={tripDetails.tripDisability}
              onChange={handleDetailSelection}
              label="آیا مسافر معلول است؟"
            />
          </Grid>
          <Grid pl="20px" xs={12}>
            <Controls.Checkbox
              name="tripPet"
              id="tripPet"
              label="آیا حیوان خانگی به همراه دارد؟"
              value={tripDetails.tripPet}
              onChange={handleDetailSelection}
            />
          </Grid>
          <Grid pt="0" pl="20px" xs={12}>
            {/* <FormControlLabel
              control={
                <Checkbox
                  // label="آیا سفر برگشت دارد؟"
                  name="hasComeback"
                  id="hasComeback"
                  checked={trip.hasComeback}
                  onChange={handleDetailSelection}
                />
              }
              label="آیا سفر برگشت دارد؟"
            /> */}
            <Controls.Checkbox
              label="آیا سفر برگشت دارد؟"
              disabled={tripDetails.tripCarStatus ? true : false}
              name="hasComeback"
              id="hasComeback"
              value={tripDetails.hasComeback}
              onChange={handleDetailSelection}
            />
          </Grid>
          <Grid item xs={12}>
            <Collapse in={tripDetails.hasComeback}>
              <Controls.Select
                id="comeBackDay"
                label="زمان بازگشت"
                name="tripDays"
                options={comebackOotions}
                value={tripDetails.tripDays}
                onChange={(e,data) => updateDetails("tripDays", data.value || 0)}
              />

              <Controls.Checkbox
                label="آیا هزینه خوراک و خواب راننده با مسافر است؟"
                name="driverFood"
                value={tripDetails.driverFood}
                onChange={(e) =>
                  updateDetails("driverFood", e.target.checked ? 1 : 0)
                }
              />
            </Collapse>
          </Grid>
          <Grid item xs={12}>
            <Controls.RadioGroup
              label="خودرو در اختیار"
              name="tripCarStatus"
              disabled={tripDetails.hasComeback ? true : false}
              items={atDisposalTypes}
              value={tripDetails.tripCarStatus}
              size={"sm"}
              // color="text"
              pb="20px"
              // defaultValue="turnoff"
              onDoubleClick={() => updateDetails("tripCarStatus", null)}
              onChange={handleAtDisposalSelection}
            />
          </Grid>
          <Grid item xs={12}>
            <Collapse in={tripDetails.tripCarStatus} id="lasjldkasj">
              <Controls.Select
                label="ساعت های در اختیار"
                id="atDisposalHours"
                name="carAtDisposalHours"
                options={passengerCountList}
                value={tripDetails.carAtDisposalHours}
                onChange={(e,data) =>
                  updateDetails("carAtDisposalHours", data.value || 0)
                }
              />
            </Collapse>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}

export default SecondStep;
