var fs = require('fs');

const PNGNames = fs.readdirSync('./SDS_NFT');
const IPFSFolder = 'QmSJLRAdW3y88Gqqy1XjWUFQgkNdihAgdLciQjJxdK94TL'

PNGNames.forEach((element, index) => {
  const json = {
    name: element.split('.')[0].replace('-',' ').toLocaleUpperCase(),
    description: "A Sygnum Hall of Fame token",
    image: `https://syghof.infura-ipfs.io/ipfs/${IPFSFolder}/${index}.png`
  }
  fs.writeFileSync(`./JSON/${index}`, JSON.stringify(json))
});