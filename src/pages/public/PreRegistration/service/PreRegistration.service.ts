import { axiosInstance } from "../../../../services/axiosConfig.service";
import { StudentPre } from "../types/PreRegistration.types";

class PreRegistrationService {
  async preRegistration(data: StudentPre, idLevel: number, idCohort: number) {
    try {
      const res = await axiosInstance.post(`auht/student/register/${idLevel}/${idCohort}`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PreRegistrationService()