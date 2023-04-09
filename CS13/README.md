# Flow Chart

https://www.figma.com/file/JKfJVW6IQAiur8Ozt14kR0/HTTP2?node-id=0%3A1&t=FXOMMd4ZH2PfqNMZ-1

# CheckList

## HTTP 요청

- [x] enterURL
  - input: url (string)
  - output: void
- [x] createHostname
  - input: url (string)
  - output: hostname (string)
- [x] createIpAndPort
  - input: hostname (string)
  - output: ip(string), port(number)
- [x] createRequest

  - input: ip(string), port(number)
  - output: socket(?)

- [x] printRequest
  - input: requestMessage (string)
  - ouput: void

## HTTP 응답

- [x] createResponse
  - input: socket(?)
  - output: response(Response)
  ```javascript
  interface Response {
    header: string[];
    body: string;
    responseLine: string;
    statusCode: number;
    contentLength: number;
  }
  ```
- [x] printHeaderAndBody
  - input: response (Response)
  - output: result (void)

# Result

## Mission 1

<img width="1072" alt="Screen Shot 2023-02-16 at 4 17 52 PM" src="https://user-images.githubusercontent.com/96381221/219294855-3c5e199b-839d-45d2-9df6-5b5754bd3695.png">

## Mission 2

<img width="1023" alt="Screen Shot 2023-02-16 at 5 14 52 PM" src="https://user-images.githubusercontent.com/96381221/219306546-f4caabd7-1a77-4457-a7c7-8b7aa2dc9378.png">
