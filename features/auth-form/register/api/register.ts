import axios from "axios";

export async function register(data: any) {
  const response = await axios.post(
    "http://localhost:5000/auth/register",
    data
  );

  return response.data;
}
