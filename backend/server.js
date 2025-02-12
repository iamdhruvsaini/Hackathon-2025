import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { DominionFcModel } from './database/model.js';

import statsRouter from './routes/stats/stats.route.js';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.use('/api/stats/',statsRouter);



DominionFcModel().then(() => {
    console.log("Database tables created successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
