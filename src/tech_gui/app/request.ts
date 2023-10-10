export enum RequestOps {
  EXIT_ALL,
  EXIT,
  SIGNUP,
  SIGNIN,
  LIST_PLAYERS,
  ADD_PLAYER,
  REMOVE_PLAYER,
  ADD_TEAM,
  REMOVE_TEAM,
  ADD_TO_TEAM,
  REMOVE_FROM_TEAM,
  LIST_TEAMS,
  LIST_SQUADS,
  GET_PLAYER_HISTORY
}

export const parseRequest = (rawRequest: any) => {
  const num = +rawRequest;
  return (
    //num === NaN ||
    num < RequestOps.EXIT_ALL ||
    num > RequestOps.GET_PLAYER_HISTORY)

    ? null
    : num;
}
