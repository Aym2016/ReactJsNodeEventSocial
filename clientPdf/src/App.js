import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register"; 
//import Upload from "./pages/file/upload"; 
//import FileCrud from "./pages/file/FileCrud"; 
//import ListFiles from "./pages/file/ListFiles";
import UploadingPdf from "./pages/file/UploadingPdf";
//import StylometryForm from "./pages/file/StylometryForm";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import StylometryForm from "./pages/file/StylometryForm";
import React from "react";
/*<Route path="/upload"> 
{user ? <Redirect to="/" /> : <Upload />}
</Route>*/ 
/*<Route path="/filecrud">
          <FileCrud />
        </Route>
        <Route path="/Listfiles">
          <ListFiles />
          </Route>*/
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
         
       
        <Route path="/register"> 
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        
          <Route path="/UploadingPdf">
          <UploadingPdf />
          </Route>
          <Route path="/Stylometry">
          <StylometryForm />
          </Route>
          
      </Switch>
    </Router>
  );
}

export default App;
