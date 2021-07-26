import { Navbar } from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Landing } from "./screens/Landing";

export const App = () => {
  return (
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
};
