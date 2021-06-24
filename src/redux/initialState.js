export default {
  userToken: JSON.parse(sessionStorage.getItem("userToken")) || {},
  userDetails: JSON.parse(sessionStorage.getItem("userDetails")) || [],
  isLoggedIn: !!sessionStorage.getItem("userToken"),
};
