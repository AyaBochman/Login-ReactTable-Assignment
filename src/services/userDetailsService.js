/* eslint-disable no-console */
import axios from "axios";

const url = "https://private-052d6-testapi4528.apiary-mock.com/info";
const userDetailsService = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.get(url, config);
    if (res?.data?.length) {
      sessionStorage.setItem("userDetails", JSON.stringify(res.data));
      return res.data;
    }
    throw new Error("Error in userDetailsService");
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export default userDetailsService;
