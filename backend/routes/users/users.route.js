import express from 'express'
import {addAdmin, removeAdmin, verifyAdmin } from '../../controllers/users/users.controller.js';
const router=express();


//admin route
router.post('/verify-admin',verifyAdmin);
router.post('/create-admin',addAdmin);
router.post('/remove-admin',removeAdmin);


export default router;