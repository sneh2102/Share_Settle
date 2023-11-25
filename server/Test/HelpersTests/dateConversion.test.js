const {calculatePeriodFromString, getDate} = require('../../helper/dateConversion');
const {CronTime} = require('cron-time-generator');
 
// for calculatePeriodFromString
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
    const expected = null;
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
    const expected = null;
    expect(result).toEqual(expected);
  });
 
  test('should default to daysInWeek for invalid input (edge case)', () => {
    const result = calculatePeriodFromString('invalid input');
    const expected = null;
    expect(result).toEqual(expected);
  });
});
 
// get date method
describe('getDate', () => {
  it('should return a valid date object for minutes', () => {
    const result = getDate(5, 'minute');
    expect(result).toEqual(CronTime.every(5).minutes());
  });
 
  it('should return a valid date object for minutes (plural)', () => {
    const result = getDate(10, 'minutes');
    expect(result).toEqual(CronTime.every(10).minutes());
  });
 
  it('should return a valid date object for days', () => {
    const result = getDate(3, 'day');
    expect(result).toEqual(CronTime.every(3).days());
  });
 
  it('should return a valid date object for days (plural)', () => {
    const result = getDate(7, 'days');
    expect(result).toEqual(CronTime.every(7).days());
  });
 
  it('should return null for invalid units', () => {
    const result = getDate(5, 'invalid');
    expect(result).toBeNull();
  });
 
  it('should return null for undefined unit', () => {
    const result = getDate(5, undefined);
    expect(result).toBeNull();
  });
 
  it('should return null for null unit', () => {
    const result = getDate(5, null);
    expect(result).toBeNull();
  });
 
  it('should return null for empty unit', () => {
    const result = getDate(5, '');
    expect(result).toBeNull();
  });
});