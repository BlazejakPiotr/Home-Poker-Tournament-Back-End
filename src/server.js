import express from "express";
import tournamentsRouter from "./services/tournaments/index.js";
import cors from "cors";

const server = express();

const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/tournaments", tournamentsRouter);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
