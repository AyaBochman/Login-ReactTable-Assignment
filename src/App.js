import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  const { isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  return (
    <div className="App">
      <h1>LOGIN</h1>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/">
            <LoginForm />
          </Route> */}
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/info" /> : <LoginForm />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
