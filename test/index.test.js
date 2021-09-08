const fs = require('fs');
const {
  transformAddress,
  templateAddress,
  loadAddressData,
  formatters,
  run,
} = require('../app/index');

describe('address label printer', () => {
  describe('transforming an address', () => {
    it('prints all address fields in the right order in UK format', () => {
      const data = {
        recipient: 'Sam Smith',
        addressLine1: 'My flat name',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
        addressLine2: 'My Apartment building',
        addressLine3: 'My complex',
        addressLine4: 'My Street',
        locality: 'My Town',
      };
      expect(transformAddress(data)).toEqual([
        'Sam Smith',
        'My flat name',
        'My Apartment building',
        'My complex',
        'My Street',
        'My Town',
        'My Region',
        'MY1 2HR',
        'UK',
      ]);
    });

    it('prints address in Swiss format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: 'Frau\nWilhemlina Waschbaer',
        addressLine1: 'Hochbaumstrasse 123 A',
        addressLine2: '',
        addressLine3: '',
        addressLine4: '',
        locality: '',
        region: 'Bern',
        country: 'SWITZERLAND',
        postcode: '5678',
      };
      expect(transformAddress(data)).toEqual([
        'Frau\nWilhemlina Waschbaer',
        'Hochbaumstrasse 123 A',
        '5678 Bern',
        'SWITZERLAND',
      ]);
    });

    it('prints address in US format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: 'Chris Niswandee',
        addressLine1: 'SMALLSYS INC',
        addressLine2: '795 E DRAGRAM',
        addressLine3: '',
        addressLine4: '',
        locality: 'TUCSON',
        region: 'AZ',
        country: 'USA',
        postcode: '85705',
      };
      expect(transformAddress(data)).toEqual([
        'CHRIS NISWANDEE',
        'SMALLSYS INC',
        '795 E DRAGRAM',
        'TUCSON AZ 85705',
        'USA',
      ]);
    });

    it('prints address in Kong Kong format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: 'Mr. CHAN Kwok-kwong',
        addressLine1: 'Flat 25, 12/F, Acacia Building',
        addressLine2: '150 Kennedy Road',
        addressLine3: '',
        addressLine4: '',
        locality: '',
        region: 'Wan Chai',
        country: 'Hong Kong',
        postcode: '',
      };
      expect(transformAddress(data)).toEqual([
        'Mr. CHAN Kwok-kwong',
        'Flat 25, 12/F, Acacia Building',
        '150 Kennedy Road',
        'WAN CHAI',
        'HONG KONG',
      ]);
    });

    it('prints address in Italy format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: 'Chris Russo',
        addressLine1: 'VIA APPIA NUOVA 123/4',
        addressLine2: '',
        addressLine3: '',
        addressLine4: '',
        locality: 'ROMA',
        region: 'RM',
        country: 'Italy',
        postcode: '00184',
      };
      expect(transformAddress(data)).toEqual([
        'CHRIS RUSSO',
        'VIA APPIA NUOVA 123/4',
        '00184 ROMA RM',
        'ITALY',
      ]);
    });

    it('prints address in France format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: 'Madame Duval',
        addressLine1: '27 RUE PASTEUR',
        addressLine2: '',
        addressLine3: '',
        addressLine4: '',
        locality: '',
        region: 'CABOURG',
        country: 'FRANCE',
        postcode: '14390',
      };
      expect(transformAddress(data)).toEqual([
        'Madame Duval',
        '27 RUE PASTEUR',
        '14390 CABOURG',
        'FRANCE',
      ]);
    });

    it('prints address in Germany format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: 'Herrn\nEberhard Wellhausen',
        addressLine1: 'Wittekindshof',
        addressLine2: 'Schulstrasse 4',
        addressLine3: '',
        addressLine4: '',
        locality: '',
        region: 'Bad Oyenhausen',
        country: 'GERMANY',
        postcode: '32547',
      };
      expect(transformAddress(data)).toEqual([
        'Herrn\nEberhard Wellhausen',
        'Wittekindshof',
        'Schulstrasse 4',
        '32547 Bad Oyenhausen',
        'GERMANY',
      ]);
    });

    it('prints address in Japan (English) format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: 'Yagita Asami',
        addressLine1: 'Higashi Azabu IS Bldg 4F',
        addressLine2: 'Higashi Azabu 1-8-1',
        addressLine3: '',
        addressLine4: '',
        locality: 'Minato-ku',
        region: 'Tokyo',
        country: 'JAPAN',
        postcode: '106-0044',
      };
      // expect the country to be included as well.
      expect(transformAddress(data)).toEqual([
        'Yagita Asami',
        'Higashi Azabu IS Bldg 4F',
        'Higashi Azabu 1-8-1',
        'Minato-ku Tokyo 106-0044',
        'JAPAN',
      ]);
    });

    it('prints address in Japan (Japanese) format', () => {
      // Fixed order of postcode and country
      const data = {
        recipient: '麻美  八木田',
        addressLine1: '東麻布ISビル4F',
        addressLine2: '東麻布1-8-1',
        addressLine3: '',
        addressLine4: '',
        locality: '港区',
        region: '東京都',
        country: 'JAPAN',
        postcode: '106-0044',
      };
      // expect the recipient and country to be included as well.
      // note spaces are added in addressLine1 and addressLine2 which are
      // not present at www.japan-guide.com/e/e2224.html
      expect(transformAddress(data)).toEqual([
        '〒 106-0044',
        '東京都港区東麻布 1-8-1',
        '東麻布 IS ビル 4F',
        '麻美  八木田',
        'JAPAN',
      ]);
    });

    it('ignores empty lines', () => {
      // fixed order of postcode and country
      const data = {
        recipient: 'Sam Smith',
        addressLine1: '7 My Road',
        addressLine2: '',
        addressLine3: '',
        addressLine4: '',
        locality: 'My Town',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
      };
      expect(transformAddress(data)).toEqual([
        'Sam Smith',
        '7 My Road',
        'My Town',
        'My Region',
        'MY1 2HR',
        'UK',
      ]);
    });
  });

  describe('templating a label', () => {
    it('draws beginning and end lines', () => {
      const addressList = ['one', 'two', 'three'];
      expect(templateAddress(addressList)).toMatch(/\+(-){8}.*/);
    });
    it('places address list items on new lines', () => {
      const addressList = ['one', 'two', 'three'];
      expect(templateAddress(addressList)).toMatch('+--------\none\ntwo\nthree');
    });
  });

  describe('loading the data', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('fails when there is no data', async () => {
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      const error = new Error('oops');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(error));

      await expect(loadAddressData()).rejects.toEqual(error);
    });

    it('parses the JSON file with address data', async () => {
      const fixture = [
        {
          recipient: 'Sam Smith',
          addressLine1: 'My flat name',
          addressLine2: 'My Apartment building',
          addressLine3: 'My complex',
          addressLine4: 'My Street',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY1 2HR',
        },
      ];
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
      await expect(loadAddressData()).resolves.toEqual(fixture);
    });
  });

  describe('running the application', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('prints out a list of labels', async () => {
      const fixture = [
        {
          recipient: 'Sam Smith',
          addressLine1: 'My flat name',
          addressLine2: 'My Apartment building',
          addressLine3: 'My complex',
          addressLine4: 'My Street',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY1 2HR',
        },
        {
          recipient: 'Alex Johnson',
          addressLine1: 'My place',
          addressLine2: '',
          addressLine3: '',
          addressLine4: '',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY2 3PL',
        },
      ];
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
      // eslint-disable-next-line no-console
      console.log = jest.fn();

      await run();
      // eslint-disable-next-line no-console
      const message = console.log.mock.calls[0][0];
      expect(message).toMatchSnapshot();
    });
  });

  // Tests seem to be performed in order
  // Make this test the last as it replaces the value of formatters
  // Is there a way to mock a variable?
  describe('address label printer errors', () => {
    it("returns a message if it can't format the address", () => {
      const data = {
        recipient: 'Sam Smith',
        addressLine1: 'My flat name',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
        addressLine2: 'My Apartment building',
        addressLine3: 'My complex',
        addressLine4: 'My Street',
        locality: 'My Town',
      };

      // remove all the formatters
      while (formatters.length > 0) {
        formatters.pop();
      }

      expect(transformAddress(data)).toEqual([
        'Failed to format address - no suitable formatter found',
      ]);
    });
  });
});
