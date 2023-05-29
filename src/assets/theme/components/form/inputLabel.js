
// Material Dashboard 2 React Base Styles
import colors from "../../base/colors";
import typography from "../../base/typography";

const { text, info ,grey} = colors;
const { size } = typography;

const inputLabel = {
  styleOverrides: {
    root: {
      fontSize: size.xs,
      color: grey[50],
      lineHeight: 0.6,
      overflow:"visible",
      

      "&.Mui-focused": {
        color: info.main,
      },

      "&.MuiInputLabel-shrink": {
        lineHeight: 1.1,
        fontSize: size.md,

        "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "0.9em",
        },
      },
    },

    sizeSmall: {
      fontSize: size.xs,
      lineHeight: 1.225,

      "&.MuiInputLabel-shrink": {
        lineHeight: 1.2,
        fontSize: size.sm,

        "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "0.72em",
        },
      },
    },
  },
};

export default inputLabel;
