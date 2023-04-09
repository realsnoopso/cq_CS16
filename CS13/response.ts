export interface Response {
  header: string[];
  body: string;
  responseLine: string;
  statusCode: number;
  contentLength: number;
}

export const createResponse = (socket: any): Promise<Response> => {
  let response: Response | null = null;
  let header = [] as string[];
  let body = '';
  let responseLine = '';
  let statusCode = 0;
  let contentLength = 0;

  return new Promise((resolve) => {
    socket.on('data', (data: any) => {
      const headerAndBody = data.toString().split('\r\n\r\n');
      header = headerAndBody[0].split('\r\n');
      statusCode = 200;
      responseLine = header[0];
      contentLength = Number(
        header
          .find((line: string) => line.startsWith('Content-Length'))
          ?.split(':')[1]
          .trim()
      );
      body = headerAndBody[1];
      response = { header, body, responseLine, statusCode, contentLength };
      resolve(response);
    });

    socket.on('error', (err: any) => {
      console.log(err);
      statusCode = 500;
      response = { header, body, responseLine, statusCode, contentLength };
      resolve(response);
    });
  });
};

export const printHeaderAndBody = (response: Response): void => {
  let result: string = '';
  result += 'header :\n';
  result += response.header.join('\n');
  result += '\n\n';
  result += 'body :\n';
  result += response.body;
  console.log(result);
};
