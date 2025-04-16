import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import upgradeCtrl from "../../controllers/upgrade.ctrl.mjs";

const router = Router();

router.get('/api/users/progress/getInteriorByTheme',authenticateUser, upgradeCtrl.interior.getByTheme);
router.post('/api/users/progress/saveSingleInterior', authenticateUser, upgradeCtrl.interior.saveSingle);
router.post('/api/users/progress/saveMultipleInterior', authenticateUser, upgradeCtrl.interior.saveMultiple);

router.get('/api/users/progress/getEmployeeByTheme',authenticateUser, upgradeCtrl.employee.getByTheme);
router.post('/api/users/progress/saveSingleEmployee', authenticateUser, upgradeCtrl.employee.saveSingle);
router.post('/api/users/progress/saveMultipleEmployee', authenticateUser, upgradeCtrl.employee.saveMultiple);

router.get('/api/users/progress/getFoodByTheme',authenticateUser, upgradeCtrl.food.getByTheme);
router.post('/api/users/progress/saveSingleFood', authenticateUser, upgradeCtrl.food.saveSingle);
router.post('/api/users/progress/saveMultipleFood', authenticateUser, upgradeCtrl.food.saveMultiple);

export default router;