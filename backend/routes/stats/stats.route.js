import express from 'express';
import { biggestRatingDifference, getHighPotentialPlayer, getTopRatedPlayer, highestPaidPlayer, mostValuablePlayer } from '../../controllers/stats/stats.controller.js';

const router = express.Router();    

router.get('/top-rated-players', getTopRatedPlayer);
router.get('/high-potential-players', getHighPotentialPlayer);
router.get('/biggest-rating-differences', biggestRatingDifference);
router.get('/most-valuable-players', mostValuablePlayer);
router.get('/highest-paid-players', highestPaidPlayer);






export default router;