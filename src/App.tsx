import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Landing } from "./screens/Landing";
import { SigninScreen } from "./screens/Signin";
import { TurnsScreen } from "./screens/TurnsScreen";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/signin" component={SigninScreen} exact />
        <Route path="/turns" component={TurnsScreen} exact />
      </Switch>
    </BrowserRouter>
  );
};
