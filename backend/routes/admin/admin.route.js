import express from "express"
import {getAllAdmins, getSoldPlayers, getTrendingPlayers, portalHomeStats, removePlayers } from "../../controllers/admin/home/admin.home.controller.js";
import { authenticateAdmin } from "../../middlewares/authenticateAdmin.js";

const router=express();


router.get('/home-stats',portalHomeStats);
router.get('/trending-players',getTrendingPlayers);
router.get('/recently-sold',getSoldPlayers);
router.get('/employee-details',getAllAdmins);
router.post('/remove-players',authenticateAdmin,removePlayers);

export default router;