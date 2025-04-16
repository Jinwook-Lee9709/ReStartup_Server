import { Router } from "express";
import { authenticateUser } from "../../middleware/auth.middleware.mjs";
import authCtrl from "../../controllers/auth.ctrl.mjs";

const router = Router();

router.get('/api/auth/guestLogin', authCtrl.login.guest);
router.post('/api/auth/guestRegister', authCtrl.register.guest);

router.get('/api/auth/verify', authCtrl.jwtAuth.verify);
router.get('/api/auth/refresh', authCtrl.jwtAuth.refresh);
router.post('/api/auth/sign', authCtrl.jwtAuth.sign);
router.post('/api/auth/login', authCtrl.login.googleAuthenticate)

router.post(`/api/auth/delete`,authenticateUser, authCtrl.deleteUser.delete);

export default router;
