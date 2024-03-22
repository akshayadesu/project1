const express = require("express");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3003;
app.use(cors());
app.use(bodyParser.json());

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "noduecertificate"
});

con.getConnection((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connection to database established.");
    }
});

app.get('/', (req, res) => {
    con.query("SELECT * FROM students", (err, result) => {
        if (err) {
            console.error("Error fetching data from database:", err);
            res.status(500).send("Error fetching data from database");
        } else {
            res.send(result);
            console.log(res);
        }
    });
});

// Update the /login route handler to fetch the role along with validating username and password
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT role FROM students WHERE email = ? AND password = ?';
    con.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            res.status(500).send("Error querying database");
        } else {
            if (result.length > 0) {
                const role = result[0].role;
                res.send({ valid: true, role });
            } else {
                res.send({ valid: false });
            }
        }
    });
});


app.get('/students/:status', (req, res) => {
    const status = req.params.status;
    const query = 'SELECT * FROM students WHERE status = ?';
    con.query(query, [status], (err, result) => {
        if (err) {
            console.error("Error fetching data from database:", err);
            res.status(500).send("Error fetching data from database");
        } else {
            res.send(result);
        }
    });
});

app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching student data:', err);
        res.status(500).json({ error: 'Error fetching student data' });
        return;
      }
      res.json(results);
    });
  });

app.post('/accept', (req, res) => {
    const { regdno } = req.body;
    if (!regdno) {
        return res.status(400).send("Registration number is required");
    }
    const query = 'UPDATE students SET status = "accepted" WHERE regdno = ?';
    con.query(query, [regdno], (err, result) => {
        if (err) {
            console.error("Error updating status in database:", err);
            res.status(500).send("Error updating status in database");
        } else {
            res.send("Status updated successfully");
        }
    });
});
app.post('/reject', (req, res) => {
    const { regdno, reason } = req.body; // Include reason field in the request
    if (!regdno || !reason) {
        return res.status(400).send("Registration number and reason are required");
    }
    const query = 'UPDATE students SET status = "rejected", reason = ? WHERE regdno = ?';
    con.query(query, [reason, regdno], (err, result) => {
        if (err) {
            console.error("Error updating status in database:", err);
            res.status(500).send("Error updating status in database");
        } else {
            res.send("Status updated successfully");
        }
    });
});

app.listen(port, () => {
    console.log('Server running on port', port);
});