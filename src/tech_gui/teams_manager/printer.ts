import { HistoryTeam, Team } from "../../model/Team";

export class TeamsPrinter {
  processing(): void {
    console.log("Выполняю...");
  }

  printTeam(team: Team): void {
    console.log(team.toString());
  }

  inviteTeamName(): void {
    console.log("Введите название команды: ");
  }

  inviteTeamDesc(): void {
    console.log("Введите описание команды: ");
  }

  inviteTeamId(): void {
    console.log("Введите Id команды: ");
  }

  invitePlayerId(): void {
    console.log("Введите ID игрока: ");
  }

  printHistory(history: HistoryTeam) {
    console.log(history.toString());
  }
}
