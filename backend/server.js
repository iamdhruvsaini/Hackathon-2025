import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import http from "http";
import { Server } from "socket.io";
import { DominionFcModel } from './database/model.js';
import dashboardRouter from './routes/dashboard/dashboard.route.js'
import potentialRankingRouter from './routes/stats/stats.route.js'
import playerPositionRouter from './routes/player-positon/playerPosition.route.js'
import userSelectionRouter from './routes/user-selection/selection.route.js'
import usersRouter from './routes/users/users.route.js'
import adminPortalRouter from './routes/admin/admin.route.js'
import { markPlayerAsSold } from './controllers/admin/home/admin.home.controller.js';
import predictionRoutes from "./routes/prediction/index.js"

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


//route for stats page
app.use('/api/stats/', potentialRankingRouter);

//route for dashboard page 
app.use('/api/dashboard/', dashboardRouter);

//route for getting players by position they play at
app.use('/api/position/', playerPositionRouter)

//route for adding and fetching user selections
app.use('/api/user-selection/', userSelectionRouter)

//route for users
app.use('/api/users', usersRouter)

//route for admin-portal
app.use('/api/admin', adminPortalRouter);

// route to predict best 11
app.use('/api/prediction', predictionRoutes)

//creating a server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"], credentials: true },
});


//Connecting to Db
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Expecting payload: { playerId, sold, wage }
  socket.on("updateSoldStatus", async (data) => {
    try {
      const { playerId, sold, wage } = data;
      const result = await markPlayerAsSold(playerId, sold, wage);
      console.log("Player sold status updated:", result);

      io.emit("playerUpdated", { playerId, updatedRecord: result[0] });
    } catch (error) {
      console.error("Error updating sold status:", error);
      socket.emit("error", "Could not update sold status");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Connect to database, then start the server

DominionFcModel().then(() => {
  console.log("Database Connected Successfully");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// InsertData().then(()=>{
//   console.log("Inserted the values successfully");
//   server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });

// })