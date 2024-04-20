import {createTheme} from "@mui/material/styles";

import variants from "./variants";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import props from "./props";
import shadows from "./shadows";
import shape from "./shape";
import components from "./components";

const theme = (variant) => {
	//rebeccapurple color if strike happens
  return createTheme(
    {
      spacing: 4,
      breakpoints,
      overrides,
      props,
      typography,
      shadows,
      shape,
      components,
      palette: variant.palette,
    },
    variant.name
  );
};
const themes = variants.map((variant) => theme(variant));

export default themes;
