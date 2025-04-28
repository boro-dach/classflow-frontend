import { saveAccessToken } from "@/entities/user/lib/token";
import axios from "axios";

export async function login(data: any) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
    data
  );

  if (response.status !== 200) {
    throw new Error("Failed to login user");
  }

  saveAccessToken(response.data.accessToken, {
    expiresInSeconds: 60 * 60 * 24 * 7,
  });

  return response.data;
}
