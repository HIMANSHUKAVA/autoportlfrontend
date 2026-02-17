const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#cbd5f5",
      "& fieldset": {
        borderColor: "rgba(148,163,184,0.4)",
      },
      "&:hover fieldset": {
        borderColor: "#38bdf8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#38bdf8",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#94a3b8",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#38bdf8",
    },
    mt: 1,
  };


 const selectstyle = {
  color: "#fff",
  background: "linear-gradient(180deg, #0f172a, #020617)",
  borderRadius: 1.5,
  minWidth: 140,
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.25)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f5c46b",
  },
  "& .MuiSvgIcon-root": {
    color: "#f5c46b",
  },
};

const selectMenuProps = {
  PaperProps: {
    sx: {
      background: "linear-gradient(180deg, #0f172a, #020617)",
      color: "#ffffff",
      borderRadius: 2,
      boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
      mt: 1,
    },
  },
};

const buttonstyle = {
   px: 3,
                        py: 0.8,
                        m: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "999px",
                        color: "#0f172a",
                        background: "linear-gradient(135deg, #f5c46b, #eab308)",
                        boxShadow: "0 6px 18px rgba(245,196,107,0.35)",
                        transition: "all 0.25s ease",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #facc15, #f59e0b)",
                          boxShadow: "0 10px 26px rgba(245,196,107,0.55)",
                          transform: "translateY(-1px)",
                        },

                        "&:active": {
                          transform: "scale(0.96)",
                        },

                        "&.Mui-disabled": {
                          background: "rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.4)",
                          boxShadow: "none",
                        }
}
  export { inputStyle, selectMenuProps, selectstyle , buttonstyle };

