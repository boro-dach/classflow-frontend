import { saveAccessToken } from "@/entities/user/lib/token";
import axios from "axios";

export async function register(data: any) {
  const response = await axios.post(
    "http://localhost:5000/auth/register",
    data
  );

  if (response.status !== 200) {
    throw new Error("Failed to register user");
  }

  saveAccessToken(response.data.accessToken, {
    expiresInSeconds: 60 * 60 * 24,
  });

  return response.data;
}
