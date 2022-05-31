import express, { Router } from "express";

import {
  getPlayer,
  deletePlayer,
  getAllPlayers,
  postPlayer,
  addPlayerTeam,
  deletePlayerTeam
} from "../controllers/uiPlayerControllers";
import { auth } from "../controllers/CommonControllers";

const playerRouter: Router = express.Router();

/**
 * Add player (playerId) to team (teamId)
 * @route PATCH /players/{teamId}/player
 * @param {integer} teamId.path.required - team id
 * @param {integer} playerId.body.required - player id to add
 * @group player - Operations about team
 * @operationId addPlayerTeam
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Team with requested id
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Team not found
 * @returns {string} 405 - Invalid input
 * @security JWT
 */
playerRouter.patch("/players/:teamId/player", addPlayerTeam);

/**
 * Delete player from team
 * @route DELETE /players/{teamId}/player
 * @param {integer} teamId.path.required - team id to delete
 * @param {integer} playerId.body.required - player id to add
 * @group player - Operations about team
 * @operationId deletePlayerTeam
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Team with requested id
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Team not found
 * @returns {string} 405 - Invalid input
 * @security JWT
 */
playerRouter.delete("/players/:teamId/player", deletePlayerTeam);

/**
 * Get player by id
 * @route GET /players/{playerId}
 * @param {integer} playerId.path.required - player id to get
 * @group player - Operations about player
 * @operationId getPlayer
 * @produces application/json
 * @consumes application/json
 * @returns {Player.model} 200 - player with requested id
 * @returns {string} 404 - player was not found
 */
playerRouter.get("/players/:playerId", getPlayer);

/**
 * Update player with specified id
 * @route PUT /players/{playerId}
 * @param {integer} playerId.path.required - player id to get
 * @group player - Operations about player
 * @param {PlayerUpdInfo.model} player.body.required - player info to update
 * @operationId putPlayer
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - ok
 * @returns {string} 404 - not found
 * @security JWT
 */
// playerRouter.put("/players/:playerId", auth, modifyPlayer);

/**
 * Delete player with specified id
 * @route DELETE /players/{playerId}
 * @param {integer} playerId.path.required - player id to delete
 * @group player - Operations about player
 * @operationId deletePlayer
 * @produces text/plain
 * @returns {string} 200 - ok
 * @returns {string} 403 - no enough rights
 * @returns {string} 405 - invalid input
 * @security JWT
 */
playerRouter.delete("/players/:playerId", deletePlayer);

/**
 * Get all players collection
 * @route GET /players
 * @group player - Operations about player
 * @operationId getPlayers
 * @produces application/json
 * @returns {Array.<Player.model>} 200 - An array of players info
 */
playerRouter.get("/players", getAllPlayers);

/**
 * Create new player in database
 * @route POST /player
 * @group player - Operations about player
 * @param {Player.model} player.body.required - player to add
 * @operationId createPlayer
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - ok
 * @returns {string} 403 - no enough rights
 * @returns {string} 405 - invalid input
 * @security JWT
 */
playerRouter.post("/player", postPlayer);

export default playerRouter;
