import { saveAccessToken } from "@/entities/user/lib/token";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export async function register(data: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
      data
    );

    saveAccessToken(response.data.accessToken, {
      expiresInSeconds: 60 * 60 * 24 * 7,
    });

    toast.success("Registration successful");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    const message =
      err.response?.data?.message || "An unexpected error occurred.";

    toast.error(`Registration failed: ${message}`);
    return null;
  }
}
