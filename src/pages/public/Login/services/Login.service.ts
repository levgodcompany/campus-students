import { axiosInstance } from "../../../../services/axiosConfig.service";
import { login } from "../types/login.types";

// DTO para Cohort
interface CohortDTO {
  id: number;
  title: string;
  enabled?: boolean;
}

// DTO para Level
interface LevelDTO {
  id: number;
  title: string;
  cohorts: CohortDTO[];
}

// DTO para Student
interface StudentDTO {
  id: number;
  fullName: string;
  email: string;
  levels: LevelDTO[];
}
type response = { user: StudentDTO; token: string };
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
