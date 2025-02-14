import express from "express"
import { getPlayerPositionCount, getRecentSoldPlayer } from "../../controllers/dashboard/dashboard.controller.js";

const router=express.Router();

router.get('/player-position-count',getPlayerPositionCount)
router.get('/recent-sold-player',getRecentSoldPlayer);

export default router;



// get  => /player-position-count : returns the number of player in each bucket for our graph