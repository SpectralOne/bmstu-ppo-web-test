import { Player } from "../../model/Player";

export class PlayersPrinter {
  constructor() { }

  printPlayer(player: Player): void {
    console.log(player.toString());
  }

  inviteTeamId(): void {
    console.log("Введите ID команды: ");
  }

  invitePlayerId(): void {
    console.log("Введите ID игрока: ");
  }

  inviteDelId(): void {
    console.log("Введите ID игрока для удаления: ");
  }

  inviteFname(): void {
    console.log("Введите имя игрока: ");
  }

  inviteLname(): void {
    console.log("Введите фамилию игрока: ");
  }

  inviteCntry(): void {
    console.log("Введите страну игрока: ");
  }

  inviteDob(): void {
    console.log("Введите дату рождения игрока в формате (ГГГГ-ММ-ДД): ");
  }
}
