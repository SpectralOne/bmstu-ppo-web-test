import { Request, Response, NextFunction } from "express";
import { playersController } from "../init";
import { InvalidArgumentError } from "../../logic/error";
import { DTOPlayer } from "../models";
import { safetyWrapper } from "../common";

export const getPlayer = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const id = req.params && req.params.playerId && parseInt(req.params.playerId);
    if (!id)
      throw new InvalidArgumentError("failed to parse id");
    const player = await playersController.getPlayer(id);
    res.status(200).json(player);
  });
};

// const modifyPlayer = (req, res, _next) => {
//     safetyWrapper(res, async () => {
//         const playerUpdInfo = new DTOPlayerUpdInfo(req.body);
//         if (!playerUpdInfo)
//             throw InvalidArgumentError("Can't parse player");
//         const playerId = req.params && req.params.playerId && parseInt(req.params.playerId);
//         if (!playerId)
//             throw InvalidArgumentError("Can't parse player id");

//         await playersService.updatePlayer(playerId, playerUpdInfo, req.user);
//         res.status(200).send("ok");
//     });
// };

export const deletePlayer = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const playerId = req.params && req.params.playerId && parseInt(req.params.playerId);
    if (!playerId)
      throw new InvalidArgumentError("Can't parse player id");
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

export const postPlayer = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const player = new DTOPlayer(req.body);
    if (!player)
      throw new InvalidArgumentError("Can't parse player");
    await playersController.addPlayer(player.toPlayer());
    res.status(200).send("ok");
  });
};


export const addPlayerTeam = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const playerId = req.body && parseInt(req.body);
    if (!playerId)
      throw new InvalidArgumentError("Can't parse player ID in body");
    const teamId = req.params.teamId && parseInt(req.params.teamId);
    if (!teamId)
      throw new InvalidArgumentError("Can't parse team ID");
    // exception, if no such team or player
    await playersController.addPlayerTeam(teamId, playerId);
    res.status(200).send("ok");
  });
};

export const deletePlayerTeam = (req: Request, res: Response, _next: NextFunction) => {
  safetyWrapper(res, async () => {
    const playerId = req.body && parseInt(req.body);
    if (!playerId)
      throw new InvalidArgumentError("Can't parse player ID in body");
    const teamId = req.params.teamId && parseInt(req.params.teamId);
    if (!teamId)
      throw new InvalidArgumentError("Can't parse team ID");
    // exception, if no such team or player
    await playersController.delPlayerTeam(teamId, playerId);
    res.status(200).send("ok");
  });
};
