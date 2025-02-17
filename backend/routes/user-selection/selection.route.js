import express from "express"
import { addPlayerToUserSelection, getUserSelectedPlayers } from "../../controllers/user-selection/selection.controller.js";
const router=express.Router();

router.post('/player',addPlayerToUserSelection);
router.get('/selected-player/:userId',getUserSelectedPlayers)

export default router;