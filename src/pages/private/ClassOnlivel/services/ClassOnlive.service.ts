import { PrivateRoutesHttp } from "../../../../routes/routes";
import { axiosInstance } from "../../../../services/axiosConfig.service";
import { ClassOnLiveDto } from "../types/ClassOnlive";

class ClassOnliveService {
  async findClassOnLive(idCohort: number) {
    try {
      const res = await axiosInstance.get<ClassOnLiveDto[]>(
        `${PrivateRoutesHttp.CLASS_ON_LIVE}/cohort/class-onlive/${idCohort}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ClassOnliveService();
