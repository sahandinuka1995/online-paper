import logo from "./logo.svg";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { CssBaseline, Typography, Container } from "@material-ui/core";
import Timer from "./pages/Timer/Timer";

function App() {
  return (
    <div>
      <CssBaseline />
      <MainPage />
    </div>
  );
}

export default App;
