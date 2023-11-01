import express, { Router } from "express";

import {
  getPlayer,
  deletePlayer,
  getAllPlayers,
  postPlayer,
} from "../controllers/uiPlayerControllers";

import {
  getPlayerTeams,
  getPlayerHistory
} from "../controllers/uiTeamControllers";

import { auth } from "../controllers/CommonControllers";

const playerRouter: Router = express.Router();

/**
 * Get all teams for player
 * @route GET /player/{playerId}/teams
 * @param {integer} playerId.path.required - player id
 * @group player - Operations about player
 * @operationId getPlayerTeams
 * @produces application/json
 * @returns {Array.<Teams>} 200 - An array of teams info
 * @returns {string} 404 - team not found
 * @returns {string} 500 - Internal Server Error
 */
playerRouter.get("/player/:playerId/teams", getPlayerTeams);

/**
 * Get all teams player played for
 * @route GET /player/{playerId}/history
 * @param {integer} playerId.path.required - player id
 * @group player - Operations about player
 * @operationId getPlayerHistory
 * @produces application/json
 * @returns {Array.<HistoryTeam>} 200 - An array of teams info
 * @returns {string} 404 - team not found
 * @returns {string} 500 - Internal Server Error
 */
 playerRouter.get("/player/:playerId/history", getPlayerHistory);

/**
 * Get player by id
 * @route GET /players/{playerId}
 * @param {integer} playerId.path.required - player id to get
 * @group player - Operations about player
 * @operationId getPlayer
 * @produces application/json
 * @consumes application/json
 * @returns {Player} 200 - player with requested id
 * @returns {string} 404 - player was not found
 * @returns {string} 500 - Internal Server Error
 */
playerRouter.get("/players/:playerId", getPlayer);

// /**
//  * Update player with specified id
//  * @route PUT /players/{playerId}
//  * @param {integer} playerId.path.required - player id to get
//  * @group player - Operations about player
//  * @param {PlayerUpdInfo.model} player.body.required - player info to update
//  * @operationId putPlayer
//  * @produces text/plain
//  * @consumes application/json
//  * @returns {string} 200 - ok
//  * @returns {string} 404 - not found
//  * @security JWT
//  */
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
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
playerRouter.delete("/players/:playerId", auth, deletePlayer);

/**
 * Get all players collection
 * @route GET /players
 * @group player - Operations about player
 * @operationId getPlayers
 * @produces application/json
 * @returns {Array.<Player>} 200 - An array of players info
 * @returns {string} 500 - Internal Server Error
 */
playerRouter.get("/players", getAllPlayers);

/**
 * Create new player in database
 * @route POST /players
 * @group player - Operations about player
 * @param {Player} players.body.required - player to add
 * @operationId createPlayer
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - ok
 * @returns {string} 403 - no enough rights
 * @returns {string} 405 - invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
playerRouter.post("/players", auth, postPlayer);

export default playerRouter;
