import express from 'express';
import { biggestRatingDifference, getBestDefenders, getBestDribblers, getBestForwards, getBestGoalkeepers, getBestMidfielders, getBestPassers, getBestPlayerInClub, getBestPlayerInLeague, getFastestPlayers, getHighlyRatedPlayersLeague, getHighPotentialPlayer, getMostPhysicalPlayers, getTopRatedPlayer, highestPaidPlayer, mostValuablePlayer, valueForMoney } from '../../controllers/stats/stats.controller.js';

const router = express.Router();    

router.get('/top-rated-players', getTopRatedPlayer);
router.get('/high-potential-players', getHighPotentialPlayer);
router.get('/biggest-rating-differences', biggestRatingDifference);
router.get('/most-valuable-players', mostValuablePlayer);
router.get('/highest-paid-players', highestPaidPlayer);
router.get('/best-value-for-money',valueForMoney);
router.get('/best-forwards',getBestForwards);
router.get('/best-midfielders',getBestMidfielders);
router.get('/best-defenders',getBestDefenders);
router.get('/best-goalkeepers',getBestGoalkeepers);
router.get('/best-dribblers',getBestDribblers);
router.get('/best-passers',getBestPassers);
router.get('/fastest-players',getFastestPlayers);
router.get('/most-physical-players',getMostPhysicalPlayers);
router.get('/best-players-in-each-league',getBestPlayerInLeague);
router.get('/best-players-in-each-club',getBestPlayerInClub);
router.get('/leagues-with-highly-rated-players',getHighlyRatedPlayersLeague);









export default router;