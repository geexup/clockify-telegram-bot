import moment from 'moment';

import { CKLProject } from 'clockify-api/dist/interfaces/project.interface';
import { ContextMessageUpdate } from 'telegraf';
import { I18nManager } from '../../../i18n';
import { Puppeteer } from '../../../puppeteer';
import { CLASSES } from '../../../puppeteer/render/styles';
import { ITable } from '../../../puppeteer/table';
import { getClockify } from '../../../utils/get-clockify';
import { filterWeek, timeFromDuradtion, timeToString, weekRange } from '../utils/time';

export async function weekReport(ctx: ContextMessageUpdate) {
  const timePerProject: {
    [projectId: string]: {
      project: CKLProject;
      days: { [weekDay: number]: number; }
    }
  } = {};

  await ctx.replyWithChatAction('typing');
  const [user, workspace] = await Promise.all([
    getClockify(ctx).user.get(),
    getClockify(ctx).workspaces.get()
  ]);

  const activeWorkspace = workspace.find((item) => item.id === user.activeWorkspace);
  const timeEnteries = await getClockify(ctx)
    .webApi
    .workspaces(activeWorkspace.id)
    .timeEntries
    .user(user.id)
    .entriesInRange(weekRange());

  await ctx.replyWithChatAction('upload_photo');
  const displaySeconds = activeWorkspace.workspaceSettings.trackTimeDownToSecond;

  timeEnteries
    .filter(filterWeek())
    .forEach((item) => {
      let weekDay = moment.utc(item.timeInterval.start).get('weekday') - 1;
      if (weekDay === -1) weekDay = 6;

      const time = timeFromDuradtion(item.timeInterval.duration);
      if (!timePerProject[item.projectId]) timePerProject[item.projectId] = { project: item.project, days: {}};
      if (timePerProject[item.projectId].days[weekDay]) timePerProject[item.projectId].days[weekDay] += time;
      else timePerProject[item.projectId].days[weekDay] = time;
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
    const projectTimeDays = timePerProject[projectId];

    row.cells.push({ value: projectTimeDays.project.name, align: 'center' });

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dayTime = projectTimeDays.days[dayIndex];
      if (!dayTime) row.cells.push(makeEmptyCell());
      else {
        row.cells.push({
          align: 'center',
          value: timeToString(dayTime, displaySeconds)
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
