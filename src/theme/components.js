import {colors} from "./colors";

const components = {
  MuiButton: {
    variants: [
      {
        props: {variant: "outline-primary"},
        style: {
          color: colors.white,
          backgroundColor: colors.primary,
          borderColor: colors.white,
          "&:hover": {
            color: colors.white,
            backgroundColor: colors.primary,
            borderColor: colors.white,
          },
          "&:not(:disabled):not(.disabled).active": {
            color: colors.white,
            backgroundColor: colors.primary,
            borderColor: colors.white,
          },
          "&:disabled": {
            color: colors.white,
            backgroundColor: colors.primary,
            borderColor: colors.white,
            opacity: "0.35",
          },
        },
      },
      {
        props: {variant: "outlined-secondary"},
        style: {
          color: colors.white,
          backgroundColor: colors.secondary__light,
          borderColor: colors.white,
          "&:hover": {
            color: colors.white,
            backgroundColor: colors.secondary__light,
            borderColor: colors.white,
          },
          "&:not(:disabled):not(.disabled).active": {
            color: colors.white,
            backgroundColor: colors.secondary__light,
            borderColor: colors.white,
          },
        },
      },
      {
        props: {variant: "outlined"},
        style: {
          color: colors.white,
          backgroundColor: "transparent",
          border: "1px solid rgba(0, 0, 0, 0.25)",
          "&:hover": {
            color: colors.white,
            backgroundColor: colors.secondary__light,
            border: "1px solid rgba(0, 0, 0, 0.25)",
          },
          "&:not(:disabled):not(.disabled).active": {
            color: colors.white,
            backgroundColor: colors.secondary__light,
            border: "1px solid rgba(0, 0, 0, 0.25)",
          },
        },
      },
      {
        props: {variant: "filled"},
        style: {
          background: "-webkit-linear-gradient(225deg, rgb(41, 129, 154) 0%, rgb(65, 207, 255) 100%)",
          color: colors.white,
          backgroundColor: "transparent",
          border: "1px solid rgba(0, 0, 0, 0.25)",
          maxWidth: "300px",
          width: "95%",
          appearance: "menulist-button",
          padding: "16px 0 !important",
          borderRadius: "20px",
          fontSize: "20px",
          "&:hover": {
            transform: "scale(1.05)",
            transition: "all 0.4s ease-in-out 0s",
            color: colors.white,
            backgroundColor: colors.secondary__light,
            border: "1px solid rgba(0, 0, 0, 0.25)",
          },
          "&:not(:disabled):not(.disabled).active": {
            color: colors.white,
            backgroundColor: colors.secondary__light,
            border: "1px solid rgba(0, 0, 0, 0.25)",
          },
        },
      },
    ],
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "&.outlined-border": {
          "& fieldset": {
            border: `1px solid rgba(0, 0, 0, 0.20);`,
            borderRadius: "2px",
          },
          "& .MuiInputBase-input:hover + fieldset": {
            border: `1px solid rgba(0, 0, 0, 0.20);`,
            borderRadius: "2px",
          },
          "& .MuiInputBase-input:focus + fieldset": {
            border: `1px solid ${colors.primary__lighter};`,
            borderRadius: "2px",
          },
          "& .Mui-error .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${colors.primary__lighter} !important`,
            borderRadius: "2px",
          },
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        "&.outline-border": {
          textAlign: "left",
          borderRadius: 2,
          color: colors.white,
          boxShadow: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${colors.white} !important`,
          },
        },
      },
    },
  },
  MuiButtonGroup: {
    variants: [
      {
        props: {variant: "text"},
        style: {
          color: colors.black,
          maxHeight: "34px",
          border: `1px solid ${colors.border_color}`,
          borderRadius: "2px",
          "& .MuiButtonGroup-grouped": {
            color: colors.black,
            borderColor: colors.border_color,
            minWidth: "54px",
            fontWeight: 550,
          },
          "&:not(:disabled):not(.disabled).active": {
            color: colors.btnText__dark,
            backgroundColor: colors.primary,
            borderColor: colors.white,
          },
          "& .Mui-disabled": {
            color: colors.btnText__dark,
            background: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
      {
        props: {variant: "outline-button-group-primary"},
        style: {
          color: colors.black,
          maxHeight: "34px",
          border: `1px solid ${colors.border_color}`,
          borderRadius: "2px",
          "& .MuiButtonGroup-grouped": {
            color: colors.black,
            borderColor: colors.border_color,
            minWidth: "54px",
            fontWeight: 550,
          },
          "&:not(:disabled):not(.disabled).active": {
            color: colors.orange__dark,
            backgroundColor: colors.primary,
            borderColor: colors.white,
          },
          "& .Mui-disabled": {
            color: colors.btnText__dark,
            background: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
    ],
  },
  MuiLink: {
    variants: [
      {
        props: {variant: "header-navbar"},
        style: {
          color: colors.secondary__light,
          fontWeight: "500",
          "&:hover": {
            background: colors.primary__lighter,
            textDecoration: "unset",
            transition: "all 0.3s ease-in-out 0s",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          },
          //   "&:not(:disabled):not(.disabled).active": {
          //     color: colors.secondary__light,
          //     backgroundColor: colors.secondary__light,
          //     borderColor: colors.secondary__light,
          //   },
          //   "& .Mui-disabled": {
          //     color: colors.secondary__light,
          //     background: "rgba(0, 0, 0, 0.05)",
          //   },
        },
      },
    ],
  },
  MuiPaper: {
    variants: [
      {
        props: {variant: "header"},
        style: {
          zIndex: 10,
          boxSizing: "border-box",
          position: "sticky",
          margin: 0,
          background: colors.primary,
          maxHeight: "80px",
          border: `1px solid ${colors.border_color}`,
          borderRadius: "2px",
          //   clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 70% 95%, 0px 100%)",
        },
      },
      {
        props: {variant: "about-bio-info"},
        style: {
          zIndex: 10,
          boxSizing: "border-box",
          position: "sticky",
          margin: 0,
          background: colors.primary,
          border: `1px solid ${colors.border_color}`,
          borderRadius: "2px",
          clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 70% 95%, 0px 100%)",
          color: colors.secondary__light,
          padding: "80px 65px !important",
        },
      },
    ],
  },
};

export default components;
