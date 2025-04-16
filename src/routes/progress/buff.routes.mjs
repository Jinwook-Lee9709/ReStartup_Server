import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import buffCtrl, {buff} from "../../controllers/buff.ctrl.mjs"

const router = Router();

router.get("/api/users/progress/getBuffs", authenticateUser, buffCtrl.buff.getAllBuffs);
router.post("/api/users/progress/saveBuff", authenticateUser, buffCtrl.buff.saveBuff);
router.post("/api/users/progress/saveBuffs", authenticateUser, buffCtrl.buff.saveBuffs);

export default router;