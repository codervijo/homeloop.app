import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme.js";
import { StoreProvider } from "./store.jsx";
import Layout from "./components/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import Compliance from "./pages/Compliance.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ChildView from "./pages/ChildView.jsx";
import Transcript from "./pages/Transcript.jsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/child/:id" element={<ChildView />} />
            <Route path="/transcript" element={<Transcript />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  </ThemeProvider>
);

export default App;
