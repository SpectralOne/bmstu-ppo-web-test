
import { Request, Response, NextFunction } from "express";
import { teamsController } from "../init";
import { InvalidArgumentError } from "../../logic/error";
import { DTOTeam } from "../models";
import { safetyWrapper } from "../common";

export const getPlayerTeams = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const id = req.params.playerId && parseInt(req.params.playerId);
    if (!id)
      throw new InvalidArgumentError("Can't parse players ID");
    const teams = await teamsController.getPlayerTeams(id);
    res.status(200).json(teams);
  });
};

export const getTeam = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const teamId = req.params.teamId && parseInt(req.params.teamId);
    if (!teamId)
      throw new InvalidArgumentError("Can't parse team ID");
    const team = await teamsController.getTeam(teamId);
    res.status(200).json(team);
  });
};

// export const updateTeamName = (req: Request, res: Response, _next: NextFunction) => {
//   safetyWrapper(res, async () => {
//     const teamId = req.params.teamId && parseInt(req.params.teamId);
//     if (!teamId)
//       throw new InvalidArgumentError("Can't parse team ID");
//     const newName = req.body;
//     if (!newName)
//       throw new InvalidArgumentError("Can't parse team name");

//     const team = new Team(teamId, req.user.id, newName);
//     await teamsController.updateTeam(team, req.user);
//     res.status(200).send("ok");
//   });
// };

export const deleteTeam = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const teamId = req.params.teamId && parseInt(req.params.teamId);
    if (!teamId)
      throw new InvalidArgumentError("Can't parse team ID");
    await teamsController.delTeam(teamId);
    res.status(200).send("ok");
  });
};

export const getAllTeams = (_req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const teams = await teamsController.getTeams();
    res.status(200).json(teams);
  });
};

export const addNewTeam = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const team = (new DTOTeam(req.body)).toTeam();
    if (!team)
      throw new InvalidArgumentError("Can't parse team");
    await teamsController.addTeam(team);
    res.status(200).send("ok");
  });
};
