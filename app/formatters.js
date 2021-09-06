const addSpaceBetweenAsciiAndNonAscii = (text) => {
  let result = '';
  if (test) {
    result += text[0];
    let isCurrentCharAscii = text.charCodeAt(0) <= 127;
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < text.length; ++i) {
      const isNextCharAscii = text.charCodeAt(i) <= 127;
      if (isCurrentCharAscii !== isNextCharAscii) {
        result += ' ';
      }
      result += text[i];
      isCurrentCharAscii = isNextCharAscii;
    }
  }
  return result;
};

const jpCharRegex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;

const formatters = [
  {
    locale: 'gb',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'UK' || country === 'UNITED KINGDOM';
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient,
        addressData.addressLine1,
        addressData.addressLine2,
        addressData.addressLine3,
        addressData.addressLine4,
        addressData.locality,
        addressData.region,
        addressData.postcode,
        addressData.country,
      ];
      return addressList;
    },
  },
  {
    locale: 'ch',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'SWITZERLAND';
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient,
        addressData.addressLine1,
        addressData.addressLine2,
        addressData.addressLine3,
        addressData.addressLine4,
        addressData.locality,
        `${addressData.postcode} ${addressData.region}`,
        addressData.country,
      ];
      return addressList;
    },
  },
  {
    locale: 'us',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'USA';
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient.toUpperCase(),
        addressData.addressLine1.toUpperCase(),
        addressData.addressLine2.toUpperCase(),
        addressData.addressLine3.toUpperCase(),
        addressData.addressLine4.toUpperCase(),
        `${addressData.locality.toUpperCase()} ${addressData.region.toUpperCase()} ${addressData.postcode.toUpperCase()}`,
        addressData.country.toUpperCase(),
      ];
      return addressList;
    },
  },
  {
    locale: 'hk',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'HONG KONG';
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient,
        addressData.addressLine1,
        addressData.addressLine2,
        addressData.addressLine3,
        addressData.addressLine4,
        addressData.locality,
        addressData.region.toUpperCase(),
        addressData.postcode,
        addressData.country.toUpperCase(),
      ];
      return addressList;
    },
  },
  {
    locale: 'it',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'ITALY';
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient.toUpperCase(),
        addressData.addressLine1.toUpperCase(),
        addressData.addressLine2.toUpperCase(),
        addressData.addressLine3.toUpperCase(),
        addressData.addressLine4.toUpperCase(),
        `${addressData.postcode.toUpperCase()} ${addressData.locality.toUpperCase()} ${addressData.region.toUpperCase()}`,
        addressData.country.toUpperCase(),
      ];
      return addressList;
    },
  },
  {
    locale: 'fr',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'FRANCE';
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient,
        addressData.addressLine1,
        addressData.addressLine2,
        addressData.addressLine3,
        addressData.addressLine4,
        addressData.locality,
        `${addressData.postcode} ${addressData.region}`,
        addressData.country,
      ];
      return addressList;
    },
  },
  {
    locale: 'de',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'GERMANY';
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient,
        addressData.addressLine1,
        addressData.addressLine2,
        addressData.addressLine3,
        addressData.addressLine4,
        addressData.locality,
        `${addressData.postcode} ${addressData.region}`,
        addressData.country,
      ];
      return addressList;
    },
  },
  {
    locale: 'jp-en',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'JAPAN' && !jpCharRegex.test(addressData.region);
    },
    format: (addressData) => {
      const addressList = [
        addressData.recipient,
        addressData.addressLine1,
        addressData.addressLine2,
        addressData.addressLine3,
        addressData.addressLine4,
        `${addressData.locality} ${addressData.region} ${addressData.postcode}`,
        addressData.country,
      ];
      return addressList;
    },
  },
  {
    locale: 'jp-jp',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'JAPAN' && jpCharRegex.test(addressData.region);
    },
    format: (addressData) => {
      const addressList = [
        `〒 ${addressData.postcode}`,
        `${addressData.region}${addressData.locality}${addSpaceBetweenAsciiAndNonAscii(addressData.addressLine2)}`,
        addSpaceBetweenAsciiAndNonAscii(addressData.addressLine1),
        addressData.recipient,
        addressData.country,
      ];
      return addressList;
    },
  },

  {
    locale: 'test',
    canFormat: (addressData) => {
      const country = addressData.country.trim().toUpperCase();
      return country === 'JAPAN';
    },
    format: (addressData) => {
      const addressList = [
        `〒 ${addressData.postcode}`,
        `${addressData.region}${addressData.locality}${addSpaceBetweenAsciiAndNonAscii(addressData.addressLine2)}`,
        addSpaceBetweenAsciiAndNonAscii(addressData.addressLine1),
        addressData.recipient,
        addressData.country,
      ];
      return addressList;
    },
  },
];

module.exports = {
  formatters,
};
