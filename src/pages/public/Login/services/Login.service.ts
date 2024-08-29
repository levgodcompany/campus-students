import { axiosInstance } from "../../../../services/axiosConfig.service";
import { ApiResponse } from "../../../../utilities/https.utility";
import { login } from "../types/login.types";

type student = {
  id: number;
  fullName: string;
  idLevel: number;
  email: string;
};
type response = { user: student; token: string };
class LoginService {
  async login(data: login) {
    try {
      const res = await axiosInstance.post<response>(
        `auht/student/login`,
        data
      )
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new LoginService();
