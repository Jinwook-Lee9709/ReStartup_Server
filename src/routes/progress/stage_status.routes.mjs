import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import stageStatusCtrl from "../../controllers/stage_status.ctrl.mjs";

const router = Router();

router.get('/api/users/progress/getAllStageStatus', authenticateUser, stageStatusCtrl.getAllStatus);
router.post('/api/users/progress/saveStageStatus', authenticateUser, stageStatusCtrl.saveStatus);

export default router;