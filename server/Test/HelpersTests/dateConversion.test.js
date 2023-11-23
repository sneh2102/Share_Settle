const {calculatePeriodFromString} = require('../../helper/dateConversion');
const {CronTime} = require('cron-time-generator');

describe('calculatePeriodFromString', () => {

  test('should return a valid date for minutes', () => {
    const result = calculatePeriodFromString('5 minutes');
    const expected = CronTime.every(5).minutes();
    expect(result.toString()).toEqual(expected);
  });

  test('should return a valid date for days', () => {
    const result = calculatePeriodFromString('3 days');
    const expected = CronTime.every(3).days();
    expect(result).toEqual(expected);
  });

  test('should return a valid date for weeks', () => {
    const result = calculatePeriodFromString('2 weeks');
    const expected = CronTime.every(2*7).days();
    expect(result).toEqual(expected);
  });

  test('should return a valid date for months', () => {
    const result = calculatePeriodFromString('4 months');
    const expected = CronTime.every(120).days();
    expect(result).toEqual(expected);
  });

  test('should return a valid date for years', () => {
    const result = calculatePeriodFromString('1 year');
    const expected = CronTime.every(365).days();
    expect(result).toEqual(expected);
  });

  test('should default to daysInWeek when the unit is not recognized', () => {
    const result = calculatePeriodFromString('10 unknown');
    const expected = CronTime.every(0).days();
    expect(result).toEqual(expected);
  });

  // Additional test cases for edge scenarios and invalid inputs

  test('should return a valid date for 0 minutes (edge case)', () => {
    const result = calculatePeriodFromString('0 minutes');
    const expected = CronTime.every(0).minutes();
    expect(result).toEqual(expected);
  });

  test('should default to daysInWeek for negative values (edge case)', () => {
    const result = calculatePeriodFromString('-3 days');
    const expected = CronTime.every(0).days();
    expect(result).toEqual(expected);
  });

  test('should default to daysInWeek for invalid input (edge case)', () => {
    const result = calculatePeriodFromString('invalid input');
    const expected = CronTime.every(0).days();
    expect(result).toEqual(expected);
  });
});
