const express = require('express');
const mysql = require('mysql');
const Gaussian = require('gaussian');
const app = express();
const SimpleAnimate = require('simple-animate');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Xptmxm1212!@',
  database: 'test',
  port: 3306,
  transaction: false;
});

const words = `tension
daughter
century
trophy
melody
horizon
chocolate
festival
upgrade
vitamin
diamond
observe
gallery
sculpture
tablet
harmonica
mint
molecule
salad
gospel
innocent
camel
infinite
cinema
festival
satellite
athlete
bubble
sector
hurricane
leisure
diamond
version
aircraft
chorus
liberty
habitat
fashion
scientist
melody
democracy
delicate
volcanic
legend
vacancy
survival
paradise
address
legacy
tunnel
bulletin
appetite
compass
syllable
serpent
memory
digital
bacteria
crystal
fuel
satellite
comedy
diamond
tutorial
horizon
eclectic
culture
mountain
bamboo
cathedral
element
attitude
teaspoon
ecology
exclusive
diamond
temple
palace
solution
monitor
kingdom
column
lunar
sponsor
avenue
planet
apartment
legacy
brilliant
tropical
velvet
festival
scenario
agent
hockey
rhythm
dynamite
sanctuary
fragile
meditate`.split('\n')


app.get('/users', (req, res)=> {
  const sql = `SELECT * FROM user_log;`;
   db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error during query: ' + err.stack);
      res.status(500).send('Server Error');
      return;
    }
    res.json(rows);
  });
})

function generateRandomName() {
  const min = 0;
  const max = 99;
  const randomNum = Math.floor(Math.random() * (max - min) + min);
  const randomNum2 = Math.floor(Math.random() * 26);
  const randomNum3 = Math.floor(Math.random() * 26);
  const value = words[randomNum]+String.fromCharCode(65+randomNum2)+String.fromCharCode(65+randomNum2)+String.fromCharCode(65+randomNum2)+ String(Math.floor(Math.random() * 9))+ String(Math.floor(Math.random()) * 9)+ String(Math.floor(Math.random() * 9))+ String(Math.floor(Math.random() * 9));
  return value;
}

function generateRandomValue() {
  const mean = 50000;
  const variance = 10000;
  const distribution = Gaussian(mean, variance);
  let value = distribution.ppf(Math.random());
  value = Math.round(value);
  if (value < 1) {
    value = 1; 
  } else if (value > 100000) {
    value = 100000;
  }
  return value;
}

function generateRandomTime() {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const diff = now.getTime() - lastMonth.getTime();
  const randomTime = new Date(lastMonth.getTime() + Math.random() * diff);
  return randomTime;
}

function runPostAPI() {
  const nickname = generateRandomName();
  const money = generateRandomValue();
  const last_visit = generateRandomTime().toISOString().slice(0, 19).replace("T", " ");
  
  const sql = `INSERT INTO user_log (nickname, money, last_visit) VALUES ('${nickname}', ${money}, '${last_visit}');`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error during query');
      return;
    }
    console.log('Success')
  });
}

function run() {
  runPostAPI();
  let id = null;
  let i = 0;
  const max = 10;
  
  id = setInterval(() => {
    runPostAPI();
    console.log(i);
    if (i >= max-1) {
      clearInterval(id);
      console.log('clear')
    }
    i++
  }, 0);
}

run();

