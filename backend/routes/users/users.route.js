import express from 'express'
import {addAdmin, addCustomer, markUserSubscribed, removeAdmin, updateAdmin, verifyAdmin } from '../../controllers/users/users.controller.js';
const router=express();


//admin route
router.post('/add-customer',addCustomer);
router.post('/verify-admin',verifyAdmin);
router.post('/create-admin',addAdmin);
router.post('/remove-admin',removeAdmin);
router.post('/update-admin',updateAdmin);
router.post('/subscribe',markUserSubscribed);


export default router;