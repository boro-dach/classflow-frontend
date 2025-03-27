import Cookies from "js-cookie";

export const getToken = async () => {
  const token = Cookies.get("accessToken");

  return token;
};
