const { formatters } = require('../app/formatters');

describe('formatters are consistent', () => {
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

xdescribe('gb formatter', () => {
  it('should ...', () => {
    const formatter = formatters.find((fm) => fm.locale === 'gb');
    const result = formatter.format(data);
    expect(result[0]).toEqual('recipient');
  });
});
