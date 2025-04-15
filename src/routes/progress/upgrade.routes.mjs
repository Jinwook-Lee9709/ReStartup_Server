import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import upgradeCtrl from "../../controllers/upgrade.ctrl.mjs";

const router = Router();


router.get('/api/users/progress/getUpgradesByTheme',authenticateUser, upgradeCtrl.getByTheme);
router.post('/api/users/progress/saveSingleUpgrade', authenticateUser, upgradeCtrl.saveSingleUpgrade);
router.post('/api/users/progress/saveMultipleUpgrade', authenticateUser, upgradeCtrl.saveMultipleUpgrade);

export default router;