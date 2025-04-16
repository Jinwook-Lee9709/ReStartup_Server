import { authenticateUser } from "../../middleware/auth.middleware.mjs";

import { Router } from "express";
import reviewCtrl from "../../controllers/review.ctrl.mjs";

const router = Router();

router.get("/api/users/progress/getAll", authenticateUser, reviewCtrl.process.getAll);
router.post("/api/users/progress/insert", authenticateUser, reviewCtrl.process.insert);
router.post("/api/users/progress/delete", authenticateUser, reviewCtrl.process.delete);


export default router;