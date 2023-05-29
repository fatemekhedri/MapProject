import { useForm, Controller } from "react-hook-form";
import { Grid, Typography, Container, Icon } from "@mui/material";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import { useEffect, useRef } from "react";
import Input from "./MDInput";
import FileUpload from "./fileUpload";
import JalalDatePicker from "./jalaliDatePicker";
import JalalDateTimePicker from "./jalaliDateTimePicker";
import Select from "./Select";
import RadioGroup from "./RadioGroups";
import Switch from "./switch";
import CheckBox from "./Checkbox";
import Button from "./MDButton";
import Gridview from "./Gridview";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "./Box";

import Accordion from "./Accordion";

const { white } = colors;
const { borderRadius, borderWidth } = borders;
const MainForm = ({
  formData,
  returnData,
  isCustomDesign = true,
  returnSelect = () => null,
}) => {
  const {
    title,
    icon,
    inputInfo,
    rowCount,
    buttonInfo,
    data,
    schema,
    accordionInfo,
    gridViewHeaders,
    // gridviewInfo,
    rowData,
  } = formData;

  //const textInput = useRef(null);
  const colSize = `col-${12 / rowCount}`;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset(data);
    // textInput?.current?.focus();
  }, [data]);
  const onSubmit = (data) => {
    // console.log("onSubmit", data);
    returnData(data);
  };
  const renderTextField = (item) => {
    const { id, label, type, helperText = "", info = false } = item;

    return (
      <Controller
        control={control}
        name={id}
        defaultValue={data && data[id] ? data[id] : ""}
        render={({ field: { onChange, value } }) => (
          <Input
            id={id}
            type={type}
            // onChange={onChange}
            onChange={(e) => {
              onChange(e.target.value);
              returnSelect(id, e.target.value);
            }}
            value={value}
            //ref={textInput}
            //defaultValue={data && data[id] ? data[id] : ""}
            // defaultValue={data?.pgr_fname}
            label={label}
            info={info}
            error={errors && errors[id] && errors[id]?.message}
            helperText={
              errors && errors[id] && errors[id].message
                ? errors[id].message
                : helperText
            }
            // {...register(id)}
            fullWidth
            // size="small"
            // validationSchema={{
            //   required: "Todo text is required",
            //   minLength: {
            //     value: 3,
            //     message: "Please enter a minimum of 3 characters",
            //   },
            // }}
            // required
          />
        )}
      />
    );
  };
  const renderRadioGroup = (item) => {
    const { id, label, list = [] } = item;
    return (
      <Controller
        control={control}
        name={id}
        defaultValue={data && data[id] ? data[id] : ""}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            onChange={onChange}
            value={value}
            id={id}
            label={label}
            items={list}
            errors={errors}
            defaultValue={data && data[id] ? data[id] : ""}
            // register={register}
          />
        )}
      />
      // <RadioGroup
      //   id={id}
      //   label={label}
      //   items={list}
      //   errors={errors}
      //   defaultValue={data && data[id] ? data[id] : ""}
      //   register={register}
      // />

      // <FormControlLabel
      //   name={id}
      //   label={label}
      //   control={
      //     <Checkbox
      //       defaultChecked={data && data[id] ? data[id] : false}
      //       {...register(id)}
      //       style={{ color: errors[id] ? "red" : "" }}
      //     />
      //   }
      // />
    );
  };
  const renderCheckbox = (item) => {
    const { id, label } = item;
    return (
      <Controller
        control={control}
        name={id}
        //defaultValue={data && data[id] ? data[id] : ""}
        render={({ field: { onChange, value } }) => (
          <CheckBox
            defaultChecked={data && data[id] ? data[id] : false}
            name={id}
            label={label}
            onChange={onChange}
            value={value}
            // {...register(id)}
            //style={{ color: errors[id] ? "red" : "" }}
          />
        )}
      />
    );
  };
  const renderlabel = (item) => {
    const { id, label } = item;
    return <Typography variant="h6">{label}</Typography>;
  };
  const renderDropDown = (item) => {
    const {
      id,
      label,
      list = [],
      // onChange = () => null,
      onClick = () => null,
    } = item;
    return (
      <Controller
        control={control}
        name={id}
        defaultValue={data && data[id] ? data[id] : ""}
        render={({ field: { ref, onChange, value, ...field } }) => (
          <Select
            label={label}
            options={list}
            id={id}
            errors={errors}
            //register={register}
            onChange={(_, data) => {
              onChange(data.value);
              returnSelect(id, data.value);
            }}
            // onChange={onChange}
            // onChange={() => returnSelect(value)}
            onClick={onClick}
            // value={value}
            name={id}
            // defaultValue={data && data[id] ? data[id] : ""}
            value={value}
          />
        )}
      />
    );
  };
  const renderSwitch = (item) => {
    const { id, label } = item;
    return (
      <Controller
        control={control}
        name={id}
        defaultValue={data && data[id] ? data[id] : ""}
        render={({ field: { onChange, value } }) => (
          <Switch
            id={id}
            defaultChecked={data && data[id] ? data[id] : ""}
            errors={errors}
            onChange={onChange}
            value={value}
            //register={register}
            label={label}
          />
        )}
      />
    );
  };
  const renderDateTimePicker = (item) => {
    const { id, label } = item;
    return (
      <Controller
        control={control}
        name={id}
        defaultValue={data && data[id] ? data[id] : ""}
        render={({ field: { onChange, value } }) => (
          <JalalDateTimePicker
            id={id}
            onChange={onChange}
            value={value}
            // defaultValue={data && data[id] ? data[id] : ""}
            //  data={data}
            label={label}
            errors={errors}
            helperText={errors}
            // register={register}
            fullWidth="fullWidth"
          />
        )}
      />
    );
  };
  const renderDatePicker = (item) => {
    const { id, label } = item;
    return (
      <Controller
        control={control}
        name={id}
        defaultValue={data && data[id] ? data[id] : ""}
        render={({ field: { onChange, value } }) => (
          <JalalDatePicker
            id={id}
            onChange={onChange}
            value={value}
            // defaultValue={data && data[id] ? data[id] : ""}
            //  data={data}
            label={label}
            errors={errors}
            helperText={errors}
            // register={register}
            fullWidth="fullWidth"
          />
        )}
      />
    );
  };
  const renderFileUpload = (item) => {
    return <FileUpload id={item.id} fileTitle={item.label} />;
  };
  // function handleDatePicker({ value }) {
  //   console.log("omadddd");
  //   var moment = require("moment-jalaali");
  //   console.log("date picker :", moment(value).format("jYYYY-jM-jD HH:mm:ss"));
  // }
  const renderTools = (item) => {
    switch (item.typeForCheck) {
      case "input":
        return renderTextField(item);
      case "dropdown":
        return renderDropDown(item);

      case "radioGroup":
        return renderRadioGroup(item);

      case "checkbox":
        return renderCheckbox(item);
      case "datePicker":
        return renderDatePicker(item);
      case "dateTimePicker":
        return renderDateTimePicker(item);
      case "switch":
        return renderSwitch(item);
      case "fileUpload":
        return renderFileUpload(item);
      case "label":
        return renderlabel(item);
      default:
        return renderTextField(item);
    }
  };
  const renderAccordion = (renderInfo) => {
    return (
      <Grid>
        {renderInfo && (
          <div className="col-12 mt-2 d-flex flex-wrap">
            {renderInfo.map((item, index) => (
              // برای رندر کردن اینپوت ها {textbox , select , checkbox , radioButton}
              <div
                key={item.id ? item.id : index}
                className={`d-flex px-3 align-items-center mb-3 ${colSize}`}
              >
                {renderTools(item)}
              </div>
            ))}
          </div>
        )}
      </Grid>
    );
  };
  const renderButton = (item) => {
    const {
      label,
      size,
      id,
      buttonType,
      variant = "outlined",
      startIcon,
      endIcon,
      color,
      fullWidth,
      disabled,
      onClick,
    } = item;
    return (
      <Button
        className={`${isCustomDesign ? "mx-3" : "mt-3"} px-5`}
        // px={5}
        // mx={3}
        key={`btn-${id}`}
        disabled={disabled}
        type={buttonType}
        fullWidth
        variant={variant}
        color={color}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={onClick}
        //   className={
        //     validate() && item.checkedValidatedForm
        //       ? classForDisabledButton
        //       : item.className
        //   }
        size={size}
      >
        {label}
      </Button>
    );
  };
  return (
    <Container maxWidth="xl">
      <Box
        bgColor="white"
        borderRadius={borderRadius.xxxl}
        sx={
          isCustomDesign && {
            height: "100%",
            border: "1px solid #F5F5F5",
            boxShadow: "0px 28px 28px rgba(76, 87, 125, 0.02)",
          }
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {title && (
            <Box
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius={borderRadius.lg}
              coloredShadow="info"
              sx={{ display: "flex" }}
            >
              <Icon
                fontSize="medium"
                sx={{ marginRight: "0.25rem", color: white.main }}
              >
                add-circle
              </Icon>
              {/* <Groups fontSize="large" sx={{ marginRight: "1rem" }} /> */}
              <Typography variant="h6" color={white.main}>
                ثبت اطلاعات
              </Typography>
            </Box>
          )}
          {/* <Typography variant="h6" color="dark">
            {title}
          </Typography> */}
          <Box
            mx={isCustomDesign ? 2 : 0}
            mt={4}
            mb={isCustomDesign ? 4 : 0}
            // py={2}
            // px={2}
            // sx={{
            //   height: "100%",
            //   // backgroundColor: "#FFFFFF",
            //   border: "1px solid #F2ECFF",
            //   boxShadow: "0px 12px 24px rgba(0, 72, 217, 0.05)",
            //   borderRadius: 1.5,
            // }}
          >
            {inputInfo && (
              <div className="col-12 d-flex flex-wrap">
                {inputInfo.map((item, index) => (
                  // برای رندر کردن اینپوت ها {textbox , select , checkbox , radioButton}
                  <div
                    key={`input-${item.id ? item.id : index}`}
                    className={`d-flex ${
                      isCustomDesign && "px-3"
                    } align-items-center mb-3 ${colSize}`}
                  >
                    {renderTools(item)}
                  </div>
                ))}
              </div>
            )}
            {/* <AdvancedDialog
              title="حذف"
              content="آیا از حذف رکورد مطمئن هستید؟"
              agree="بلی"
              disAgree="خیر"
            /> */}
            {accordionInfo && accordionInfo.length > 0 && (
              <div className="d-flex flex-wrap justify-content-centrer my-3">
                {accordionInfo.map((item, index) => {
                  return (
                    <Accordion
                      key={`accordion-${item.id ? item.id : index}`}
                      id={item.id}
                      title={item.title}
                      renderInfo={renderAccordion(item.renderInfo)}
                    />
                  );
                })}
              </div>
            )}

            {/* رندر کردن دگمه ها */}
            {buttonInfo && buttonInfo.length > 0 && (
              <div className="d-flex flex-wrap justify-content-centrer my-3">
                {buttonInfo.map((item, index) => {
                  return (
                    <div
                      key={`button-${item.id ? item.id : index}`}
                      className={`d-flex align-items-center ${colSize}`}
                    >
                      {renderButton(item)}
                    </div>
                  );
                })}
              </div>
            )}
          </Box>
        </form>
      </Box>
      {rowData && rowData.length > 0 && (
        <Gridview
          mt={5}
          // rows={gridviewInfo}
          rowData={rowData}
          columns={gridViewHeaders}
          title={title}
          icon={icon}
        />
      )}
    </Container>
  );
};
export default MainForm;
