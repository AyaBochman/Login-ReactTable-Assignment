import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import InfoPage from "./components/InfoPage";

function App() {
  const { isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/info">
            {isLoggedIn ? <InfoPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/info" /> : <LoginForm />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
