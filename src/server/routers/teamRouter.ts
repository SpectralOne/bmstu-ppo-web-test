import express, { Router } from "express";

import { addNewTeam, deleteTeam, getAllTeams, getTeam } from "../controllers/uiTeamControllers";
import { addPlayerTeam, deletePlayerTeam } from "../controllers/uiPlayerControllers";
import { auth } from "../controllers/CommonControllers";

const teamRouter: Router = express.Router();

/**
 * Get team by id
 * @route GET /teams/{teamId}
 * @param {integer} teamId.path.required - team id to get
 * @group team - Operations about team
 * @operationId getTeam
 * @produces application/json
 * @returns {Player} 200 - team with requested id
 * @returns {string} 404 - team wasn't found
 * @returns {string} 500 - Internal Server Error
 */
teamRouter.get("/teams/:teamId", getTeam);

// /**
//  * Update team name
//  * @route PUT /teams/{teamId}
//  * @param {integer} teamId.path.required - team id to set name
//  * @param {string} teamName.body.required - new team name
//  * @group team - Operations about team
//  * @operationId updateTeamName
//  * @produces text/plain
//  * @consumes text/plain
//  * @returns {string} 200 - Ok
//  * @returns {string} 403 - No enough rights
//  * @returns {string} 404 - Team not found
//  * @returns {string} 405 - Invalid input
//  * @returns {string} 500 - Internal Server Error
//  * @security JWT
//  */
// teamRouter.put("/teams/:teamId", auth, updateTeamName);

/**
 * Delete team
 * @route DELETE /teams/{teamId}
 * @param {integer} teamId.path.required - team id to delete
 * @group team - Operations about team
 * @operationId deleteTeam
 * @produces text/plain
 * @returns {string} 200 - Ok
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Team not found
 * @returns {string} 405 - Invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
teamRouter.delete("/teams/:teamId", auth, deleteTeam);

/**
 * Get all teams
 * @route GET /teams
 * @group team - Operations about team
 * @operationId getTeams
 * @produces application/json
 * @returns {Array.<Team>} 200 - An array of players info
 * @returns {string} 500 - Internal Server Error
 */
teamRouter.get("/teams", getAllTeams);

/**
 * Create new team
 * @route POST /teams
 * @group team - Operations about team
 * @param {Team} teams.body.required - team to add
 * @operationId createTeam
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - Ok
 * @returns {string} 403 - No enough rights
 * @returns {string} 405 - Invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
teamRouter.post("/teams", auth, addNewTeam);

/**
 * Add player (playerId) to team (teamId)
 * @route PATCH /team/{teamId}/{playerId}
 * @param {integer} teamId.path.required - team id
 * @param {integer} playerId.path.required - player id to add
 * @group team - Operations about team
 * @operationId addPlayerTeam
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Team with requested id
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Team not found
 * @returns {string} 405 - Invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
teamRouter.patch("/teams/:teamId/players/:playerId", auth, addPlayerTeam);

/**
 * Delete player from team
 * @route DELETE /team/{teamId}/{playerId}
 * @param {integer} teamId.path.required - team id to delete
 * @param {integer} playerId.path.required - player id to add
 * @group team - Operations about team
 * @operationId deletePlayerTeam
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Team with requested id
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Team not found
 * @returns {string} 405 - Invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
teamRouter.delete("/teams/:teamId/players/:playerId", auth, deletePlayerTeam);

export default teamRouter;
