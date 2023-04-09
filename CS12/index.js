const https = require('https');
const jsdom = require('jsdom');
const url = require('url');
const { JSDOM } = jsdom;

// 입력(View): enterURL
// 분리/검증(Controller): checkValidation
// 저장/생성(Use-Case): createResponse
// 형식/변환(Presenter): convertResponseToInfo
// 출력(View): printInfo

const infoContainer = {
  infos: [],
  add: function (info) {
    this.infos.push(info);
  },
};

const enterURL = async (options) => {
  if (checkValidation(options)) {
    const data = await createResponse(options);
    if (data) {
      const info = convertResponseToInfo(data);
      return printInfo(info);
    }
    return console.log('HTTP Error');
  }
  console.log('Invalid URL');
};

const checkValidation = (options) => {
  const { hostname, method } = options;
  if (hostname && method) {
    return true;
  }
  return false;
};

const createResponse = async (options) => {
  return new Promise((resolve, reject) => {
    performance.mark('request');
    const req = https.request(options, (res) => {
      const reqTime = performance.measure('request').duration;
      performance.mark('response');
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        res = res;
        const dom = new JSDOM(data.split('\n'));
        const resTime = performance.measure('response').duration;
        resolve({ res, dom, reqTime, resTime });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

const convertResponseToInfo = (data) => {
  const { res, dom, reqTime, resTime } = data;
  const headers = res.headers;
  const host = res.req.host;
  const protocol = res.req.agent.protocol;
  const path = res.req.path;

  const contentType = headers['content-type'];
  const contentLength = headers['content-length'];
  const links = [];

  dom.window.document
    .querySelector('head')
    .querySelectorAll('link')
    .forEach((item) => {
      const { hostname, path, pathname } = url.parse(item.href);
      hostname && path && links.push({ hostname, path });
    });

  const info = {
    host,
    protocol,
    path,
    contentType,
    contentLength,
    resTime,
    reqTime,
    links,
  };
  infoContainer.add(info);
  return info;
};

const printInfo = (info) => {
  const { host, protocol, path, contentType, contentLength, resTime, reqTime } =
    info;
  console.log('\n>> ' + host);
  console.log(
    `도메인 ${host ?? ''}
스킴 ${protocol ?? ''}
경로 ${path ?? ''}
종류 ${contentType ?? ''}
용량 ${contentLength ? (contentLength / 1024).toFixed(2) : 0} KB
대기 시간 ${resTime ? resTime.toFixed(2) : 0} ms
다운로드 시간 ${reqTime ? reqTime.toFixed(2) : 0} ms`
  );

  return info;
};

const convertInfoToOveralInfo = (infoContainer) => {
  const { infos } = infoContainer;
  const totalRequest = infos.length;
  const totalDomain = new Set(infos.map((info) => info.host)).size;
  const totalImage = infos.filter((info) =>
    info.contentType.includes('image')
  ).length;
  const totalCode = infos.filter(
    (info) =>
      info.contentType.includes('css') ||
      info.contentType.includes('javascript')
  ).length;
  const totalRedirect = infos.filter((info) => info.statusCode === 302).length;
  const totalSize = infos.reduce(
    (acc, cur) => (cur.contentLength ? acc + cur.contentLength : acc),
    0
  );
  const totalLoadTime = infos.reduce((acc, cur) => acc + cur.reqTime, 0);

  const maxImageSize = infos
    .filter((info) => info.contentType.includes('image'))
    .sort((a, b) => b.contentLength - a.contentLength)[0].contentLength;

  const maxWaitTime = infos.reduce(
    (acc, cur) => (acc > cur.resTime ? acc : cur.reqTime),
    0
  );
  const maxDownloadTime = infos.reduce(
    (acc, cur) => (acc > cur.reqTime ? acc : cur.resTime),
    0
  );

  return {
    totalRequest,
    totalDomain,
    totalImage,
    totalCode,
    totalRedirect,
    totalSize,
    totalLoadTime,
    maxImageSize,
    maxWaitTime,
    maxDownloadTime,
  };
};

const printOveralInfo = (info) => {
  const {
    totalRequest,
    totalDomain,
    totalImage,
    totalCode,
    totalRedirect,
    totalSize,
    totalLoadTime,
    maxImageSize,
    maxWaitTime,
    maxDownloadTime,
  } = info;
  console.log('\n');
  console.log(
    `도메인 개수: ${totalDomain ?? ''} 개
요청 개수: ${totalRequest ?? ''} 개
이미지(png, gif, jpg) 개수: ${totalImage ?? ''} 개
코드(css, js) 개수: ${totalCode ?? ''} 개
전송 용량: ${totalSize ? (totalSize / 1024 / 1024).toFixed(2) : 0} MB
리다이렉트 개수: ${totalRedirect ?? ''} 개
전체 로딩 시간: ${totalLoadTime ? totalLoadTime.toFixed(2) : 0} ms

가장 큰 용량: ${maxImageSize ? (maxImageSize / 1024 / 1024).toFixed(4) : 0} MB
가장 오랜 대기 시간: ${maxWaitTime ? maxWaitTime.toFixed(2) : 0} ms
가장 오랜 다운로드 시간: ${maxDownloadTime ? maxDownloadTime.toFixed(2) : 0} ms`
  );
};

function callHTTP(options) {
  (async () => {
    const info = await enterURL(options);
    const links = info.links;
    for (const link of links) {
      const options = {
        hostname: link.hostname,
        path: link.path,
        method: 'GET',
      };
      await enterURL(options);
    }
    const overalInfo = convertInfoToOveralInfo(infoContainer);
    printOveralInfo(overalInfo);
  })();
}

function callHTTPWithCash(options) {
  (async () => {
    options.headers = {
      'Cache-Control': 'private',
    };
    const info = await enterURL(options);
    const links = info.links;
    for (const link of links) {
      const options = {
        hostname: link.hostname,
        path: link.path,
        method: 'GET',
        headers: {
          'Cache-Control': 'private',
        },
      };
      await enterURL(options);
    }
    const overalInfo = convertInfoToOveralInfo(infoContainer);
    printOveralInfo(overalInfo);
  })();
}

const options = {
  hostname: 'm.naver.com',
  path: '/',
  method: 'GET',
};
// callHTTP(options);

callHTTPWithCash(options);
