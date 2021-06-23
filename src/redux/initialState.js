export default {
  userToken: JSON.parse(sessionStorage.getItem("userToken")) || {},
  userDetails: [],
  isLoggedIn: !!sessionStorage.getItem("userToken"),
};
