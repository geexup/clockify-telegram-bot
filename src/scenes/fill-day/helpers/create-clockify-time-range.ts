import moment from 'moment';

export const CLOCKIFY_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export function createClockifyTimeRange(hours: number = 8) {
  const startMoment = moment().utc().set('minute', 0).set('seconds', 0).set('millisecond', 0);
  const endMoment = moment().utc().set('minute', 0).set('seconds', 0).set('millisecond', 0).add(hours, 'hour');

  return {
    end: endMoment.format(CLOCKIFY_DATE_FORMAT),
    start: startMoment.format(CLOCKIFY_DATE_FORMAT)
  };
}
