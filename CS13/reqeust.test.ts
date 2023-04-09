import {
  createHostname,
  createIpAndPort,
  createRequest,
  printUrl,
  printIpAndPort,
} from './request';

import {
  createResponse,
  convertHeaderToString,
  convertBodyToString,
  printHeaderAndBody,
} from './response';

const url = 'https://example.org/foo';
(async () => {
  createRequest({ hostname: 'example.org', ip: '93.184.216.34', port: 80 });
})();

// expect(createHostname(url)).toEqual({ ip, port });
