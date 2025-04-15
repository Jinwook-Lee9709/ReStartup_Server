import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import userCtrl from "../../controllers/user.ctrl.mjs";

const router = Router();

router.get ('/api/users/getInfo', authenticateUser, userCtrl.process.getInfo);
// router.post('/api/users', userCtrl.process.register);

export default router;
