import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Landing } from "./components/LandingPage/Landing";
import { Home } from "./components/Home/Home";
import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter={false}>
      <Switch location={location} key={location.key}>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};
