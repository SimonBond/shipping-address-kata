const { formatters } = require('../app/formatters');

describe('formatters are consistent and', () => {
  it('should have canFormat methods', () => {
    formatters.forEach((formatter) => {
      expect(typeof formatter.canFormat).toEqual('function');
    });
  });

  it('should have format methods', () => {
    formatters.forEach((formatter) => {
      expect(typeof formatter.format).toEqual('function');
    });
  });
});

const data = {
  recipient: 'recipient',
  addressLine1: 'Line 1',
  addressLine2: 'Line 2',
  addressLine3: 'Line 3',
  addressLine4: 'Line 4',
  locality: 'locality',
  region: 'region',
  postcode: 'postcode',
  country: 'country',
};

describe('Each formatter', () => {
  it('should return a result when asked to format something', () => {
    formatters.forEach((formatter) => {
      const result = formatter.format(data);
      expect(result.length > 0).toBeTruthy();
      expect(result[0]).toBeTruthy();
    });
  });

  it('should return an empty array when asked to format nothing', () => {
    formatters.forEach((formatter) => {
      const result = formatter.format(undefined);
      expect(result).toEqual([]);
    });
  });
});
