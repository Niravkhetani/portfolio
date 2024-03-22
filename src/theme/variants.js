import {green} from "@mui/material/colors";
import {colors} from "./colors";

const greyVariant = {
  name: "Grey",
  palette: {
    primary: {
      main: colors.primary,
      contrastText: "#FFF",
    },
    secondary: {
      main: colors.secondary,
      contrastText: "#FFF",
    },
  },
};
// const greenVariant = {
//   name: "Green",
//   palette: {
//     primary: {
//       main: green[800],
//       contrastText: "#FFF",
//     },
//     secondary: {
//       main: green[500],
//       contrastText: "#FFF",
//     },
//   },
// };

const variants = [greyVariant];

export default variants;
