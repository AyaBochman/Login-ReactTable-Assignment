/* eslint-disable no-console */
import axios from "axios";

const url = "https://private-052d6-testapi4528.apiary-mock.com/authenticate";
const userLoginService = async (body) => {
  try {
    const res = await axios.post(url, { body });
    if (res?.data?.length) {
      sessionStorage.setItem("userToken", JSON.stringify(res.data[0]));
      return res.data[0];
    }
    throw new Error("Error in userLoginService");
  } catch (error) {
    console.error(error);
    return { err: true };
  }
};

export default userLoginService;
