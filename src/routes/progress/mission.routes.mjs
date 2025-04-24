import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import missionCtrl from "../../controllers/mission.ctrl.mjs";

const router = Router();

router.get("/api/users/progress/getMissions", authenticateUser, missionCtrl.mission.getMissions);
router.post("/api/users/progress/saveMission", authenticateUser, missionCtrl.mission.saveMission);

export default router;