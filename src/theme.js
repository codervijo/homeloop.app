import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4F8EF7", contrastText: "#fff" },
    secondary: { main: "#F5F7FA", contrastText: "#1a2230" },
    background: { default: "#FAFBFD", paper: "#ffffff" },
    text: { primary: "#1a2230", secondary: "#5b6675" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: `Roboto, system-ui, -apple-system, "Segoe UI", sans-serif`,
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18, paddingBlock: 10 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.04)",
          border: "1px solid #eef1f6",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1a2230",
          boxShadow: "none",
          borderBottom: "1px solid #eef1f6",
        },
      },
    },
  },
});

export default theme;
