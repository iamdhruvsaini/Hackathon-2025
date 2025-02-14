import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { DominionFcModel } from './database/model.js';

import statsRouter from './routes/stats/stats.route.js';
import dashboardRouter from './routes/dashboard/dashboard.route.js'


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  
}));


app.use('/api/stats/',statsRouter);
app.use('/api/dashboard/',dashboardRouter);


DominionFcModel().then(()=>{
    console.log("Database Connected Successfully");
    app.listen(PORT,()=>{
        console.log(`App is Listening on Port ${PORT}`);
    })
})

