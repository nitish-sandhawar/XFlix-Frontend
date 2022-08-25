// import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { Route,  Switch } from "react-router-dom";
import { CssBaseline,ThemeProvider } from "@mui/material";
import theme from "./theme";
import Videos from './components/Videos';
import VideoUpload from './components/VideoUpload';


export const backEndPoint = 'https://993a7039-3719-4b8d-89d2-9b8ad7a592df.mock.pstmn.io/v1/videos';

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline enableColorScheme />
      <div className="App">
        <Switch>
        <Route path="/" exact><HomePage /></Route>
        <Route path="/videos/:id" ><Videos /></Route>
        {/* <Route path="/upload-videos" ><VideoUpload /></Route> */}
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
