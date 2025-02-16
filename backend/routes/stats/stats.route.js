import express from 'express';
import { getBiggestRatingDifferences, getHighPotentialPlayers, getTopRatedPlayers } from '../../controllers/stats/potential-ranking/potentialRanking.controller.js';
import { getBestValueForMoneyPlayers, getHighestPaidPlayers, getMostValuablePlayers } from '../../controllers/stats/financial-ranking/financialRanking.controller..js';
import { getBestDefenders, getBestForwards, getBestGoalkeepers, getBestMidfielders } from '../../controllers/stats/position-ranking/positionRanking.controller.js';
import { getBestAllRoundPlayers, getBestAttackingPlayers, getBestDefensivePlayers, getPlayersWithBestFitnessLevel, getPlayersWithHighestSkillMoves } from '../../controllers/stats/players-skills-comparison/playersSkillsComp.controller.js';


const router = express.Router();    

//Based on Potential Ranking

router.get('/top-rated-players',getTopRatedPlayers);
router.get('/high-potential-players',getHighPotentialPlayers);
router.get('/biggest-rating-differences',getBiggestRatingDifferences);


//based on financial ranking

router.get("/most-valuable-players", getMostValuablePlayers);
router.get("/highest-paid-players", getHighestPaidPlayers);
router.get("/best-value-for-money", getBestValueForMoneyPlayers);


//based on position ranking

router.get("/best-forwards", getBestForwards);
router.get("/best-midfielders", getBestMidfielders);
router.get("/best-defenders", getBestDefenders);
router.get("/best-goalkeepers", getBestGoalkeepers);


//based on players skills 

router.get("/players-with-highest-skill-moves", getPlayersWithHighestSkillMoves);
router.get("/best-players-by-attacking-attributes", getBestAttackingPlayers);
router.get("/best-players-by-defensive-attributes", getBestDefensivePlayers);
router.get("/best-all-round-players", getBestAllRoundPlayers);
router.get("/players-with-best-fitness-level", getPlayersWithBestFitnessLevel);


export default router;




// Bucket	Included Positions
// Goalkeepers	GK
// Defenders	CB, LCB, RCB, LB, RB, LWB, RWB
// Midfielders	CDM, LDM, RDM, CM, LCM, RCM, CAM, LAM, RAM
// Wingers	LM, RM, LW, RW
// Forwards	ST, LS, RS, CF, RF, LF
// Substitutes & Reserves	SUB, RES