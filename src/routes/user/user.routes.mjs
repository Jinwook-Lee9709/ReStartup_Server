import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import userCtrl from "../../controllers/user.ctrl.mjs";

const router = Router();

router.get ('/api/users/getInfo', authenticateUser, userCtrl.process.getInfo);
router.get ('/api/users/getName', authenticateUser, userCtrl.process.getName);
router.post ('/api/users/updateName', authenticateUser, userCtrl.process.updateName);


export default router;
