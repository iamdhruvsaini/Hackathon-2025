import express from 'express'
import {addAdmin, markUserSubscribed, removeAdmin, updateAdmin, verifyAdmin } from '../../controllers/users/users.controller.js';
const router=express();


//admin route
router.post('/verify-admin',verifyAdmin);
router.post('/create-admin',addAdmin);
router.post('/remove-admin',removeAdmin);
router.post('/update-admin',updateAdmin);
router.post('/subscribe',markUserSubscribed);


export default router;