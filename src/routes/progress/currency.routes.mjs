import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import currencyCtrl from "../../controllers/currency.ctrl.mjs";

const router = Router();

router.get ('/api/users/getAllCurrencies', authenticateUser, currencyCtrl.process.getAllCurrencies);
router.post ('/api/users/saveCurrency', authenticateUser, currencyCtrl.process.saveCurrency);
router.post ('/api/users/saveCurrencies', authenticateUser, currencyCtrl.process.saveMultipleCurrencies);

export default router;
