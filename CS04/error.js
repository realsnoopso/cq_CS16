export function error(message, values) {
  const first = `--------------------------------\n# Error: ${message}`;
  const getvalue = (data) => ` ${data.key}: ${data.value}`;
  const last = '\n--------------------------------';

  // console.log(
  //   first + (values ? values.map((v) => getvalue(v)).join(',') : '') + last
  // );
  return message;
}
