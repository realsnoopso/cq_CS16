import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import axios from 'axios';

const url = 'http://localhost:3000';

async function getTable(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${url}/table?id=${id}`);
      return resolve(response.data[0]);
    } catch (error) {
      reject(error.message);
    }
  });
}

async function printAvailableTables() {
  try {
    const response = await axios.get(`${url}/tables`);
    const tables = response.data.filter((table) => table.is_available);
    let result = '[';
    tables.forEach((table, i) => {
      tables.length - 1 === i
        ? (result += `${table.id}`)
        : (result += `${table.id}, `);
    });
    result += ']';
    return result;
  } catch (error) {
    console.error(error.message);
    rl.close();
  }
}

async function findAvailableTable() {
  try {
    const response = await axios.get(`${url}/table/available`);
    return response.data[0];
  } catch (error) {
    console.error(error.message);
  }
}

async function addUser() {
  try {
    const table = await findAvailableTable();
    if (!table) {
      return console.log('빈 자리가 없습니다.');
    }
    const tableId = table.id;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = { tableId };
    const success = await axios.post(`${url}/user`, data, config);
    if (!success) {
      return console.error('서버 에러');
    }
    console.log(`${tableId}번 자리에 앉으세요. :#${success.data.insertId}`);
    console.log(await printAvailableTables());
  } catch (error) {
    console.error(error.message);
  }
}

async function removeUserFromTable(tableId) {
  const table = await getTable(tableId);
  if (!table) {
    return console.log('존재하지 않는 자리입니다.');
  }

  if (table.is_available) {
    return console.log('이미 비어있는 자리입니다.');
  }

  const data = { tableId };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.patch(`${url}/user`, data, config);
    console.log(`이제 ${tableId}번 자리가 비었습니다.`);
    console.log(await printAvailableTables());
  } catch (error) {
    console.error(error);
  }
}

const rl = readline.createInterface({ input, output });

console.log('빈 자리는 다음과 같습니다.');
console.log(await printAvailableTables());

const answer = await rl.question(
  `시작: 'new' 입력 / 종료: 'stop <테이블 번호>' 입력 : `
);

if (answer === 'new') {
  await addUser();
  rl.close();
} else if (/stop \d$/g.test(answer)) {
  await removeUserFromTable(Number(answer.split(' ')[1]));
  rl.close();
} else {
  console.error('잘못 입력하셨습니다. 다시 입력해주세요.');
  rl.close();
}
