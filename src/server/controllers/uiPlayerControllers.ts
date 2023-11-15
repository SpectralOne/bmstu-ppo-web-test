import { Request, Response, NextFunction } from "express";
import { playersController, teamsController } from "../init";
import { InvalidArgumentError, PermissionError } from "../../logic/error";
import { DTOPlayer } from "../models";
import { safetyWrapper } from "../common";

export const getPlayer = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const id = req.params && req.params.playerId && parseInt(req.params.playerId);
    if (id !== 0 && !id)
      throw new InvalidArgumentError("failed to parse id");
    const player = await playersController.getPlayer(id);
    res.status(200).json(player);
  });
};

// const modifyPlayer = (req: Request, res: Response, _next: NextFunction) => {
//     safetyWrapper(res, async () => {
//         const playerUpdInfo = new DTOPlayerUpdate(req.body);
//         if (!playerUpdInfo)
//             throw new InvalidArgumentError("Can't parse player");
//         const playerId = req.params && req.params.playerId && parseInt(req.params.playerId);
//         if (!playerId)
//             throw new InvalidArgumentError("Can't parse player id");

//         await playersController.updatePlayer(playerId, playerUpdInfo, req.user);
//         res.status(200).send("ok");
//     });
// };

export const deletePlayer = (req: any, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const user = req.user;
    if (!user)
      throw new PermissionError("Unauthorized");

    const playerId = req?.params?.playerId && parseInt(req.params.playerId);
    if (playerId !== 0 && !playerId)
      throw new InvalidArgumentError("Can't parse player id");

    const player = await playersController.getPlayer(playerId);
    const playerOwner = player?.owner;
    if (playerOwner !== user.id && user.privelegelevel !== 1)
      throw new PermissionError("This player does not belongs to you.");

    await playersController.delPlayer(playerId);
    res.status(200).send("ok");
  });
};

export const getAllPlayers = (_req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const players = await playersController.getPlayers();
    res.status(200).json(players);
  });
};

export const postPlayer = (req: any, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const user = req.user;
    if (!user)
      throw new PermissionError("Unauthorized");

    const player = new DTOPlayer(req.body);
    if (!player)
      throw new InvalidArgumentError("Can't parse player");
    await playersController.addPlayer(player.toPlayer());
    res.status(200).send("ok");
  });
};

export const addPlayerTeam = (req: any, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const user = req.user;
    if (!user)
      throw new PermissionError("Unauthorized");

    const playerId = req?.params?.playerId && parseInt(req.params.playerId);
    if (playerId !== 0 && !playerId)
      throw new InvalidArgumentError("Can't parse player ID");

    const teamId = req?.params?.teamId && parseInt(req.params.teamId);
    if (teamId !== 0 && !teamId)
      throw new InvalidArgumentError("Can't parse team ID");

    const team = await teamsController.getTeam(teamId)
    const teamOwner = team?.owner;
    if (teamOwner !== user.id && user.privelegelevel !== 1)
      throw new PermissionError("This team does not belongs to you.");

    // exception, if no such team or player
    await playersController.addPlayerTeam(playerId, teamId);
    res.status(200).send("ok");
  });
};

export const deletePlayerTeam = (req: any, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const user = req.user;
    if (!user)
      throw new PermissionError("Unauthorized");

    const playerId = req?.params?.playerId && parseInt(req.params.playerId);
    if (playerId !== 0 && !playerId)
      throw new InvalidArgumentError("Can't parse player ID in params");

    const teamId = req?.params?.teamId && parseInt(req.params.teamId);
    if (playerId !== 0 && !teamId)
      throw new InvalidArgumentError("Can't parse team ID");

    const team = await teamsController.getTeam(teamId)
    const teamOwner = team?.owner;
    if (teamOwner !== user.id && user.privelegelevel !== 1)
      throw new PermissionError("This team does not belongs to you.");

    // exception, if no such team or player
    await playersController.delPlayerTeam(playerId, teamId);
    res.status(200).send("ok");
  });
};
