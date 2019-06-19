import { CKLWebTimeEntryInRange } from 'clockify-api/dist/interfaces/time-entry.interface';
import moment from 'moment';
import { CLOCKIFY_DATE_FORMAT } from '../../fill-day/helpers/create-clockify-time-range';

export function filterWeek() {
  const maxDay = moment().utc().set('weekday', 7).get('D');
  const minDay = moment().utc().set('weekday', 1).get('D');
  return (item: CKLWebTimeEntryInRange): boolean =>
    moment.utc(item.timeInterval.start).get('D') <= maxDay
    && moment.utc(item.timeInterval.start).get('D') >= minDay;
}

export function weekRange() {
  const makeDay = () => moment().utc().set('hours', 0).set('minute', 0).set('seconds', 0).set('millisecond', 0);
  const startMoment = makeDay().set('weekday', 1);
  const endMoment = makeDay().set('weekday', 8).subtract('seconds', 1);

  return {
    end: endMoment.format(CLOCKIFY_DATE_FORMAT),
    start: startMoment.format(CLOCKIFY_DATE_FORMAT)
  };
}

export function timeFromDuradtion(clockifyDuration: string) {
  const r = /PT([0-9]+H)?([0-9]+M)?([0-9]+S)?/g;
  const [str, chours, cminutes, cseconds] = r.exec(clockifyDuration);

  const replaceAndParse = (item: string | undefined, unit: string) => parseInt(item ? item.replace(unit, '') : '0', 10);
  const hours = replaceAndParse(chours, 'H');
  const minutes = replaceAndParse(cminutes, 'M');
  const seconds = replaceAndParse(cseconds, 'S');

  return (hours * 60 * 60 * 1000)
    + (minutes * 60 * 1000)
    + (seconds * 1000);
}

export function timeToString(time: number, displaySeconds = true) {
  const hours = Math.floor(time / 1000 / 60 / 60);
  const minutes = Math.floor(time / 1000 / 60) - hours * 60;
  const seconds = Math.floor(time / 1000) - minutes * 60 - hours * 60 * 60;
  const addZero = (num: number) => num < 10 ? '0' + num : num;

  const result = [
    addZero(hours),
    addZero(minutes)
  ];

  if (displaySeconds) result.push(addZero(seconds));
  return result.join(':');
}
