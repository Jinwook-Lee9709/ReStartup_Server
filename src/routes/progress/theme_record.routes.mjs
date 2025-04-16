import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import themeRecordCtrl from "../../controllers/theme_record.ctrl.mjs";

const router = Router();

router.get ('/api/users/progress/getRecords', authenticateUser, themeRecordCtrl.general.getRecords);
router.post ('/api/users/progress/insertRecords', authenticateUser, themeRecordCtrl.general.insertRecords);

router.get ('/api/users/progress/getRanking', authenticateUser, themeRecordCtrl.process.getRanking);
router.post ('/api/users/progress/saveRanking', authenticateUser, themeRecordCtrl.process.saveRanking);

router.get ('/api/users/progress/getRankpoint', authenticateUser, themeRecordCtrl.process.getRankpoint);
router.post ('/api/users/progress/saveRankpoint', authenticateUser, themeRecordCtrl.process.saveRankpoint);

router.get ('/api/users/progress/getCumulative', authenticateUser, themeRecordCtrl.process.getCumulative);
router.post ('/api/users/progress/saveCumulative', authenticateUser, themeRecordCtrl.process.saveCumulative);

export default router;