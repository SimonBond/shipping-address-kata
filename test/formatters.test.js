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

describe('On each formatter', () => {
  describe('format', () => {
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

  describe('canFormat', () => {
    it('should return false when addressData is undefined', () => {
      formatters.forEach((formatter) => {
        const result = formatter.canFormat(undefined);
        expect(result).toEqual(false);
      });
    });

    it('should return false when addressData.country is undefined', () => {
      const badData = {
        recipient: 'recipient',
        addressLine1: 'Line 1',
        addressLine2: 'Line 2',
        addressLine3: 'Line 3',
        addressLine4: 'Line 4',
        locality: 'locality',
        region: 'region',
        postcode: 'postcode',
      };
      formatters.forEach((formatter) => {
        const result = formatter.canFormat(badData);
        expect(result).toEqual(false);
      });
    });
  });
});
