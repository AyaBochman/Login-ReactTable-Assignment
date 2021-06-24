const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const isEmpty = (input) => input.trim().length === 0;

export const validateEmail = (email) => {
  if (!isEmpty(email)) {
    if (emailRegex.test(email)) {
      return { isErr: false, msg: "" };
    }
    return { isErr: true, msg: "Email not valid" };
  }
  return { isErr: true, msg: "Email is required" };
};

export const validatePassword = (password) => {
  if (!isEmpty(password)) {
    if (password.length < 8) {
      return {
        isErr: true,
        msg: "Password must contain at least 8 characters",
      };
    }
    if (passRegex.test(password)) {
      return { isErr: false, msg: "" };
    }
    return {
      isErr: true,
      msg: "Must contain at least 1 capsLock char and 1 number",
    };
  }
  return { isErr: true, msg: "Password is required" };
};
