import { CKLTimeEntryPostRequest } from 'clockify-api/dist/api/workspaces/time-entry';
import { ContextMessageUpdate, Markup } from 'telegraf';
import { MongoSessionContext } from 'telegraf-session-mongodb-fork';
import { I18nManager } from '../../i18n';
import { sendMainMenu } from '../../menu/send-menu';
import { getSession } from '../../utils';
import { blockLeaveMiddleware } from '../../utils/block-leave';
import { getClockify } from '../../utils/get-clockify';
import { getClockifyWorkspace } from '../../utils/get-clockify-workspace';
import { leaveScene } from '../../utils/leave-scene';
import { reenterScene } from '../../utils/reenter-scene';
import { createClockifyTimeRange } from './helpers/create-clockify-time-range';
import { getFillDayState } from './helpers/get-state';
import { FILL_DAY_STATE, IFillDayState } from './helpers/states';

const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

// TODO: Add FSM

export const fillDayScene = new Scene('fill-day');
fillDayScene.hears(/↩️/i, (ctx: ContextMessageUpdate) => {
  const state = getFillDayState(ctx);

  if (state === null) return leaveScene(ctx as any);

  if (state.stateName === FILL_DAY_STATE.PROJECT_SELECT) { return leaveScene(ctx as any); }
  if (state.stateName === FILL_DAY_STATE.HOURS_SELECT) return reenterScene(ctx);
});

fillDayScene.leave(blockLeaveMiddleware, sendMainMenu);
fillDayScene.enter(async (ctx: MongoSessionContext) => {
  const user = await getClockify(ctx).user.get();
  const projects = await getClockify(ctx).workspaces(user.activeWorkspace).projects.get();

  const state: IFillDayState = {
    projects,
    stateName: FILL_DAY_STATE.PROJECT_SELECT
  };

  getSession(ctx).state = state;
  await ctx.saveSession();

  await ctx.reply(
    I18nManager.getString(ctx, 'SCENE_FILL_DAY_WELCOME'),
    Markup.keyboard([
      ...projects.map((item) => item.name),
      '↩️ ' + I18nManager.getString(ctx, 'MENU_BACK')
    ], { columns: projects.length >= 2 ? 3 : 2 })
      // @ts-ignore
      .resize()
      .extra()
  );
});

fillDayScene.on('message', (ctx: MongoSessionContext) => {
  if (ctx.message === undefined) return;
  if (ctx.message.text && ctx.message.text.includes('↩️')) return;

  const state = getFillDayState(ctx);

  const stateName = state ? state.stateName : FILL_DAY_STATE.PROJECT_SELECT;
  if (stateName === FILL_DAY_STATE.PROJECT_SELECT) return selectProjectCallback(ctx);
  if (stateName === FILL_DAY_STATE.HOURS_SELECT) return fillProjectCallback(ctx);

  reenterScene(ctx);
});

async function selectProjectCallback(ctx: MongoSessionContext) {
  // @ts-ignore
  const projectName: string = ctx.message.text;
  const project = getFillDayState(ctx).projects.find((item) => item.name === projectName);

  if (project === undefined) return reenterScene(ctx);

  const nextState: Partial<IFillDayState> = {
    project,
    stateName: FILL_DAY_STATE.HOURS_SELECT
  };

  getSession(ctx).state = nextState;
  await ctx.saveSession();

  const hours: Array<string> = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h'];
  await ctx.reply(
    I18nManager.getString(ctx, 'SCENE_FILL_DAY_TIME_SELECT'),
    Markup.keyboard([
      ...hours,
      '↩️ ' + I18nManager.getString(ctx, 'MENU_BACK')
    ], { columns: 4 })
      // @ts-ignore
      .resize()
      .extra()
  );
}

async function fillProjectCallback(ctx: MongoSessionContext) {
  const hours = parseInt(ctx.message.text, 10);
  const range = createClockifyTimeRange(hours);

  const request: Partial<CKLTimeEntryPostRequest> = {
    ...range,
    billable: getFillDayState(ctx).project.billable,
    description: '',
    projectId: getFillDayState(ctx).project.id
  };

  await getClockify(ctx).workspaces(getFillDayState(ctx).project.workspaceId).timeEntry.post(request as any);

  await I18nManager.replyWithSticker(ctx, 'SCENE_FILL_DAY_SUCCESS_STICKERS');
  await leaveScene(ctx);
}
