const MENU_ENTRIES = "\
0.  Выйти из программы.\n\
1.  Выйти из системы.\n\
2.  Зарегистрироваться в системе.\n\
3.  Войти в систему.\n\
4.  Показать всех игроков.\n\
5.  Добавить игрока.\n\
6.  Удалить игрока.\n\
7.  Создать команду.\n\
8.  Удалить команду.\n\
9.  Добавить игрока в команду.\n\
10. Удалить игрока из команды.\n\
11. Посмотреть список команд.\n\
12. Посмотреть команды игрока.\n";

export class AppPrinter {
  constructor() { }

  authentification(signIn: boolean, success: boolean): void {
    console.log(`[AUTH OPERATION] in: ${signIn}, success: ${success}\n`);
  }

  teamsManager(success: boolean): void {
    console.log(`[TEAMS MANAGER] success: ${success}\n`);
  }

  playersManager(success: boolean): void {
    console.log(`[PLAYERS MANAGER] success: ${success}\n`);
  }

  printMenu() {
    console.log(MENU_ENTRIES);
  }

  printError(e: string): void {
    console.log(`Error occured (${e})`);
  }
}
