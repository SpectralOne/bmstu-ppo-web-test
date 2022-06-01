import express, { Router } from "express";

import { addNewTeam, deleteTeam, getAllTeams, getPlayerTeams, getTeam, getPlayerHistory } from "../controllers/uiTeamControllers";
import { auth } from "../controllers/CommonControllers";

const teamRouter: Router = express.Router();

/**
 * Get all teams for player
 * @route GET /teams/{playerId}/teams
 * @param {integer} playerId.path.required - player id
 * @group team - Operations about team
 * @operationId getPlayerTeams
 * @produces application/json
 * @returns {Array.<Teams.model>} 200 - An array of teams info
 * @returns {string} 404 - team not found
 */
teamRouter.get("/teams/:playerId/teams", getPlayerTeams);

/**
 * Get all teams player played for
 * @route GET /teams/{playerId}/history
 * @param {integer} playerId.path.required - player id
 * @group team - Operations about team
 * @operationId getPlayerHistory
 * @produces application/json
 * @returns {Array.<HistoryTeam.model>} 200 - An array of teams info
 * @returns {string} 404 - team not found
 */
 teamRouter.get("/teams/:playerId/history", getPlayerHistory);

/**
 * Get team by id
 * @route GET /teams/{teamId}
 * @param {integer} teamId.path.required - team id to get
 * @group team - Operations about team
 * @operationId getTeam
 * @produces application/json
 * @returns {Player.model} 200 - team with requested id
 * @returns {string} 404 - team wasn't found
 */
teamRouter.get("/teams/:teamId", getTeam);

/**
 * Update team name
 * @route PUT /teams/{teamId}
 * @param {integer} teamId.path.required - team id to set name
 * @param {string} teamName.body.required - new team name
 * @group team - Operations about team
 * @operationId updateTeamName
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - Ok
 * @returns {string} 403 - No enough rights
 * @returns {string} 404 - Team not found
 * @returns {string} 405 - Invalid input
 * @security JWT
 */
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
 * @security JWT
 */
teamRouter.delete("/teams/:teamId", deleteTeam);

/**
 * Get all teams
 * @route GET /teams
 * @group team - Operations about team
 * @operationId getTeams
 * @produces application/json
 * @returns {Array.<Team.model>} 200 - An array of players info
 */
teamRouter.get("/teams", getAllTeams);

/**
 * Create new team
 * @route POST /team
 * @group team - Operations about team
 * @param {Team.model} team.body.required - team to add
 * @operationId createTeam
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - Ok
 * @returns {string} 403 - No enough rights
 * @returns {string} 405 - Invalid input
 * @security JWT
 */
teamRouter.post("/team", addNewTeam);

export default teamRouter;
