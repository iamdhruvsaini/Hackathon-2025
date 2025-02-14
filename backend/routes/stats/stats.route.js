import express from 'express';
import { getBestForwards, getBiggestRatingDifferences, getHighestPaidPlayers, getHighPotentialPlayers, getMostValuablePlayers, getTopRatedPlayers } from '../../controllers/stats/stats.controller.js';


const router = express.Router();    

router.get('/top-rated-players', getTopRatedPlayers);
router.get('/high-potential-players', getHighPotentialPlayers);
router.get('/biggest-rating-differences', getBiggestRatingDifferences);
router.get('/most-valuable-players', getMostValuablePlayers);
router.get('/highest-paid-players', getHighestPaidPlayers);
// router.get('/best-value-for-money',valueForMoney);
router.get('/best-forwards',getBestForwards);
// router.get('/best-midfielders',getBestMidfielders);
// router.get('/best-defenders',getBestDefenders);
// router.get('/best-goalkeepers',getBestGoalkeepers);
// router.get('/best-dribblers',getBestDribblers);
// router.get('/best-passers',getBestPassers);
// router.get('/fastest-players',getFastestPlayers);
// router.get('/most-physical-players',getMostPhysicalPlayers);
// router.get('/best-players-in-each-league',getBestPlayerInLeague);
// router.get('/best-players-in-each-club',getBestPlayerInClub);
// router.get('/leagues-with-highly-rated-players',getHighlyRatedPlayersLeague);
// router.get('/players-with-highest-skill-moves',getPlayersWithHighestSkillMoves);










export default router;