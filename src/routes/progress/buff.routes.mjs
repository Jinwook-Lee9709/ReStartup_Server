import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import buffCtrl from "../../controllers/buff.ctrl.mjs"

const router = Router();

router.get("/api/users/progress/getBuffs", authenticateUser, buffCtrl.buff.getAllBuffs);
router.post("/api/users/progress/saveBuff", authenticateUser, buffCtrl.buff.saveBuff);
router.post("/api/users/progress/saveBuffs", authenticateUser, buffCtrl.buff.saveBuffs);
router.post("/api/users/progress/deleteBuff", authenticateUser, buffCtrl.buff.deleteBuff);

export default router;