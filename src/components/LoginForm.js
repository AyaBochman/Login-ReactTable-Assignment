/* eslint-disable no-console */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import userLoginService from "../services/userLoginService";
import { onUserLoginSuccess } from "../redux/actions/onUserLoginSuccess";
import { validateEmail, validatePassword } from "./commons/functions";

const inputVals = {
  email: "",
  password: "",
};

const inputErrorsVals = {
  email: { error: false, helperText: "" },
  password: { error: false, helperText: "" },
};

const LoginForm = () => {
  const [inputs, setInput] = useState(inputVals);
  const [inputsErrors, setInputError] = useState(inputErrorsVals);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const isValidEmail = validateEmail(inputs.email);
    const isValidPass = validatePassword(inputs.password);
    setInputError({
      email: { error: isValidEmail.isErr, helperText: isValidEmail.msg },
      password: { error: isValidPass.isErr, helperText: isValidPass.msg },
    });
    return !isValidEmail.isErr && !isValidPass.isErr;
  };

  const handleLogin = async () => {
    try {
      const isValid = validateInputs();
      if (isValid) {
        setLoading(true);
        const result = await userLoginService(inputs);
        if (result && !result.err) {
          dispatch(onUserLoginSuccess(result));
        }
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
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
                  className="input"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  label="Email"
                  error={inputsErrors.email.error}
                  helperText={inputsErrors.email.helperText}
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
                  error={inputsErrors.password.error}
                  helperText={inputsErrors.password.helperText}
                  value={inputs.password}
                />
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    className="login-btn"
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                )}
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
    text-align: center;
  }
  .input,
  .login-btn {
    width: 80%;
  }
`;
