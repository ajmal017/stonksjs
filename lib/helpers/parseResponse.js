const camelcaseKeys = require('camelcase-keys');
const parseISO = require('date-fns/parseISO');
const isNumeric = require('./isNumeric');

const dateKeys = [
  'nextOpen',
  'nextClose',
  'timestamp',
];

const parseResponse = (response) => {
  if (Array.isArray(response)) {
    return response.map(parseResponse);
  }
  const output = {};
  const camelCaseObject = camelcaseKeys(response);
  Object.entries(camelCaseObject).forEach(([key, value]) => {
    if (isNumeric(value)) {
      output[key] = parseFloat(value);
      return;
    }
    if (key.endsWith('At') || dateKeys.includes(key)) {
      output[key] = value && parseISO(value);
      return;
    }
    output[key] = value;
  });
  return output;
};

module.exports = parseResponse;
