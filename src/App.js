import {ThemeProvider} from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import themeList from "./theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={themeList[0]}>
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
