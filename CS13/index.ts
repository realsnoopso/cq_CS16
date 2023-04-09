import {
  createHostname,
  createIpAndPort,
  createRequest,
  printUrl,
  printIpAndPort,
  makeRequestMessage,
  printRequestMessage,
} from './request';

import { createResponse, printHeaderAndBody } from './response';

const enterURL = async (url: string): Promise<void> => {
  printUrl(url);
  const hostname = createHostname(url);
  if (!hostname) return console.error('URL is not valid');

  const ipAndPort = await createIpAndPort(hostname);
  if (!ipAndPort) return console.error('DNS connection failed');
  if (!ipAndPort.ip) return console.error('DNS connection failed');
  const { ip, port } = ipAndPort;
  printIpAndPort(ip, port);

  printRequestMessage(makeRequestMessage(hostname));
  const socket = await createRequest({ hostname, ip, port });
  if (!socket) return console.error('TCP connection failed');

  const response = await createResponse(socket);
  if (!response) return console.error('No response');

  printHeaderAndBody(response);
  setTimeout(() => {
    socket.destroy();
  }, 3000);
};

const url1: string = 'http://example.com';
const url2: string = 'http://www.disney.co.kr';
const url3: string = 'http://www.yes24.com';

(async () => {
  await enterURL(url1);
  // console.log('------------------');
  // await enterURL(url2);
  // console.log('------------------');
  // await enterURL(url3);
  // console.log('------------------');
})();
