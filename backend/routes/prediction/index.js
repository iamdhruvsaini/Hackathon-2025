import express from 'express'

const router = express.Router()
import { predict_best_teams } from "../../controllers/prediction/predict-best-team.js"

router.post("/predict-11", predict_best_teams)

export default router