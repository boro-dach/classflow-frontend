import { registerSchema } from "@/features/auth/RegisterForm";
import axios from "axios";
import * as z from "zod";

const API_URL = "http://localhost:5000/auth/register-student";

export const registerStudent = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const response = await axios.post(API_URL, values);
    return response.data;
  } catch (error) {
    console.error("Error during registration API call:", error);
    throw error;
  }
};
