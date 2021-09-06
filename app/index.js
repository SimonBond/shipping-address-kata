const fs = require('fs');
const path = require('path');
const { formatters } = require('./formatters');

const dataFile = path.resolve(__dirname, '../data', 'addresses.json');

const transformAddress = (addressData) => {
  let formatter = formatters.find((fm) => fm.canFormat(addressData));

  if (!formatter) {
    // choose gb as default...
    formatter = formatters.find((fm) => fm.locale === 'gb');

    if (!formatter) {
      // ...or take the 1st one
      [formatter] = formatters;
    }
  }

  let address = formatter.format(addressData);
  address = address.filter((line) => line); // remove blank lines

  return address;
};

const templateAddress = (addressList) => {
  const divider = '+--------\n';
  return `${divider}${addressList.join('\n')}`;
};

const loadAddressData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const run = async () => {
  const data = await loadAddressData();
  // eslint-disable-next-line no-console
  console.log(data.map(transformAddress).map(templateAddress).join('\n'));
};

if (require.main === module) {
  run();
} else {
  module.exports = {
    transformAddress,
    templateAddress,
    loadAddressData,
    run,
  };
}
