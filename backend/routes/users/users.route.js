import express from 'express'
import { addAdmin, verifyAdmin } from '../../controllers/users/users.controller.js';
const router=express();


//admin route
router.post('/verify-admin',verifyAdmin);
router.post('/create-admin',addAdmin);


export default router;