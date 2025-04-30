import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import promotionCtrl from "../../controllers/promotion.ctrl.mjs";

const router = Router();

router.get('/api/users/getPromotions', authenticateUser, promotionCtrl.process.getAllPromotions);
router.post('/api/users/savePromotions', authenticateUser, promotionCtrl.process.saveAllPromotions);
router.post('/api/users/resetPromotions', authenticateUser, promotionCtrl.process.resetPromotions);

export default router;