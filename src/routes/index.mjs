import { Router } from "express";
import auth from "./auth/auth.routes.mjs";
import users from "./user/user.routes.mjs";
import currency from "./progress/currency.routes.mjs";
import themeRecord from "./progress/theme_record.routes.mjs";
import upgrade from "./progress/upgrade.routes.mjs";
import stageStatus from "./progress/stage_status.routes.mjs";
import promotion from "./progress/promotion.routes.mjs";
import buff from "./progress/buff.routes.mjs";

const router = Router();

router.use(auth);
router.use(users);
router.use(currency);
router.use(themeRecord);
router.use(upgrade);
router.use(stageStatus);
router.use(promotion);
router.use(buff);


export default router;