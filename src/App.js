import "./Assets/Styles/App.scss";
import Landing from "./Pages/Landing";
import theme from "./Components/Theme";
import { ThemeProvider } from "@mui/material/styles";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SignUp />
      </div>
    </ThemeProvider>
  );
}
export default App;
