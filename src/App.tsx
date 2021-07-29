import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Loading } from "./components/Loading";
import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import { UserProvider } from "./providers/UserProvider";

const Landing = lazy(() => import("./screens/Landing"));
const SigninScreen = lazy(() => import("./screens/Signin"));
const TurnsScreen = lazy(() => import("./screens/TurnsScreen"));

const firebaseConfig = {
  apiKey: "AIzaSyC8MhiMfB2C1p-vCwuftizqorbdRz33NtA",
  authDomain: "masajes-c9db1.firebaseapp.com",
  projectId: "masajes-c9db1",
  storageBucket: "masajes-c9db1.appspot.com",
  messagingSenderId: "213676711872",
  appId: "1:213676711872:web:9ca6295402258a1ef63225",
  measurementId: "G-99RX32RWJ9",
};
firebase.initializeApp(firebaseConfig);

export const App = (): JSX.Element => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route path="/" component={Landing} exact />
            <Route path="/signin" component={SigninScreen} exact />
            <Route path="/turns" component={TurnsScreen} exact />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};
