/* eslint-disable no-console */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import userLoginService from "../services/userLoginService";
import { onUserLoginSuccess } from "../redux/actions/onUserLoginSuccess";

const inputVals = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [inputs, setInput] = useState(inputVals);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const result = await userLoginService(inputs);
      if (result) {
        dispatch(onUserLoginSuccess(result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLogin>
      <h1>Login</h1>
      <Card className="card">
        <CardMedia
          image="https://picsum.photos/600/300"
          title="Random Image"
          component="img"
          height="300"
        />
        <CardContent>
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  // required
                  className="input"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  label="Email"
                  value={inputs.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="input"
                  onChange={(e) => handleChange(e)}
                  name="password"
                  label="Password"
                  type="password"
                  value={inputs.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="login-btn"
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </StyledLogin>
  );
};

export default LoginForm;

const StyledLogin = styled.div`
  width: 100%;
  text-align: center;
  .card {
    width: 600px;
    height: 600px;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    /* justify-content: center; */
    text-align: center;
  }
  .input,
  .login-btn {
    width: 80%;
  }
`;
