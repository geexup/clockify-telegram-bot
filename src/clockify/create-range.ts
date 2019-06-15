import moment from 'moment';

const CLOCKIFY_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export function createRange(hours: number = 8) {
  const startMoment = moment().utc().set('minute', 0).set('seconds', 0).set('millisecond', 0);
  const endMoment = moment().utc().set('minute', 0).set('seconds', 0).set('millisecond', 0).add('hour', hours);

  return {
    start: startMoment.format(CLOCKIFY_DATE_FORMAT),
    end: endMoment.format(CLOCKIFY_DATE_FORMAT)
  };
}
