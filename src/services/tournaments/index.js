import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import uniqid from "uniqid";
import fs from "fs";

const tournamentsRouter = express.Router();

const tournamentsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "tournaments.json"
);

tournamentsRouter.post("/", (req, res) => {
  const newTournament = { ...req.body, id: uniqid() };
  const tournaments = JSON.parse(fs.readFileSync(tournamentsJSONPath));
  tournaments.push(newTournament);
  fs.writeFileSync(tournamentsJSONPath, JSON.stringify(tournaments));
  res.status(201).send({ id: newTournament.id });
});

tournamentsRouter.get("/", (req, res) => {
  const tournaments = fs.readFileSync(tournamentsJSONPath);
  res.send(JSON.parse(tournaments));
});
tournamentsRouter.get("/:id", (req, res) => {
  const tournaments = JSON.parse(fs.readFileSync(tournamentsJSONPath));
  const tournament = tournaments.find((t) => t.id === req.params.id);
  res.send(tournament);
});
tournamentsRouter.delete("/:id", (req, res) => {
  const tournaments = JSON.parse(fs.readFileSync(tournamentsJSONPath));
  const tournament = tournaments.filter((t) => t.id !== req.params.id);
  fs.writeFileSync(tournamentsJSONPath, JSON.stringify(tournament));
  res.status(204).send();
});
tournamentsRouter.put("/:id", (req, res) => {
  const tournaments = JSON.parse(fs.readFileSync(tournamentsJSONPath));
  const remainingTournament = tournaments.filter((t) => t.id !== req.params.id);
  const updatedTournament = { ...req.body, id: req.params.id };
  remainingTournament.push(updatedTournament);
  fs.writeFileSync(tournamentsJSONPath, JSON.stringify(remainingTournament));
  res.send(updatedTournament);
});
export default tournamentsRouter;
