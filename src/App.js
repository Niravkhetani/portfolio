import {ThemeProvider} from "@mui/material";
import "./App.css";
import Home from "./pages/Home/Home";
import themeList from "./theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={themeList[0]}>
        <div className="main-content">
          <Home />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
