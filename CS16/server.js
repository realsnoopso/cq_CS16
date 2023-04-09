import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
  port: 3306,
  transaction: false,
});

app.post('/user', async (req, res) => {
  const body = req.body;
  if (!body.tableId) {
    res.status(400).send('Bad Request');
    return;
  }
  const tableId = body.tableId;
  const sql = `INSERT INTO user_log (start_time, table_id) VALUES (NOW(), ${tableId});`;
  db.query(sql, async (err, rows) => {
    if (err) {
      console.error('Error during query: ' + err.stack);
      res.status(500).send('Server Error');
      return;
    }
    const success = await updateTables(tableId, 0);
    if (!success) {
      res.status(500).send('Server Error');
      return;
    }
    return res.json(rows);
  });
});

app.patch('/user', (req, res) => {
  const { tableId } = req.body;
  const sql = `UPDATE user_log SET end_time = NOW() WHERE table_id = ${tableId};`;
  db.query(sql, async (err, rows) => {
    if (err) {
      console.error('Error during query: ' + err.stack);
      res.status(500).send('Server Error');
      return;
    }
    const success = await updateTables(tableId, 1);
    if (!success) {
      res.status(500).send('Server Error');
      return;
    }
    return res.json(rows);
  });
});

app.get('/table', async (req, res) => {
  if (!req.query) {
    res.status(400).send('Bad Request');
    return;
  }
  const tableId = req.query.id;
  const sql = `SELECT * FROM tables WHERE id = ${tableId};`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error during query: ' + err.stack);
      res.status(500).send('Server Error');
      return;
    }
    return res.json(rows);
  });
});

app.get('/table/available', async (req, res) => {
  const sql = `SELECT * FROM tables WHERE is_available = 1 LIMIT 1;`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error during query: ' + err.stack);
      res.status(500).send('Server Error');
      return;
    }
    return res.json(rows);
  });
});

app.get('/tables', (req, res) => {
  const sql = `SELECT * FROM tables;`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error during query: ' + err.stack);
      res.status(500).send('Server Error');
      return;
    }
    return res.json(rows);
  });
});

function updateTables(id, isEmpty) {
  const sql = `UPDATE tables SET is_available = ${isEmpty} WHERE id = ${id};`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
