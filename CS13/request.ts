const net = require('node:net');
const dns = require('node:dns');

const DEFUALT_PORT = 80;

export const createHostname = (url: string): string | null => {
  let hostname: string = '';
  const data = new URL(url);
  if (!data) return null;
  hostname = data.hostname;
  return hostname;
};

export const createIpAndPort = async (
  hostname: string
): Promise<{ ip: string; port: number } | null> => {
  let ip = '';
  let port: number = DEFUALT_PORT;

  const data = await connectDNS(hostname);
  if (!data) return null;

  ip = data.ip;
  port = data.port;
  return { ip, port };
};

const connectDNS = async (
  hostname: string
): Promise<{ ip: string; port: number } | null> => {
  printDNSconnectionStatus();
  const dns = require('dns');
  const data = { ip: '', port: DEFUALT_PORT };
  return new Promise((resolve) => {
    dns.lookup(hostname, (err: Error, ip: string) => {
      if (err) {
        console.error(err);
        resolve(null);
      } else {
        data.ip = ip;
        dns.resolveSrv(
          `_http._tcp.${hostname}`,
          (err: Error, addresses: any) => {
            if (!err) {
              data.port = addresses[0].port;
            }
          }
        );
        resolve(data);
      }
    });
  });
};

export const createRequest = async ({
  hostname,
  ip,
  port,
}: {
  hostname: string;
  ip: string;
  port: number;
}): Promise<any | null> => {
  const socket = new net.Socket();

  return new Promise((resolve, reject) => {
    socket.connect(port, ip, () => {
      const requestMessage = makeRequestMessage(hostname);
      socket.write(requestMessage);
      resolve(socket);
    });

    socket.on('error', (err: Error) => {
      console.error(err);
      reject(null);
    });
  });
};

export const makeRequestMessage = (hostname: string): string => {
  let requestMessage: string = '';
  requestMessage = `GET / HTTP/1.1\r\nHost: ${hostname}\r\n\r\n`;
  return requestMessage;
};

export const printUrl = (url: string): void => {
  console.log(url);
};

const printDNSconnectionStatus = (): void => {
  let status: string = '(DNS Lookup...)';
  console.log(status);
};

export const printIpAndPort = (ip: string, port: number): void => {
  console.log(`TCP Connection : ${ip} ${port}`);
};

export const printRequestMessage = (requestMessage: string): void => {
  let result = '';
  result += '\n';
  result += 'Request Message :';
  result += '\n';
  result += requestMessage;
  console.log(result);
};
