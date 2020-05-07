const parseResponse = require('../parseResponse');
const mockPositions = require('../../../__mocks__/positions');

const response = mockPositions[0];

describe('parseResponse', () => {
  let results;
  beforeEach(() => {
    results = parseResponse(response);
  });

  it('should handle object without error', () => {
    expect(results).toBeInstanceOf(Object);
  });

  it('should camelcase keys', () => {
    const keys = Object.keys(results);
    expect(keys.includes('asset_id')).toBe(false);
    expect(keys.includes('assetId')).toBe(true);
  });

  it('should convert data types', () => {
    expect(typeof results.qty).toEqual('number');
    expect(results.createdAt instanceof Date).toBe(true);
  });
});
