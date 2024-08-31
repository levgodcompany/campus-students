import { PrivateRoutesHttp } from "../../../../routes/routes";
import { axiosInstance } from "../../../../services/axiosConfig.service";
import { AppServices } from "../../../../utilities/https.utility";
import { Module } from "../../types/Modules.types";

class ModulesServices {
  crud() {
    const app = new AppServices<Module, number>(PrivateRoutesHttp.MODULES);
    return app;
  }

  async completStudent(idStudent: number, idCourse:number, idModule: number) {
    try {
      const res = await axiosInstance.put(
        `${PrivateRoutesHttp.MODULES}/assig/student/${idStudent}/course/${idCourse}/module/${idModule}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ModulesServices();
