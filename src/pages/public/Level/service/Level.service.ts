import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";

class Level {
  crud() {
    const app = new AppServices<null, number>(PrivateRoutesHttp.LANDING);
    return app;
  }
}

export default new Level();
