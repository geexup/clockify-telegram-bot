import moment from 'moment';

import { ContextMessageUpdate } from 'telegraf';
import { I18nManager } from '../../../i18n';
import { Puppeteer } from '../../../puppeteer';
import { CLASSES } from '../../../puppeteer/render/styles';
import { ITable } from '../../../puppeteer/table';
import { getClockify } from '../../../utils/get-clockify';
import { filterWeek, timeFromDuradtion, timeToString, weekRange } from '../utils/time';

export async function weekReport(ctx: ContextMessageUpdate) {
  const timePerProject: { [projectId: string]: { [weekDay: number]: number }} = {};

  await ctx.replyWithChatAction('typing');
  const [user, workspace] = await Promise.all([
    getClockify(ctx).user.get(),
    getClockify(ctx).workspaces.get()
  ]);

  const activeWorkspace = workspace.find((item) => item.id === user.activeWorkspace);
  const projects = await getClockify(ctx).workspaces(activeWorkspace.id).projects.get();
  const timeEnteries = await getClockify(ctx)
    .workspaces(user.activeWorkspace)
    .user(user.id).timeEntries.get({
      ...weekRange()
    });

  await ctx.replyWithChatAction('upload_photo');
  const displaySeconds = activeWorkspace.workspaceSettings.trackTimeDownToSecond;

  timeEnteries.filter(filterWeek()).forEach((item) => {
    let weekDay = moment.utc(item.timeInterval.start).get('weekday') - 1;
    if (weekDay === -1) weekDay = 6;

    const time = timeFromDuradtion(item.timeInterval.duration);
    if (!timePerProject[item.projectId]) timePerProject[item.projectId] = {};
    if (timePerProject[item.projectId][weekDay]) timePerProject[item.projectId][weekDay] += time;
    else timePerProject[item.projectId][weekDay] = time;
  });

  const table: ITable = {
    columns: [
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_MENU_WEEK_PROJECTS'), main: true },
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_MONDAY') },
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_TUESDAY') },
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_WEDNESDAY') },
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_THURSDAY') },
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_FRIDAY') },
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_SATURDAY') },
      { title: I18nManager.getString(ctx, 'SCENE_REPORTS_SUNDAY') }
    ],
    rows: []
  };

  const makeEmptyCell: () => ITable['rows'][0]['cells'][0] = () => ({
    align: 'center',
    class: [CLASSES.TEXT_MUTED],
    value: timeToString(0, displaySeconds)
  });

  for (const projectId in timePerProject) {
    const row: ITable['rows'][0] = { cells: [] };
    const project = projects.find((item) => item.id === projectId);

    row.cells.push({ value: project.name, align: 'center' });

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const day = timePerProject[projectId][dayIndex];
      if (!day) row.cells.push(makeEmptyCell());
      else {
        row.cells.push({
          align: 'center',
          value: timeToString(day, displaySeconds)
        });
      }
    }

    table.rows.push(row);
  }

  const image = await Puppeteer.generateTableImage(table, 'vertical');
  await ctx.replyWithPhoto({ source: image });

  // Debug
  // const html = generateVerticalHtml(table);
  // ctx.replyWithDocument({ source: Buffer.from(html, 'utf8'), filename: 'card.html' });
}
