import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { DominionFcModel } from './database/model.js';

import dashboardRouter from './routes/dashboard/dashboard.route.js'
import potentialRankingRouter from './routes/stats/stats.route.js'
import playerPositionRouter from './routes/player-positon/playerPosition.route.js'
import userSelectionRouter from './routes/user-selection/selection.route.js'


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  
}));


//route for stats page
app.use('/api/stats/',potentialRankingRouter);

//route for dashboard page 
app.use('/api/dashboard/',dashboardRouter);


//route for getting players by position they play at
app.use('/api/position/',playerPositionRouter)


//route for adding and fetching user selections
app.use('/api/user-selection/',userSelectionRouter )




//Connecting to Db
DominionFcModel().then(()=>{
    console.log("Database Connected Successfully");
    app.listen(PORT,()=>{
        console.log(`App is Listening on Port ${PORT}`);
    })
})

