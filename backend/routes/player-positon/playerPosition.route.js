import express from "express";
import { fetchDefenderPlayers, fetchForwardsPlayers, fetchGoalKeeperPlayers, fetchMidfieldersPlayers, fetchReservesPlayers, fetchWingersPlayers} from "../../controllers/player-position/playerPostion.controller.js";


const router=express();

router.get("/defenders",fetchDefenderPlayers);
router.get("/midfielders",fetchMidfieldersPlayers);
router.get("/wingers",fetchWingersPlayers);
router.get("/forwards",fetchForwardsPlayers);
router.get("/goalkeepers",fetchGoalKeeperPlayers);
router.get("/reserves",fetchReservesPlayers);


export default router;



// const positionMap = {
//     defenders: ['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB'],
//     midfielders: ['CDM', 'LDM', 'RDM', 'CM', 'LCM', 'RCM', 'CAM', 'LAM', 'RAM'],
//     wingers: ['LM', 'RM', 'LW', 'RW'],
//     forwards: ['ST', 'LS', 'RS', 'CF', 'RF', 'LF'],
//     goalkeepers: ['GK'],
//     Substitutes & Reserves:[SUB, RES]
// };
