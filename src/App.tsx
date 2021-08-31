import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Loading } from "./components/Loading";
import { PersistGate } from "redux-persist/integration/react";

import "firebase/analytics";
import "firebase/auth";
import { Provider } from "react-redux";
import { persistor, store } from "./utils/Store";

const Landing = lazy(() => import("./screens/Landing"));
const SigninScreen = lazy(() => import("./screens/Signin"));
const TurnsScreen = lazy(() => import("./screens/TurnsScreen"));

export const App = (): JSX.Element => {
  return (
    <PersistGate persistor={persistor} loading={<Loading show />}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Suspense fallback={<Loading show />}>
              <Route path="/" component={Landing} exact />
              <Route path="/signin" component={SigninScreen} exact />
              <Route path="/turns" component={TurnsScreen} exact />
            </Suspense>
          </Switch>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  );
};
