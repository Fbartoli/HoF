const { create, globSource } = require('ipfs-http-client');
const fs = require('fs');

const url = 'https://ipfs.infura.io:5001';
const projectId = '22VoB3dkX86iy1UTTIvzov1Vfiq';
const secret = '4b5ebca33fe31a98a778be99fe9e08da';

const authToken = Buffer.from(`${projectId}:${secret}`).toString('base64');
const authorization = `Basic ${authToken}`;

const ipfs = create({
  url,
  headers: { authorization },
  timeout: 10000, // 10 seconds
});

const uploadToIpfs = async () => {
  const addedFiles = []
  for await (const file of ipfs.addAll(
    globSource('./JSON', '**/*', {
      hidden: true,
    }),
    { wrapWithDirectory: true, fileImportConcurrency: 50 }
  )) {
    addedFiles.push({
      cid: file.cid.toString(),
      path: file.path,
      size: file.size,
    })
  }
  return addedFiles
};

const main = async () => {
  const CID = await uploadToIpfs();
  console.log(CID)
  // await ipfs.pin.add()
  // console.log(CID);
};
main();