import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import buffCtrl from "../../controllers/buff.ctrl.mjs"

const router = Router();

router.get("/api/users/progress/getBuffs", authenticateUser, buffCtrl.getBuffs);
router.post("/api/users/progress/saveBuff", authenticateUser, buffCtrl.saveBuff);
router.post("/api/users/progress/saveBuffs", authenticateUser, buffCtrl.saveBuffs);

export default router;