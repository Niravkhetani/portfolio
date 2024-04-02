import {colors} from "./colors";

const typography = {
  useNextVariants: true,
  fontFamily: ["Poppins", "sans-serif"].join(","),
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  display1: {fontSize: "4.875rem", fontWeight: 400, lineHeight: 6.5},
  display2: {fontSize: "3.75rem", fontWeight: 400, lineHeight: 5},
  display3: {fontSize: "3rem", fontWeight: 400, lineHeight: 4},
  h1: {
    fontSize: "2.5rem",
    fontWeight: 400,
    lineHeight: 2.75,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 2.25,
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: 1.75,
  },
  h4: {
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: 1.2,
  },
  h6: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.2,
  },
  ui02: {
    fontSize: "0.688rem",
    fontWeight: 400,
    lineHeight: 1,
  },
  sidebar: {
    fontSize: 16,
  },
  button: {
    textTransform: "none",
  },
  greetingHeader: {
    fontWeight: "700",
    lineHeight: "68px",
    fontSize: "xxx-large",
  },
  roles: {
    fontWeight: "600",
    fontSize: "2rem",
    lineHeight: "68px",
    marginRight: "10px !important",
  },
  experienceCardTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: colors.default__title,
  },
  experienceCardSubtitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: colors.default__title,
  },
  experienceCardDuration: {
    fontSize: "12px",
    fontWeight: 400,
    color: colors.default__title,
  },
  experienceCardDescription: {
    fontSize: "15px",
    fontWeight: 400,
    color: colors.default__description,
    lineHeight: "1.5",
    // letterSpacing: "0.00938em",
    // display: "-webkit-box",
    // "-webkit-line-clamp": "4",
    // "-webkit-box-orient": "vertical",
    // height: "82px",
  },
};

export default typography;
