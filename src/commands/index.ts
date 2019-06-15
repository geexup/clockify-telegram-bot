import Telegraf, { ContextMessageUpdate, Middleware } from 'telegraf';
import { dumpCmd } from './dump.command';
import { adminCmd } from './admin.command';
import { infoCmd } from './info.command';
import { loginCmd } from './login.command';
import { logoutCmd } from './logout.command';
import { menuCmd } from './menu.command';

const commandsDescription: Array<{
  name: string;
  description: string;
}> = [];

export function registerCommands(bot: Telegraf<ContextMessageUpdate>) {
  registerCommand(bot, 'info', 'Информация о текущем пользователе', false, infoCmd);
  registerCommand(bot, 'login', 'Войти в Clockify', false, loginCmd);
  registerCommand(bot, 'logout', 'Выйти', false, logoutCmd);

  registerCommand(bot, 'dump', 'Дамп информации о пользователе', false, dumpCmd);
  registerCommand(bot, 'admin', 'Администрирование', false, adminCmd);
  registerCommand(bot, 'menu', 'Меню', false, menuCmd);
}

function registerCommand(
  bot: Telegraf<ContextMessageUpdate>,
  name: string,
  description: string,
  isPrivate: boolean,
  cmd: Array<Middleware<ContextMessageUpdate>>
) {
  if (!isPrivate) commandsDescription.push({
    name,
    description
  });

  const [first, ...rest] = cmd;
  bot.command(name, first, ...rest);
}

export function createCommandList(): string {
  return commandsDescription.map(item => `${item.name} - ${item.description}`).join('\n');
}
